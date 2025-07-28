// backend/controllers/authController.js

import User from "../models/User.js"; // ES6 import for the User model
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"; // Ensure bcrypt is imported if used for password matching

// Helper function to generate JWT
const generateToken = (id) => {
  console.log("[Auth Controller] Generating JWT for user ID:", id);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "1h", // e.g., '1h', '30d'
  });
};

const registerUser = asyncHandler(async (req, res) => {
  console.log("[Auth Controller] registerUser function called.");
  const { email, password, name } = req.body;
  console.log("[Auth Controller] Registering user with:", {
    email,
    name: name || "N/A",
  });

  // Basic validation: Check if email and password are provided
  if (!email || !password) {
    console.log(
      "[Auth Controller] Registration failed: Missing email or password.",
    );
    res.status(400);
    throw new Error("Please enter all required fields (email, password).");
  }

  // Check if user already exists
  console.log("[Auth Controller] Checking if user with email exists:", email);
  const userExists = await User.findOne({ email });

  if (userExists) {
    console.log("[Auth Controller] Registration failed: User already exists.");
    res.status(400); // Bad request
    throw new Error("User already exists with this email");
  }

  // Create new user
  console.log("[Auth Controller] Creating new user...");
  const user = await User.create({
    email,
    password,
    name,
  });

  if (user) {
    console.log(
      "[Auth Controller] User registered successfully. User ID:",
      user._id,
    );
    res.status(201).json({
      // 201 Created
      success: true,
      message: "User registered successfully",
      data: {
        // Wrap in 'data' object to match frontend expectation
        _id: user._id,
        email: user.email,
        name: user.name,
        token: generateToken(user._id),
      },
    });
  } else {
    console.log("[Auth Controller] Registration failed: Invalid user data.");
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  console.log("[Auth Controller] loginUser function called.");
  const { identifier, password } = req.body; // Using 'identifier' to match frontend
  console.log("[Auth Controller] Attempting login for identifier:", identifier);

  // Basic validation: Check if identifier and password are provided
  if (!identifier || !password) {
    console.log(
      "[Auth Controller] Login failed: Missing identifier or password.",
    );
    res.status(400);
    throw new Error("Please enter both email and password.");
  }

  // Check for user by email (include password as it's 'select: false' by default)
  console.log("[Auth Controller] Searching for user by email:", identifier);
  const user = await User.findOne({ email: identifier }).select("+password"); // Use identifier for email
  console.log(
    "[Auth Controller] User found:",
    user ? user.email : "No user found",
  );

  if (user && (await user.matchPassword(password))) {
    console.log(
      "[Auth Controller] Password matched successfully for user:",
      user.email,
    );
    res.json({
      success: true,
      message: "Logged in successfully",
      data: {
        // Wrap in 'data' object to match frontend expectation
        _id: user._id,
        email: user.email,
        name: user.name,
        token: generateToken(user._id),
      },
    });
    console.log("[Auth Controller] Login successful. Response sent.");
  } else {
    console.log(
      "[Auth Controller] Login failed: Invalid credentials (user not found or password mismatch).",
    );
    res.status(401); // Unauthorized
    throw new Error("Invalid credentials");
  }
});

export {
  // ES6 export
  registerUser,
  loginUser,
};
