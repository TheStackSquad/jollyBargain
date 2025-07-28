// backend/models/Product.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    // Add these fields to your Product schema
    originalPrice: {
      type: Number,
      default: function () {
        return this.price * 1.25;
      },
    },
    discount: {
      type: Number,
      default: 20,
    },
    claimed: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    views: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      required: [true, "Product stock quantity is required"],
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "draft", "archived"],
      default: "draft",
      required: [true, "Product status is required"],
    },
    tags: [String],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
