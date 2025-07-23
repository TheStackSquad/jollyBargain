//backend/models/payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
      description: "The ID of the user making the payment.",
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // Assuming you have an Order model
      required: true,
      unique: true, // Each payment should ideally be linked to one order
      description: "The ID of the order associated with this payment.",
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
      description: "The total amount of the payment.",
    },
    currency: {
      type: String,
      required: true,
      default: "USD", // Or your default currency
      enum: ["USD", "EUR", "GBP", "NGN"], // Example currencies
      description: "The currency in which the payment was made.",
    },
    paymentMethodType: {
      type: String,
      required: true,
      enum: ["credit_card", "paypal", "bank_transfer", "other"], // Example payment methods
      description:
        "The type of payment method used (e.g., credit_card, paypal).",
    },
    paymentToken: {
      type: String,
      required: true,
      description:
        "A token representing the payment method, provided by a payment gateway. NEVER store raw card details.",
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple documents to not have this field, but if present, it must be unique
      description:
        "The unique ID returned by the payment gateway for this transaction.",
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "succeeded", "failed", "refunded", "cancelled"],
      description: "The current status of the payment transaction.",
    },
    paymentGatewayResponse: {
      type: mongoose.Schema.Types.Mixed, // Stores the raw response from the payment gateway
      description: "Raw response object from the payment gateway.",
    },
    // Optional: store last 4 digits and card brand for display purposes (if tokenized)
    cardLast4: {
      type: String,
      trim: true,
      maxlength: 4,
      description: "Last 4 digits of the card (if applicable and tokenized).",
    },
    cardBrand: {
      type: String,
      trim: true,
      description: "Brand of the card (e.g., Visa, MasterCard).",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    collection: "payments", // Explicitly name the collection
  },
);

// Add an index for faster lookups by orderId and userId
paymentSchema.index({ orderId: 1, userId: 1 });
paymentSchema.index({ transactionId: 1 });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
