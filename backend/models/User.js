// backend/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Keep this - creates a unique index
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true, // Keep this - creates a unique index
    trim: true,
    lowercase: true,
    // Basic email format validation (optional, but good practice)
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Do not return password by default on queries
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date,
    default: null
  },
  // Admin-specific fields
  permissions: [{
    type: String,
    enum: ['read', 'write', 'delete', 'manage_users', 'manage_products', 'manage_orders', 'view_analytics']
  }],
  // Profile information
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    avatar: String
  },
  // Security
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: String,
}, {
  timestamps: true // Automatically handles createdAt and updatedAt
});

// Add index for role for faster queries on roles (e.g., finding all admins)
userSchema.index({ role: 1 });

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  // Check if lockUntil exists and is in the future
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash password if it's been modified or is new
  if (!this.isModified('password')) return next();

  try {
    // Hash password with salt rounds of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Pass error to next middleware/error handler
  }
});


// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    // Use `this.password` which is the hashed password from the database
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    // Log the actual error for debugging, then throw a generic message
    console.error('Password comparison error:', error);
    throw new Error('Password comparison failed due to an internal error.');
  }
};

// Method to check if user is admin
userSchema.methods.isAdmin = function() {
  return this.role === 'admin' || this.role === 'superadmin';
};

// Method to check if user has specific permission
userSchema.methods.hasPermission = function(permission) {
  // Ensure permissions array exists and includes the permission
  return this.permissions && this.permissions.includes(permission);
};

// Method to handle failed login attempts
userSchema.methods.incLoginAttempts = async function() { // Made async as updateOne returns a promise
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return await this.updateOne({ // Await the update
      $set: {
        loginAttempts: 1
      },
      $unset: {
        lockUntil: 1
      }
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };
  const MAX_LOGIN_ATTEMPTS = 5; // Define max attempts for clarity
  const LOCK_DURATION_MS = 2 * 60 * 60 * 1000; // Lock for 2 hours

  // If we've reached max attempts and aren't locked yet, lock the account
  if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    updates.$set = {
      lockUntil: Date.now() + LOCK_DURATION_MS
    };
  }

  return await this.updateOne(updates); // Await the update
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = async function() { // Made async as updateOne returns a promise
  return await this.updateOne({ // Await the update
    $unset: {
      loginAttempts: 1,
      lockUntil: 1
    },
    $set: {
      lastLogin: Date.now()
    }
  });
};

// Static method to create admin user
userSchema.statics.createAdmin = async function(userData) {
  const adminData = {
    ...userData,
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_products', 'manage_orders', 'view_analytics']
  };
  // 'this' refers to the Model here, so 'new this' creates a new document
  const admin = new this(adminData);
  return await admin.save();
};

// Static method to find admin users
userSchema.statics.findAdmins = function() {
  // 'this' refers to the Model here
  return this.find({ role: { $in: ['admin', 'superadmin'] } });
};

export default mongoose.model('User', userSchema);