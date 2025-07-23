// backend/config/stripe.js
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Check if the Stripe secret key is defined
if (!process.env.STRIPE_SECRET_KEY) {
  console.error(
    "FATAL ERROR: STRIPE_SECRET_KEY is not defined in environment variables."
  );

}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20", // Use the API version that matches your Stripe account or a recent stable one
});

export default stripe;
