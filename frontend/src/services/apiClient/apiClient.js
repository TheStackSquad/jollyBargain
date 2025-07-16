// frontend/src/services/apiClient.js
import axios from "axios"; // Import axios

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus(status) {
    return (status >= 200 && status < 300) || status === 304;
  },
});

// Request Interceptor: Add Authorization token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    // Create a new config object to avoid modifying the original parameter directly
    const newConfig = { ...config };
    if (token && newConfig.method !== "get") {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  (error) =>
    // Concise arrow function body as per arrow-body-style rule
    Promise.reject(error),
);

// Response Interceptor: Handle global errors or data transformations
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log(
    //   `[ApiClient] Axios response for ${response.config.url} - Status: ${response.status}`,
    // );

    if (response.status === 304) {
      // console.warn(
      //   `[ApiClient] Received 304 Not Modified for ${response.config.url}. No new data sent from server.`,
      // );
      return { data: null, status: 304, headers: response.headers };
    }

    const { success, count, data } = response.data;

    return {
      products: data || [],
      total: count || 0,
      status: response.status,
      success,
      headers: response.headers,
    };
  },
  (error) => {
    // console.error("Axios response error:", error); // Commented out

    let errorMessage = "An unknown error occurred.";
    let errorStatus = null;
    let errorData = null;

    if (error.response) {
      errorStatus = error.response.status;
      errorData = error.response.data;
      errorMessage = errorData.message || `HTTP error! Status: ${errorStatus}`;
      // console.error("Error response data:", errorData); // Commented out
      // console.error("Error response status:", errorStatus); // Commented out
      // console.error("Error response headers:", error.response.headers); // Commented out
    } else if (error.request) {
      errorMessage = "No response received from server.";
      // console.error("Error request:", error.request); // Commented out
    } else {
      errorMessage = error.message;
      // console.error("Error message:", errorMessage); // Commented out
    }

    const customError = new Error(errorMessage);
    customError.status = errorStatus;
    customError.data = errorData;

    return Promise.reject(customError);
  },
);

class ApiClient {
  // eslint-disable-next-line class-methods-use-this
  async get(endpoint, config = {}) {
    // Removed unnecessary try/catch wrapper
    const response = await axiosInstance.get(endpoint, config);
    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  async post(endpoint, data, config = {}) {
    // Removed unnecessary try/catch wrapper
    const response = await axiosInstance.post(endpoint, data, config);
    return response.data;
  }

  // eslint-disable-next-line class-methods-use-this
  async put(endpoint, data, config = {}) {
    // Removed unnecessary try/catch wrapper
    const response = await axiosInstance.put(endpoint, data, config);
    return response.data;
  }

  // eslint-disable-next-line class-methods-use-this
  async delete(endpoint, config = {}) {
    // Removed unnecessary try/catch wrapper
    const response = await axiosInstance.delete(endpoint, config);
    return response.data;
  }

  // eslint-disable-next-line class-methods-use-this
  async patch(endpoint, data, config = {}) {
    // Removed unnecessary try/catch wrapper
    const response = await axiosInstance.patch(endpoint, data, config);
    return response.data;
  }

  // eslint-disable-next-line class-methods-use-this
  setAuthToken(token) {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getAuthToken() {
    return localStorage.getItem("authToken");
  }
}

export const apiClient = new ApiClient();
