// backend/models/LoginAttempt.js
import mongoose from "mongoose";

const loginAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: false, // Can be null for failed attempts by non-existent users
  },
  identifier: {
    // The email or username attempted during login
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  userAgent: {
    // Browser and OS info from request headers
    type: String,
    required: false,
  },
  status: {
    // 'success' or 'failure'
    type: String,
    enum: ["success", "failure"],
    required: true,
  },
  reason: {
    // E.g., 'invalid_password', 'account_locked', 'user_not_found', 'deactivated'
    type: String,
    required: false,
  },
});

// Indexes for faster queries on login attempts by user, identifier, or timestamp
loginAttemptSchema.index({ userId: 1, timestamp: -1 });
loginAttemptSchema.index({ identifier: 1, timestamp: -1 });
loginAttemptSchema.index({ timestamp: -1 }); // For general chronological lookup

export default mongoose.model("LoginAttempt", loginAttemptSchema);
