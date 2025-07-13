// backend/controllers/authController.js
// CORRECTED: Added .js extension for local imports
import User from '../models/User.js'; // ES6 import for the User model
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
//import bcrypt from 'bcryptjs';

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '1h', // e.g., '1h', '30d'
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  // Basic validation: Check if email and password are provided
  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter all required fields (email, password).');
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // Bad request
    throw new Error('User already exists with this email');
  }

  // Create new user
  const user = await User.create({
    email,
    password,
    name,
  });

  if (user) {
    res.status(201).json({ // 201 Created
      success: true,
      message: 'User registered successfully',
      data: { // Wrap in 'data' object to match frontend expectation
        _id: user._id,
        email: user.email,
        name: user.name,
        token: generateToken(user._id),
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body; // Using 'identifier' to match frontend

  // Basic validation: Check if identifier and password are provided
  if (!identifier || !password) {
    res.status(400);
    throw new Error('Please enter both email and password.');
  }

  // Check for user by email (include password as it's 'select: false' by default)
  const user = await User.findOne({ email: identifier }).select('+password'); // Use identifier for email

  if (user && (await user.matchPassword(password))) {
    res.json({
      success: true,
      message: 'Logged in successfully',
      data: { // Wrap in 'data' object to match frontend expectation
        _id: user._id,
        email: user.email,
        name: user.name,
        token: generateToken(user._id),
      }
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error('Invalid credentials');
  }
});

export { // ES6 export
  registerUser,
  loginUser,
};
