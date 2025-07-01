// backend/server.js

import 'dotenv/config'; // Load environment variables from .env file FIRST
import express from 'express';
import connectDB from './config/db.js';

// --- Optional: For debugging env vars during setup ---
console.log('Environment Variables Loaded:');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);
// --- Remove these lines after confirming it works ---

// --- Optional: For browser live reload (if needed later) ---
// import livereload from 'livereload';
// import connectLiveReload from 'connect-livereload';
// import path from 'path';
// import { fileURLToPath } from 'url';
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// if (process.env.NODE_ENV === 'development') {
//   const liveReloadServer = livereload.createServer();
//   liveReloadServer.watch(path.join(__dirname, 'public')); // Example path
//   liveReloadServer.server.once('connection', () => {
//     setTimeout(() => {
//       liveReloadServer.refresh('/');
//     }, 100);
//   });
//   app.use(connectLiveReload());
// }
// --- End browser live reload section ---

const app = express();
// Use the PORT from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas (moved to its own file)
connectDB();

// Middleware
app.use(express.json()); // For parsing JSON request bodies (e.g., from POST requests)
app.use(express.urlencoded({ extended: false })); // For parsing URL-encoded form data

// Define your routes here
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});