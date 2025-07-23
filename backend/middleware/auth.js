// backend/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Basic authentication middleware
export const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if it's an access token
    if (decoded.type !== "access") {
      return res.status(401).json({
        success: false,
        message: "Invalid token type",
      });
    }

    // Find user and check if active
    const user = await User.findById(decoded.userId).select("-password");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User not found or inactive",
      });
    }

    // Add user info to request
    req.user = {
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    console.error("Authentication error:", error);
    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

// Admin authentication middleware
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (req.user.role !== "admin" && req.user.role !== "superadmin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }

  next();
};

// Super admin authentication middleware
export const requireSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (req.user.role !== "superadmin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Super admin privileges required.",
    });
  }

  next();
};

// Permission-based middleware
export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. ${permission} permission required.`,
      });
    }

    next();
  };
};

// Multiple permissions middleware (user needs ALL permissions)
export const requirePermissions = (permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const hasAllPermissions = permissions.every((permission) =>
      req.user.permissions.includes(permission),
    );

    if (!hasAllPermissions) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required permissions: ${permissions.join(", ")}`,
      });
    }

    next();
  };
};

// Any permission middleware (user needs ANY of the permissions)
export const requireAnyPermission = (permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const hasAnyPermission = permissions.some((permission) =>
      req.user.permissions.includes(permission),
    );

    if (!hasAnyPermission) {
      return res.status(403).json({
        success: false,
        message: `Access denied. One of these permissions required: ${permissions.join(", ")}`,
      });
    }

    next();
  };
};

// Optional authentication middleware (doesn't fail if no token)
export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type !== "access") {
      return next();
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (user && user.isActive) {
      req.user = {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      };
    }

    next();
  } catch (error) {
    // Don't fail on invalid token, just continue without user
    next();
  }
};

// exports = {
//   authenticate,
//   requireAdmin,
//   requireSuperAdmin,
//   requirePermission,
//   requirePermissions,
//   requireAnyPermission,
//   optionalAuth
// };
