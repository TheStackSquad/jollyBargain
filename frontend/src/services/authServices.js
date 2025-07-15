// frontend/src/services/authService.js
import api from "../utils/adminApi";

export const adminLogin = async (identifier, password) => {
  try {
    const response = await api.post("/auth/login", {
      identifier,
      password,
    });

    // --- DEBUG LOGS START ---
    // console.log("authService: Backend response data:", response.data);
    // console.log("authService: Token received:", response.data?.data?.token); // Check nested structure
    // --- DEBUG LOGS END ---

    // Assuming the backend returns { success: true, data: { token: 'jwt_token_string', user: { ... } } }
    // Note the `data` nesting in the backend response
    if (response.data && response.data.data && response.data.data.token) {
      localStorage.setItem("token", response.data.data.token); // Correctly access nested token
      // console.log("authService: Token saved to localStorage."); // Confirm save
      return response.data.data; // Return the nested data object
    }
    throw new Error(
      response.data.message ||
        "Login failed: No token received or unexpected response structure.",
    );
  } catch (error) {
    // console.error(
    //   "Admin login API error:",
    //   error.response?.data || error.message,
    // );
    throw new Error(
      error.response?.data?.message ||
        "Failed to authenticate. Please try again.",
    );
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  // console.log("authService: Token removed from localStorage."); // Confirm removal
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  // console.log(
  //   "authService: Checking isAuthenticated. Token in localStorage:",
  //   !!token,
  // ); // Log token presence
  return !!token;
};
