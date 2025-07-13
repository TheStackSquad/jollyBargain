// frontend/src/reduxStore/user/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Import the authentication service functions
import { registerUser, loginUser, logout, isAuthenticated } from '../../services/userLoginServices';

// Define the initial state for the user slice.
// It initializes authentication status and token based on localStorage,
// ensuring session persistence across page reloads.
const initialState = {
  user: null, // Stores user details (e.g., { _id, email, name })
  token: isAuthenticated() ? localStorage.getItem('token') : null, // Initialize token from localStorage if present
  isAuthenticated: isAuthenticated(), // Initialize auth status based on token presence
  loading: false, // Indicates if an asynchronous operation (e.g., login, register) is in progress
  error: null, // Stores any error messages from failed operations
  successMessage: null, // Stores any success messages from completed operations
};

/**
 * Async thunk for user registration.
 * This thunk dispatches 'pending', 'fulfilled', or 'rejected' actions based on the API call result.
 * It calls the 'registerUser' service function to handle the actual API request and token storage.
 */
export const registerUserThunk = createAsyncThunk(
  'user/register', // Unique action type prefix for this thunk
  async ({ email, password, name }, { rejectWithValue }) => {
    console.log('[UserSlice Thunk] registerUserThunk initiated for:', email);
    try {
      // Call the registerUser service function to perform the API request.
      // This function is expected to return the user data and token upon success.
      const response = await registerUser(email, password, name);
      console.log('[UserSlice Thunk] registerUser service call successful. Response:', response);
      // The service function handles token storage in localStorage.
      // Return the relevant data (user and token) which will become the payload of the 'fulfilled' action.
      return response; // Expected structure: { user: { _id, email, name }, token: '...' }
    } catch (error) {
      // If an error occurs, extract a readable message.
      // 'error.message' typically comes from the Error thrown by the service function.
      const message = error.message || 'Registration failed';
      console.error('[UserSlice Thunk] registerUser service call failed. Error:', message);
      // Use rejectWithValue to pass the error message as the payload for the 'rejected' action.
      return rejectWithValue(message);
    }
  }
);

/**
 * Async thunk for user login.
 * Similar to registerUserThunk, it handles the login API call and dispatches appropriate actions.
 * It calls the 'loginUser' service function.
 */
export const loginUserThunk = createAsyncThunk(
  'user/login', // Unique action type prefix for this thunk
  async ({ email, password }, { rejectWithValue }) => {
    console.log('[UserSlice Thunk] loginUserThunk initiated for:', email);
    try {
      // Call the loginUser service function to perform the API request.
      const response = await loginUser(email, password);
      console.log('[UserSlice Thunk] loginUser service call successful. Response:', response);
      // The service function handles token storage in localStorage.
      // Return the relevant data (user and token) for the 'fulfilled' action.
      return response; // Expected structure: { user: { _id, email, name }, token: '...' }
    } catch (error) {
      // Extract a readable error message.
      const message = error.message || 'Login failed';
      console.error('[UserSlice Thunk] loginUser service call failed. Error:', message);
      // Pass the error message as the payload for the 'rejected' action.
      return rejectWithValue(message);
    }
  }
);

/**
 * Creates a Redux slice for managing user authentication and data.
 * A slice combines reducers, initial state, and action creators into a single entity.
 */
