// frontend/src/utils/adminApi.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Request interceptor for adding auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // Create a new config object to avoid modifying the original parameter directly
  const newConfig = { ...config };
  if (token) {
    newConfig.headers.Authorization = `Bearer ${token}`;
  }
  return newConfig;
});

export default api;
