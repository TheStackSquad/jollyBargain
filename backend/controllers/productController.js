// backend/controllers/productController.js

import Product from '../models/Product.js';
// Import the image upload and deletion utilities from uploadHandler.js
// These functions will interact with Cloudinary.
import { uploadImagesToCloudinary, deleteImageFromCloudinary } from '../backendUtils/uploadHandler.js';

//Get all products
export const getProducts = async (req, res) => {
  try {
    // Find all products in the database.
    // You can add pagination, filtering, and sorting here if needed.
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not retrieve products.',
      error: error.message,
    });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    // Check for Mongoose CastError (invalid ID format)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format',
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not retrieve product.',
      error: error.message,
    });
  }
};


// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock, sku, status, tags } = req.body;
    let images = []; // Array to store Cloudinary image public_id and url

    // If image files are present from Multer, upload them to Cloudinary
    if (req.files && req.files.length > 0) {
      // uploadImagesToCloudinary expects an array of file buffers/streams
      images = await uploadImagesToCloudinary(req.files);
    } else {
      // If the schema requires images and none are provided, return an error
      // This check assumes 'images' field in schema is marked as required.
      // If images are optional, remove this block.
      if (Product.schema.path('images').isRequired && images.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Product images are required.',
        });
      }
    }

    // Create a new product instance with the data
    const product = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      sku,
      status,
      // Ensure tags are stored as an array. Frontend sends as comma-separated string.
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()).filter(tag => tag)) : [],
      images, // Store the array of { public_id, url } from Cloudinary
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    // Handle Mongoose validation errors (e.g., required fields missing)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }
    // Handle duplicate key error (e.g., unique SKU constraint)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.sku) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate SKU: A product with this SKU already exists.',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not create product.',
      error: error.message,
    });
  }
};

// Update a product

export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock, sku, status, tags } = req.body;
    const productId = req.params.id;

    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    let imagesToStore = [...product.images]; // Start with existing images
    const publicIdsToDelete = []; // To track images to remove from Cloudinary

    // --- Image Update Logic ---
    // Case 1: New files are uploaded (Multer provides req.files)
    if (req.files && req.files.length > 0) {
      // Upload new images to Cloudinary
      const newlyUploadedImages = await uploadImagesToCloudinary(req.files);

      // Mark all existing images for deletion from Cloudinary
      // This assumes new uploads replace all old images.
      product.images.forEach(img => publicIdsToDelete.push(img.public_id));

      // Replace existing images with the newly uploaded ones
      imagesToStore = newlyUploadedImages;
    } else {
      // Case 2: No new files uploaded, but frontend might have modified existing images.
      // The frontend should send the current, desired array of images (as JSON string)
      // in req.body.images. This allows for removal of specific images.
      let frontendImages = [];
      if (req.body.images) {
        try {
          frontendImages = JSON.parse(req.body.images);
          if (!Array.isArray(frontendImages)) {
            throw new Error('Images data from frontend is not an array.');
          }
        } catch (parseError) {
          console.error('Error parsing req.body.images:', parseError);
          return res.status(400).json({
            success: false,
            message: 'Invalid images data format provided.',
            error: parseError.message,
          });
        }
      }

      // Identify images that were previously stored but are no longer in the frontend's list
      // These are the images to delete from Cloudinary.
      product.images.forEach(existingImg => {
        const found = frontendImages.some(
          frontendImg => frontendImg.public_id === existingImg.public_id
        );
        if (!found) {
          publicIdsToDelete.push(existingImg.public_id);
        }
      });
      imagesToStore = frontendImages; // Update with the images array sent from frontend
    }

    // Perform deletion of old images from Cloudinary
    for (const publicId of publicIdsToDelete) {
      try {
        await deleteImageFromCloudinary(publicId);
      } catch (deleteError) {
        console.warn(`Failed to delete image ${publicId} from Cloudinary:`, deleteError.message);
        // Continue even if a single image deletion fails, to not block product update
      }
    }
    // --- End Image Update Logic ---

    // Update product fields from request body
    product.title = title !== undefined ? title : product.title;
    product.description = description !== undefined ? description : product.description;
    product.price = price !== undefined ? price : product.price;
    product.category = category !== undefined ? category : product.category;
    product.stock = stock !== undefined ? stock : product.stock;
    product.sku = sku !== undefined ? sku : product.sku;
    product.status = status !== undefined ? status : product.status;
    // Update tags, ensuring it's an array
    product.tags = tags ? (Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()).filter(tag => tag)) : [];
    product.images = imagesToStore; // Assign the final images array

    // Save the updated product document
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format',
        error: error.message,
      });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }
    if (error.code === 11000 && error.keyPattern && error.keyPattern.sku) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate SKU: A product with this SKU already exists.',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not update product.',
      error: error.message,
    });
  }
};

//  Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Delete associated images from Cloudinary before deleting the product
    for (const image of product.images) {
      try {
        await deleteImageFromCloudinary(image.public_id);
      } catch (deleteError) {
        console.warn(`Failed to delete image ${image.public_id} from Cloudinary:`, deleteError.message);
        // Log the warning but continue to delete the product
      }
    }

    // Delete the product document from MongoDB
    await Product.deleteOne({ _id: productId });

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format',
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not delete product.',
      error: error.message,
    });
  }
};
