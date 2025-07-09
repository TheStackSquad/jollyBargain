
// frontend/src/services/productService.js
import api from '../utils/adminApi'; // Import the configured Axios instance


export const createProduct = async (productData) => {
  console.log('Sending FormData to backend for creation...');
  try {
    const response = await api.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('API response from createProduct:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error creating product:', error.response?.data || error.message);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  const formData = new FormData();

  // Append all text fields
  for (const key in productData) {
    if (key !== 'images' && key !== 'tags' && key !== '_id') { // Exclude images, tags, and _id
      // Ensure complex types are stringified if backend expects them as such in FormData
      if (typeof productData[key] === 'object' && productData[key] !== null) {
          formData.append(key, JSON.stringify(productData[key]));
      } else {
          formData.append(key, productData[key]);
      }
    }
  }

  // Append tags as a JSON string (assuming backend parses it as array)
  // Or, if backend expects comma-separated string for tags on update, use join(',')
  formData.append('tags', JSON.stringify(Array.isArray(productData.tags) ? productData.tags : (productData.tags ? productData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [])));


  // Handle images for update:
  // The backend's updateProduct controller has logic to handle
  // 1. New files in req.files (Multer) - these replace existing images
  // 2. req.body.images (as a JSON string) - if no new files, this array defines desired images (for removing old ones)

  const newFiles = productData.images.filter(image => image instanceof File);
  const existingImages = productData.images.filter(image => !(image instanceof File));

  if (newFiles.length > 0) {
    // If there are new files, append them directly.
    // The backend will treat these as replacements for existing images.
    newFiles.forEach(file => {
      formData.append('images', file); // Multer expects the field name 'images'
    });
    // If you're sending new files, you generally don't send existing image info in a separate field
    // unless your backend has specific logic to merge/compare them.
    // If backend needs to know which old images to *keep*, you might need a separate field like 'imagesToKeep'
    // or send public_ids of images to delete if they are explicitly removed by user.
    // For now, assuming new files mean "replace all images".
  } else {
    // If no new files, send the current desired list of images (which includes
    // existing ones to keep) as a JSON string.
    // The backend will parse this and decide which old images to delete from Cloudinary.
    formData.append('images', JSON.stringify(existingImages));
  }


  try {
    const response = await api.put(`/products/${productId}`, formData, { // Use api.put
      headers: {
        'Content-Type': 'multipart/form-data', // Explicitly set for FormData
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error.response?.data || error.message);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get('/products'); // Use api.get
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`); // Use api.get
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`); // Use api.delete
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error.response?.data || error.message);
    throw error;
  }
};