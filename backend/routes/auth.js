// backend/routes/auth.js
// backend/routes/auth.js
import express from 'express';
import { login, logout, refreshToken, getProfile, loginLimiter } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js'; // Assuming authenticate is here

const router = express.Router();

// Apply loginLimiter to the login route
router.post('/login', loginLimiter, login);
router.post('/logout', logout); // Logout typically doesn't need authentication to clear cookie
router.post('/refresh-token', refreshToken); // Refresh token endpoint

// Protected routes
router.get('/profile', authenticate, getProfile); // Example: profile requires authentication

export default router;