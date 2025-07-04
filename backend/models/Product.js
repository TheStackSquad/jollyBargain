// backend/models/Product.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'], // Ensures price is non-negative
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true, // Added trim for consistency
  },
  // Refactored: 'images' to handle multiple image URLs from Cloudinary
  images: [
    {
      public_id: { // Cloudinary public ID for managing uploads (e.g., deletion)
        type: String,
        required: true,
      },
      url: { // Cloudinary secure URL for displaying the image
        type: String,
        required: true,
      },
    },
  ],
  stock: {
    type: Number,
    required: [true, 'Product stock quantity is required'], // Made required as per form validation
    default: 0,
    min: [0, 'Stock cannot be negative'],
  },
  // New: SKU field
  sku: {
    type: String,
    unique: true, // Ensures SKU is unique
    sparse: true, // Allows null values, so products without SKU are still valid
    trim: true,
  },
  // New: Status field with enum for predefined values
  status: {
    type: String,
    enum: ['active', 'draft', 'archived'], // Enforces specific values
    default: 'draft', // Default status for new products
    required: [true, 'Product status is required'],
  },
  // New: Tags field to store an array of strings
  tags: [String], // An array of strings
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

export default mongoose.model('Product', productSchema);