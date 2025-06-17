// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // We'll create this soon
import cors from 'cors';

dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(express.json()); // Allows us to accept JSON data in the body
app.use(cors()); // Enable CORS

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// We'll add more routes here later (e.g., product routes, user routes)

const PORT = process.env.PORT || 5000; // Use port from .env or 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});