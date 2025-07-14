// backend/index.js (Renamed from server.js)

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// --- Load environment variables from .env file FIRST ---
dotenv.config();

// Import the database connection function
import connectDB from './config/db.js';

// NEW: Import and initialize Cloudinary config AFTER dotenv is loaded
import { initCloudinary } from './backendUtils/uploadHandler.js'; // Import the new function
initCloudinary(); // CALL THIS FUNCTION HERE!

// Import routes
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import productRoutes from './routes/productRoutes.js';
import flashDealRoutes from './routes/flashDealRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// Logging
app.use(morgan('combined'));

// CORS configuration - Enhanced for Vercel dynamic URLs
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000', // Your primary frontend URL (local or production)
];

// Add Vercel's dynamic preview URLs to allowed origins
// VERCEL_URL is automatically provided by Vercel for preview deployments
if (process.env.VERCEL_URL) {
  // For production, VERCEL_URL is the production domain (e.g., your-app.vercel.app)
  // For preview, it's the preview domain (e.g., your-app-git-branch-sha.vercel.app)
  allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
  // If you have a custom production domain, you'd also add it here:
  // allowedOrigins.push('https://your-custom-domain.com');
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    // Additionally, allow any *.vercel.app subdomain for flexibility in previews
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
    console.error(msg); // Log the blocked origin for debugging
    return callback(new Error(msg), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware (keep these limits, they're appropriate for files)
app.use(express.json({ limit: '50mb' })); // Changed from 10mb to 50mb, more suitable for large payloads
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Changed from 10mb to 50mb
app.use(cookieParser());

// --- Database connection: Call the connectDB function ---
connectDB(); // This will handle the connection and logging

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes); // This route uses Multer
app.use('/api/flashDeals', flashDealRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
// This will be hit if Vercel routes a non-/api request to the backend.
// In your vercel.json, all non-/api requests go to the frontend,
// so this '/' route on the backend will likely only be hit if you
// explicitly navigate to the backend URL without '/api'.
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'JollyBargain API Server',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      admin: '/api/admin',
      health: '/api/health'
    }
  });
});

// 404 handler
// This will catch any /api/* routes that don't match your defined routes.
// The vercel.json routes ensure that only /api/* goes to the backend.
app.use('/*any', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error:', error);

  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Graceful shutdown (less critical for serverless, but good practice)
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});