// frontend/src/services/userLoginServices.js

import api from '../utils/adminApi';

/**
 * Helper function to set the authentication token in localStorage.
 * This function also updates the default headers of the API client if needed,
 * ensuring that subsequent requests are authenticated.
 * @param {string | null} token - The JWT token string to set, or null to remove.
 */
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    console.log('[AuthService] Token saved to localStorage:', token.substring(0, 10) + '...'); // Log a snippet
    // If your 'api' (e.g., Axios) instance needs the token in its default headers:
    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    console.log('[AuthService] Token removed from localStorage.');
    // If your 'api' (e.g., Axios) instance needs the token removed from headers:
    // delete api.defaults.headers.common['Authorization'];
  }
};

/**
 * Helper function to retrieve the authentication token from localStorage.
 * @returns {string | null} The JWT token string, or null if not found.
 */
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  console.log('[AuthService] Checking getAuthToken. Token found:', !!token);
  return token;
};

/**
 * Registers a new user by sending their email, password, and name to the backend.
 * Upon successful registration, the received token is stored.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's chosen password.
 * @param {string} name - The user's name.
 * @returns {Promise<Object>} A promise that resolves with the user data and token
 * if registration is successful.
 * @throws {Error} If the registration API call fails or the response is unexpected.
 */
export const registerUser = async (email, password, name) => {
  console.log('[AuthService] registerUser called. Attempting to register:', { email, name });
  try {
    console.log('[AuthService] Sending POST request to /auth/register...');
    const response = await api.post('/auth/register', { // CORRECTED: Use '/auth/register'
      email,
      password,
      name,
    });
    console.log('[AuthService] Response received from /auth/register:', response.data);

    if (response.data && response.data.data && response.data.data.token) {
      setAuthToken(response.data.data.token); // Store the received token
      console.log('[AuthService] Registration successful. Returning data.');
      return response.data.data; // Return the nested data containing user info and token
    } else {
      const errorMessage = response.data.message || 'Registration failed: Unexpected response structure.';
      console.error('[AuthService] Registration failed with unexpected response:', errorMessage, response.data);
      throw new Error(errorMessage);
    }
  } catch (error) {
    // Log the detailed error for debugging purposes
    console.error(
      '[AuthService] Registration API error caught:',
      error.response?.data || error.message,
      'Status:', error.response?.status
    );
    // Throw a more user-friendly error message
    throw new Error(error.response?.data?.message || 'Failed to register. Please try again.');
  }
};

/**
 * Logs in an existing user by sending their identifier (email) and password to the backend.
 * Upon successful login, the received token is stored.
 * @param {string} identifier - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} A promise that resolves with the user data and token
 * if login is successful.
 * @throws {Error} If the login API call fails or the response is unexpected.
 */
export const loginUser = async (identifier, password) => {
  console.log('[AuthService] loginUser called. Attempting to login:', { identifier });
  try {
    console.log('[AuthService] Sending POST request to /auth/login...');
    const response = await api.post('/auth/login', {
      identifier,
      password,
    });
    console.log('[AuthService] Response received from /auth/login:', response.data);

    if (response.data && response.data.data && response.data.data.token) {
      setAuthToken(response.data.data.token); // Store the received token
      console.log('[AuthService] Login successful. Returning data.');
      return response.data.data; // Return the nested data containing user info and token
    } else {
      const errorMessage = response.data.message || 'Login failed: Unexpected response structure.';
      console.error('[AuthService] Login failed with unexpected response:', errorMessage, response.data);
      throw new Error(errorMessage);
    }
  } catch (error) {
    // Log the detailed error for debugging purposes
    console.error(
      '[AuthService] Login API error caught:',
      error.response?.data || error.message,
      'Status:', error.response?.status
    );
    // Throw a more user-friendly error message
    throw new Error(error.response?.data?.message || 'Failed to authenticate. Please try again.');
  }
};

/**
 * Logs out the current user by removing their token from localStorage.
 * This effectively ends the user's session.
 */
export const logout = () => {
  console.log('[AuthService] logout called. Clearing session.');
  setAuthToken(null); // Call setAuthToken with null to remove the token
  console.log('[AuthService] User logged out. Session cleared.');
};

/**
 * Checks if the user is currently authenticated by verifying the presence
 * of a token in localStorage. This is crucial for session persistence.
 * @returns {boolean} True if a token is found, false otherwise.
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  console.log('[AuthService] isAuthenticated check: Token present?', !!token);
  return !!token; // Returns true if token is a non-empty string, false otherwise
};
