// frontend/src/services/userLoginServices.js

import api from "../utils/adminApi";

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    // console.log(
    //   "[AuthService] Token saved to localStorage:",
    //   `${token.substring(0, 10)}...`,
    // );
    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    // console.log("[AuthService] Token removed from localStorage.");
    // delete api.defaults.headers.common['Authorization'];
  }
};

const getAuthToken = () => {
  const token = localStorage.getItem("token");
  // console.log("[AuthService] Checking getAuthToken. Token found:", !!token);
  return token;
};

export const registerUser = async (email, password, name) => {
  // console.log("[AuthService] registerUser called. Attempting to register:", {
  //   email,
  //   name,
  // });
  try {
    // console.log("[AuthService] Sending POST request to /auth/register...");
    const response = await api.post("/auth/register", {
      email,
      password,
      name,
    });
    // console.log(
    //   "[AuthService] Response received from /auth/register:",
    //   response.data,
    // );

    if (response.data && response.data.data && response.data.data.token) {
      setAuthToken(response.data.data.token);
      // console.log("[AuthService] Registration successful. Returning data.");
      return response.data.data;
    }
    const errorMessage =
      response.data.message ||
      "Registration failed: Unexpected response structure.";
    // console.error(
    //   "[AuthService] Registration failed with unexpected response:",
    //   errorMessage,
    //   response.data,
    // );
    throw new Error(errorMessage);
  } catch (error) {
    // console.error(
    //   "[AuthService] Registration API error caught:",
    //   error.response?.data || error.message,
    //   "Status:",
    //   error.response?.status,
    // );
    throw new Error(
      error.response?.data?.message || "Failed to register. Please try again.",
    );
  }
};

export const loginUser = async (identifier, password) => {
  // console.log("[AuthService] loginUser called. Attempting to login:", {
  //   identifier,
  // });
  try {
    // console.log("[AuthService] Sending POST request to /auth/login...");
    const response = await api.post("/auth/login", {
      identifier,
      password,
    });
    // console.log(
    //   "[AuthService] Response received from /auth/login:",
    //   response.data,
    // );

    if (response.data && response.data.data && response.data.data.token) {
      setAuthToken(response.data.data.token);
      // console.log("[AuthService] Login successful. Returning data.");
      return response.data.data;
    }
    const errorMessage =
      response.data.message || "Login failed: Unexpected response structure.";
    // console.error(
    //   "[AuthService] Login failed with unexpected response:",
    //   errorMessage,
    //   response.data,
    // );
    throw new Error(errorMessage);
  } catch (error) {
    // console.error(
    //   "[AuthService] Login API error caught:",
    //   error.response?.data || error.message,
    //   "Status:",
    //   error.response?.status,
    // );
    throw new Error(
      error.response?.data?.message ||
        "Failed to authenticate. Please try again.",
    );
  }
};

export const logout = () => {
  // console.log("[AuthService] logout called. Clearing session.");
  setAuthToken(null);
  // console.log("[AuthService] User logged out. Session cleared.");
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  // console.log("[AuthService] isAuthenticated check: Token present?", !!token);
  return !!token;
};
