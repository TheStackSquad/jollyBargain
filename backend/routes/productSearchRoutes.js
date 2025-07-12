// backend/routes/productSearchRoutes.js
import express from 'express';
import { searchProducts, getCategories } from '../controllers/productSearchController.js';

const router = express.Router();

// Add logging middleware for debugging
router.use((req, res, next) => {
  console.log(`Product Search Route accessed: ${req.method} ${req.path}`);
  console.log('Request query:', req.query);
  next();
});

// Search products with filters
router.get('/search', searchProducts);

// Get available categories
router.get('/categories', getCategories);

export default router;