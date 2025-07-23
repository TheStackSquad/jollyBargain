// backend/routes/paymentRoutes.js
import express from "express";
import {
  processPayment,
  handleStripeWebhook,
} from "../controllers/paymentController.js";

const router = express.Router();

// Route to process a payment
router.post("/process", processPayment);

// Stripe webhook route for real-time event handling
// Stripe requires raw body for signature verification
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

export default router;