const userSlice = createSlice({
  name: 'user', // The name of the slice, used as a prefix for generated action types
  initialState, // The initial state defined above
  reducers: {
    /**
     * Reducer to manually set user details.
     * This can be useful if user profile data needs to be updated without a full
     * login/registration flow (e.g., after a profile edit).
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object, where action.payload is the user object.
     */
    setUserDetails: (state, action) => {
      console.log('[UserSlice Reducer] setUserDetails:', action.payload);
      state.user = action.payload; // Update the user object in the state
      state.isAuthenticated = true; // Assume setting user details means they are authenticated
      state.error = null; // Clear any previous errors
    },
    /**
     * Reducer to handle user logout.
     * It clears user data from the Redux state and triggers the logout function
     * from the service to remove the token from localStorage, effectively ending the session.
     */
    logoutUser: (state) => { // Renamed from 'logout' to 'logoutUser' to avoid conflict with imported 'logout' service function
      console.log('[UserSlice Reducer] logoutUser initiated.');
      logout(); // Call the service function to clear the token from localStorage
      state.user = null; // Clear user data from state
      state.token = null; // Clear token from state
      state.isAuthenticated = false; // Set authentication status to false
      state.loading = false; // Ensure loading state is false
      state.error = null; // Clear any errors
      state.successMessage = 'You have been logged out successfully.'; // Provide a success message
      console.log('[UserSlice Reducer] State after logout:', state);
    },
    /**
     * Reducer to clear any active error or success messages.
     * Useful for UI feedback, e.g., when a user navigates away or closes a message modal.
     */
    clearAuthMessages: (state) => {
      console.log('[UserSlice Reducer] clearAuthMessages initiated.');
      state.error = null;
      state.successMessage = null;
    },
    // New reducer to handle client-side password mismatch error
    setError: (state, action) => {
      console.log('[UserSlice Reducer] setError:', action.payload);
      state.error = action.payload;
      state.successMessage = null;
    }
  },
  // extraReducers handle actions dispatched by createAsyncThunk.
  // They respond to the 'pending', 'fulfilled', and 'rejected' lifecycle actions of thunks.
  extraReducers: (builder) => {
    builder
      // --- Register User Thunk lifecycle ---
      .addCase(registerUserThunk.pending, (state) => {
        console.log('[UserSlice Extra Reducer] registerUserThunk.pending');
        state.loading = true; // Set loading to true when registration starts
        state.error = null; // Clear any previous errors
        state.successMessage = null; // Clear any previous success messages
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        console.log('[UserSlice Extra Reducer] registerUserThunk.fulfilled. Payload:', action.payload);
        state.loading = false; // Registration completed, set loading to false
        state.isAuthenticated = true; // User is now authenticated
        state.user = action.payload.user; // Store user details from the thunk's payload
        state.token = action.payload.token; // Store token from the thunk's payload
        state.successMessage = action.payload.message || 'Registration successful!'; // Set success message
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        console.error('[UserSlice Extra Reducer] registerUserThunk.rejected. Payload:', action.payload);
        state.loading = false; // Registration failed, set loading to false
        state.isAuthenticated = false; // User is not authenticated
        state.user = null; // Clear user data
        state.token = null; // Clear token
        state.error = action.payload; // Store the error message from rejectWithValue
        state.successMessage = null; // Clear success message
      })
      // --- Login User Thunk lifecycle ---
      .addCase(loginUserThunk.pending, (state) => {
        console.log('[UserSlice Extra Reducer] loginUserThunk.pending');
        state.loading = true; // Set loading to true when login starts
        state.error = null; // Clear any previous errors
        state.successMessage = null; // Clear any previous success messages
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        console.log('[UserSlice Extra Reducer] loginUserThunk.fulfilled. Payload:', action.payload);
        state.loading = false; // Login completed, set loading to false
        state.isAuthenticated = true; // User is now authenticated
        state.user = action.payload.user; // Store user details from the thunk's payload
        state.token = action.payload.token; // Store token from the thunk's payload
        state.successMessage = action.payload.message || 'Login successful!'; // Set success message
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        console.error('[UserSlice Extra Reducer] loginUserThunk.rejected. Payload:', action.payload);
        state.loading = false; // Login failed, set loading to false
        state.isAuthenticated = false; // User is not authenticated
        state.user = null; // Clear user data
        state.token = null; // Clear token
        state.error = action.payload; // Store the error message from rejectWithValue
        state.successMessage = null; // Clear success message
      });
  },
});

// Export the action creators generated by createSlice
export const { setUserDetails, logoutUser, clearAuthMessages, setError } = userSlice.actions;

// Export the reducer as the default export for the store configuration
export default userSlice.reducer;
