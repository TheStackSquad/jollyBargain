// frontend/src/reduxStore/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial state for the user slice.
 * - user: Stores user data (e.g., { id, email, name, ... }). Null if not authenticated.
 * - isAuthenticated: Boolean indicating login status.
 * - token: User's authentication token (e.g., JWT). Null if not authenticated.
 * - loading: Indicates if user-related operations (e.g., login) are in progress.
 * - error: Stores any error messages related to user operations.
 */
const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

/**
 * Creates a Redux slice for managing user authentication and data.
 */
const userSlice = createSlice({
  name: 'user', // A name for the slice
  initialState,
  reducers: {
    /**
     * Sets user data and authentication status upon successful login.
     * @param {object} state - The current user state.
     * @param {object} action - The action object, action.payload should be { user, token }.
     */
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false; // Ensure loading is false on success
      state.error = null;    // Clear any previous errors
    },

    /**
     * Clears user data and sets authentication status to false upon logout.
     * @param {object} state - The current user state.
     */
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    /**
     * Sets loading state for user-related operations.
     * @param {object} state - The current user state.
     */
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    /**
     * Sets an error message for user-related operations.
     * @param {object} state - The current user state.
     * @param {object} action - The action object, action.payload should be the error message string.
     */
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false; // Ensure loading is false on error
    },
  },
});

// Export action creators
export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
