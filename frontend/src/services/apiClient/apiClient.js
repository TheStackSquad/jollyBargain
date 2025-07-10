// frontend/src/services/apiClient.js
import axios from 'axios'; // Import axios

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // By default, axios throws an error for responses outside the 2xx range.
  // For 304 Not Modified, axios typically resolves successfully, but without data.
  // We'll handle 304 explicitly in the response interceptor or method.
  validateStatus: function (status) {
    // Clarify the order of operations with parentheses
    return (status >= 200 && status < 300) || status === 304; // Allow 304 to be treated as a success
  },
});

// Request Interceptor: Add Authorization token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    // Conditionally add auth token.
    // For GET requests, you might not always need a token,
    // but if a specific GET endpoint requires it, you can add an `auth: true` option
    // to the request config and check for it here.
    // For simplicity, let's add it to all requests for now, or you can refine this.
    // Current logic from your original code: don't add token for GET by default.
    if (token && config.method !== 'get') { // Note: axios method names are lowercase
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors or data transformations
axiosInstance.interceptors.response.use(
  (response) => {
    // This function runs for 2xx and 304 responses (due to validateStatus config)
    console.log(`[ApiClient] Axios response for ${response.config.url} - Status: ${response.status}`);

    // If 304 Not Modified, return a specific structure to indicate no new data
    if (response.status === 304) {
      console.warn(`[ApiClient] Received 304 Not Modified for ${response.config.url}. No new data sent from server.`);
      // Return a consistent structure that useProducts can understand
      return { data: null, status: 304, headers: response.headers };
    }

    // For 2xx responses, process the data as per your backend structure
    // Your backend response has { success: true, count: N, data: [...] }
    const { success, count, data } = response.data;

    // Return a standardized object for use by productService and hooks
    return {
      products: data || [], // Ensure 'products' is an array
      total: count || 0,    // Ensure 'total' is a number
      status: response.status,
      success: success,
      headers: response.headers,
    };
  },
  (error) => {
    // This function runs for responses outside the 2xx range (excluding 304 due to validateStatus)
    // or network errors.
    console.error('Axios response error:', error);

    let errorMessage = 'An unknown error occurred.';
    let errorStatus = null;
    let errorData = null;

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorStatus = error.response.status;
      errorData = error.response.data;
      errorMessage = errorData.message || `HTTP error! Status: ${errorStatus}`;
      console.error('Error response data:', errorData);
      console.error('Error response status:', errorStatus);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an http.ClientRequest in node.js
      errorMessage = 'No response received from server.';
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
      console.error('Error message:', errorMessage);
    }

    // Create a custom error object to throw, including status if available
    const customError = new Error(errorMessage);
    customError.status = errorStatus;
    customError.data = errorData; // Attach original error data if available

    return Promise.reject(customError); // Re-throw the custom error
  }
);


class ApiClient {
  constructor() {
    // The baseURL is already set on axiosInstance
    // this.baseURL = API_BASE_URL; // No longer needed as axiosInstance handles it
    // this.defaultHeaders = { ... }; // No longer needed as axiosInstance handles it
  }

  // Simplified request methods using axiosInstance
  async get(endpoint, config = {}) {
    try {
      // Axios automatically returns response.data for 2xx responses
      // Our interceptor will standardize the return format ({ products, total, status })
      const response = await axiosInstance.get(endpoint, config);
      return response; // The interceptor already transformed this
    } catch (error) {
      console.error(`[ApiClient] GET request to ${endpoint} failed:`, error);
      throw error; // Re-throw the error from the interceptor
    }
  }

  async post(endpoint, data, config = {}) {
    try {
      const response = await axiosInstance.post(endpoint, data, config);
      return response.data; // Return raw data for non-product-list endpoints
    } catch (error) {
      console.error(`[ApiClient] POST request to ${endpoint} failed:`, error);
      throw error;
    }
  }

  async put(endpoint, data, config = {}) {
    try {
      const response = await axiosInstance.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`[ApiClient] PUT request to ${endpoint} failed:`, error);
      throw error;
    }
  }

  async delete(endpoint, config = {}) {
    try {
      const response = await axiosInstance.delete(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`[ApiClient] DELETE request to ${endpoint} failed:`, error);
      throw error;
    }
  }

  async patch(endpoint, data, config = {}) {
    try {
      const response = await axiosInstance.patch(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`[ApiClient] PATCH request to ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Auth token methods remain the same as they interact with localStorage
  setAuthToken(token) {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }
}

export const apiClient = new ApiClient(); // Instantiate without baseURL, as axiosInstance handles it
