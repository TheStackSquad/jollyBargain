// backend/controllers/authController.js
import jwt from 'jsonwebtoken';
import adminUser from '../models/adminUser.js';
import LoginAttempt from '../models/loginAttempt.js';
import rateLimit from 'express-rate-limit';

// Rate limiting for login attempts (applied as middleware on the route)
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false, // Consistent with API response structure
    message: 'Too many login attempts from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
});

// Generate JWT access token
const generateAccessToken = (userId, role, permissions) => {
  return jwt.sign(
    {
      userId,
      role,
      permissions, // Include permissions in access token for client-side checks
      type: 'access'
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Default to 1 hour for access token
      issuer: 'jollyBargain-api',
      audience: 'jollyBargain-client'
    }
  );
};

// Generate JWT refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign(
    {
      userId,
      type: 'refresh'
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d', // Default to 7 days for refresh token
      issuer: 'jollyBargain-api',
      audience: 'jollyBargain-client'
    }
  );
};


export const login = async (req, res) => {
  const { identifier, password } = req.body;
  const ipAddress = req.ip; // Get client IP address
  const userAgent = req.headers['user-agent']; // Get user agent string

  let user = null; // Initialize user outside try/catch for logging
  let logStatus = 'failure'; // Default log status
  let logReason = 'unknown'; // Default log reason

  try {
    // Input validation
    if (!identifier || !password) {
      logReason = 'missing_credentials';
      await LoginAttempt.create({ identifier, ipAddress, userAgent, status: logStatus, reason: logReason });
      return res.status(400).json({
        success: false,
        message: 'Email/Username and password are required.'
      });
    }

    // Find user by email or username, and explicitly select password
    user = await adminUser.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier }
      ]
    }).select('+password'); // Crucial: Select password for comparison

    if (!user) {
      logReason = 'user_not_found';
      await LoginAttempt.create({ identifier, ipAddress, userAgent, status: logStatus, reason: logReason });
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.' // Generic message for security
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      logReason = 'account_locked';
      await LoginAttempt.create({ userId: user._id, identifier, ipAddress, userAgent, status: logStatus, reason: logReason });
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to too many failed login attempts. Please try again later.'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      logReason = 'account_deactivated';
      await LoginAttempt.create({ userId: user._id, identifier, ipAddress, userAgent, status: logStatus, reason: logReason });
      return res.status(401).json({
        success: false,
        message: 'Your account is deactivated. Please contact support.'
      });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      // Increment login attempts (handled by user model method)
      await user.incLoginAttempts(); // This updates the user document in DB
      logReason = 'invalid_password';
      await LoginAttempt.create({ userId: user._id, identifier, ipAddress, userAgent, status: logStatus, reason: logReason });
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.' // Generic message for security
      });
    }

    // --- Successful Login ---
    logStatus = 'success';
    logReason = 'authenticated';

    // Reset login attempts and update lastLogin on successful login
    await user.resetLoginAttempts(); // This updates loginAttempts, lockUntil, and lastLogin
    // Note: user.lastLogin is updated by resetLoginAttempts, so no need to set it here again.

    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.role, user.permissions);
    const refreshToken = generateRefreshToken(user._id);

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
      sameSite: 'strict', // Protects against CSRF
      maxAge: parseInt(process.env.JWT_REFRESH_EXPIRES_IN_MS || '604800000', 10) // 7 days in milliseconds
    });

    // Log successful attempt
    await LoginAttempt.create({ userId: user._id, identifier, ipAddress, userAgent, status: logStatus, reason: logReason });

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token: accessToken, // Access token sent in response body
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          permissions: user.permissions,
          profile: user.profile,
          lastLogin: user.lastLogin // Updated by resetLoginAttempts
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    // Log unexpected errors
    await LoginAttempt.create({ userId: user?._id, identifier, ipAddress, userAgent, status: 'failure', reason: `server_error: ${error.message}` });
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};


export const logout = (req, res) => {
  try {
    // Clear refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
};


export const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  try {
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not provided.'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (decoded.type !== 'refresh') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token type.'
      });
    }

    // Find user (don't need password for refresh)
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive.'
      });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user._id, user.role, user.permissions);

    res.status(200).json({
      success: true,
      data: {
        token: newAccessToken
      }
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    // Clear the invalid refresh token cookie to prevent endless loops
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token. Please log in again.'
    });
  }
};


export const getProfile = async (req, res) => {
  try {
    // req.user is populated by the authenticate middleware
    const user = await adminUser.findById(req.user.userId).select('-password -twoFactorSecret');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          permissions: user.permissions,
          profile: user.profile,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile.'
    });
  }
};
