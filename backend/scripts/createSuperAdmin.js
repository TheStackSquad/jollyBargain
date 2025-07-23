// backend/scripts/createSuperAdmin.js

import mongoose from "mongoose";
import User from "../models/User.js"; // Use ES module import
import dotenv from "dotenv"; // Use ES module import for dotenv
import readline from "readline"; // For interactive input

// Load environment variables from the parent directory's .env file
dotenv.config();

// --- ADD THIS DEBUG LINE ---
console.log(
  "MONGO_URI from .env:",
  process.env.MONGO_URI ? "Loaded" : "Undefined",
);
// --- END DEBUG LINE ---

// Setup readline interface for interactive input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

const createSuperAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for Super Admin creation.");

    // --- Prompt for credentials instead of relying solely on .env for security ---
    // This makes the script more secure as you don't hardcode sensitive passwords
    // directly in the .env file for initial setup.
    console.log("\n--- Creating Initial Super Admin User ---");
    const email = await askQuestion("Enter Super Admin Email: ");
    const username = await askQuestion("Enter Super Admin Username: ");
    const password = await askQuestion("Enter Super Admin Password: ");
    const confirmPassword = await askQuestion("Confirm Super Admin Password: ");

    if (password !== confirmPassword) {
      console.error("❌ Error: Passwords do not match!");
      rl.close();
      process.exit(1);
    }

    // Check if a user with this email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username }],
    });

    if (existingUser) {
      console.warn(
        `⚠️ User with email "${existingUser.email}" or username "${existingUser.username}" already exists.`,
      );
      // If an existing user is found and is already a superadmin, we can exit.
      if (existingUser.role === "superadmin") {
        console.log(
          "Super Admin user already exists. No new super admin created.",
        );
        rl.close();
        process.exit(0);
      } else {
        // If an existing user is found but not a superadmin, decide if you want to update them
        // For this script, we'll just warn and exit to prevent accidental overwrites.
        console.error(
          "❌ A user with this email or username already exists but is not a Super Admin. Please use different credentials or manually update their role.",
        );
        rl.close();
        process.exit(1);
      }
    }

    // Define super admin data
    const superAdminData = {
      username: username,
      email: email.toLowerCase(),
      password: password, // Mongoose pre-save hook will hash this
      role: "superadmin", // Set role to superadmin
      isActive: true,
      permissions: [
        "read",
        "write",
        "delete",
        "manage_users",
        "manage_products",
        "manage_orders",
        "view_analytics",
      ],
      profile: {
        firstName: "Super",
        lastName: "Admin",
      },
    };

    const superAdmin = new User(superAdminData);
    await superAdmin.save(); // The pre-save hook in User model will hash the password

    console.log("\n✅ Super Admin user created successfully!");
    console.log("Email:", superAdmin.email);
    console.log("Username:", superAdmin.username);
    console.log("Role:", superAdmin.role);
    console.log("Permissions:", superAdmin.permissions);
    console.log(
      "\n🔐 Please use these credentials to log into the admin panel.",
    );
  } catch (error) {
    console.error("❌ Error creating Super Admin user:", error);
    // If it's a Mongoose validation error, log details
    if (error.name === "ValidationError") {
      for (let field in error.errors) {
        console.error(`Field Error: ${field} - ${error.errors[field].message}`);
      }
    }
  } finally {
    rl.close(); // Close the readline interface
    await mongoose.disconnect(); // Disconnect Mongoose
    console.log("Database connection closed.");
    process.exit(0); // Exit the process cleanly
  }
};

// Run the script
createSuperAdminUser();
