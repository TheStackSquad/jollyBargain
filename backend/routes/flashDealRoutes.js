// backend/routes/flashDealRoutes.js
import express from 'express';
import { getFlashDeals } from '../controllers/flashDealController.js';

const router = express.Router();

// Add logging middleware for debugging
router.use((req, res, next) => {
  console.log(`Flash Deal Route accessed: ${req.method} ${req.path}`);
  console.log('Request headers:', req.headers);
  next();
});

router.get('/', getFlashDeals);

export default router;