// backend/models/order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
      description: "The user who placed this order.",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
          description: "Name of the product.",
        },
        qty: {
          type: Number,
          required: true,
          description: "Quantity of the product.",
        },
        image: {
          type: String,
          description: "URL or path to the product image.",
        },
        price: {
          type: Number,
          required: true,
          description: "Price of the product at the time of order.",
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to the Product model
          required: true,
          description: "The ID of the product ordered.",
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: true,
        description: "Street address for shipping.",
      },
      city: { type: String, required: true, description: "City for shipping." },
      postalCode: {
        type: String,
        required: true,
        description: "Postal code for shipping.",
      },
      country: {
        type: String,
        required: true,
        description: "Country for shipping.",
      },
      // Optional: Add state/province, apartment number, etc.
    },
    paymentMethod: {
      type: String,
      required: true,
      description:
        'The payment method chosen by the user (e.g., "Credit Card", "PayPal").',
    },
    paymentResult: {
      // This field stores details from the payment gateway after a successful transaction
      id: { type: String, description: "Transaction ID from payment gateway." },
      status: {
        type: String,
        description: 'Status from payment gateway (e.g., "succeeded").',
      },
      update_time: {
        type: String,
        description: "Timestamp of the payment update.",
      },
      email_address: {
        type: String,
        description: "Payer email address from payment gateway.",
      },
      // You might store other relevant gateway response data here
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
      description: "The tax amount for the order.",
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
      description: "The shipping cost for the order.",
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
      description:
        "The total price of the order including items, tax, and shipping.",
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
      description: "Indicates if the order has been paid for.",
    },
    paidAt: {
      type: Date,
      description: "Timestamp when the order was paid.",
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
      description: "Indicates if the order has been delivered.",
    },
    deliveredAt: {
      type: Date,
      description: "Timestamp when the order was delivered.",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
      default: "pending",
      description: "Current status of the order lifecycle.",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    collection: "orders", // Explicitly name the collection
  }
);

// Add indexes for faster lookups
orderSchema.index({ user: 1 }); // Index by user for faster retrieval of user's orders
orderSchema.index({ createdAt: -1 }); // Index for sorting by most recent orders

const Order = mongoose.model("Order", orderSchema);

export default Order;
