// backend/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true, // Email must be unique
    lowercase: true, // Store emails in lowercase
    match: [/.+\@.+\..+/, 'Please use a valid email address'], // Basic email regex validation
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false, // Don't return password in query results by default
  },
  // You might want to add more fields later, e.g., name, role, etc.
  name: {
    type: String,
    required: false, // Name can be optional for now
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Mongoose Pre-save hook to hash password before saving
UserSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) {
    return next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password in the database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);