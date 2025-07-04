// backend/routes/productRoutes.js
import express from 'express';
// Assuming these middleware functions are defined in your auth.js
import { authenticate, requireAdmin, requirePermission } from '../middleware/auth.js';
// Import the product controller functions
import * as productController from '../controllers/productController.js';
// Import the Multer upload middleware from your uploadHandler utility
// Assuming uploadHandler exports an 'upload' object configured with Multer
import { upload } from '../backendUtils/uploadHandler.js';

const router = express.Router();

// Apply authentication and admin role check to all product routes
router.use(authenticate);
router.use(requireAdmin);

/**
 * @route GET /api/products
 * @description Get all products
 * @access Private (Admin with 'manage_products' permission)
 *
 * @remarks
 * This route fetches a list of products. It can be further enhanced with
 * pagination, filtering, and sorting parameters in the query string.
 */
router.get(
  '/',
  requirePermission('manage_products'),
  productController.getProducts
);

/**
 * @route GET /api/products/:id
 * @description Get a single product by ID
 * @access Private (Admin with 'manage_products' permission)
 *
 * @remarks
 * Fetches details for a specific product.
 */
router.get(
  '/:id',
  requirePermission('manage_products'),
  productController.getProductById
);

/**
 * @route POST /api/products
 * @description Create a new product with image uploads
 * @access Private (Admin with 'manage_products' permission)
 *
 * @remarks
 * This route handles new product creation. It uses `upload.array('images', 5)`
 * to process up to 5 image files sent with the 'images' field name.
 * The `productController.createProduct` will then handle uploading these
 * files to Cloudinary and saving their URLs to MongoDB.
 */
router.post(
  '/',
  requirePermission('manage_products'),
  // Multer middleware to handle multipart/form-data for image uploads
  // 'images' is the field name expected from the frontend FormData
  // 5 is the maximum number of files allowed
  upload.array('images', 5),
  productController.createProduct
);

/**
 * @route PUT /api/products/:id
 * @description Update an existing product with optional new image uploads
 * @access Private (Admin with 'manage_products' permission)
 *
 * @remarks
 * This route updates an existing product. It also uses `upload.array('images', 5)`
 * to handle potential new image uploads or replacements. The controller
 * will need to manage existing images (e.g., deleting old ones from Cloudinary
 * if replaced) and adding new ones.
 */
router.put(
  '/:id',
  requirePermission('manage_products'),
  // Multer middleware for image uploads during update
  upload.array('images', 5),
  productController.updateProduct
);

/**
 * @route DELETE /api/products/:id
 * @description Delete a product by ID
 * @access Private (Admin with 'manage_products' permission)
 *
 * @remarks
 * Deletes a product from the database. The controller should also
 * handle deleting associated images from Cloudinary to prevent orphaned files.
 */
router.delete(
  '/:id',
  requirePermission('manage_products'),
  productController.deleteProduct
);

export default router;
