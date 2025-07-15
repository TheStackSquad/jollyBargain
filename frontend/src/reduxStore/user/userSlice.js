// frontend/src/reduxStore/user/userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logout,
  isAuthenticated,
} from "../../services/userLoginServices";

const initialState = {
  user: null,
  token: isAuthenticated() ? localStorage.getItem("token") : null,
  isAuthenticated: isAuthenticated(),
  loading: false,
  error: null,
  successMessage: null,
};

export const registerUserThunk = createAsyncThunk(
  "user/register",
  async ({ email, password, name }, { rejectWithValue }) => {
    // console.log("[UserSlice Thunk] registerUserThunk initiated for:", email);
    try {
      const response = await registerUser(email, password, name);
      // console.log(
      //   "[UserSlice Thunk] registerUser service call successful. Response:",
      //   response,
      // );
      return response;
    } catch (error) {
      const message = error.message || "Registration failed";
      // console.error(
      //   "[UserSlice Thunk] registerUser service call failed. Error:",
      //   message,
      // );
      return rejectWithValue(message);
    }
  },
);

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    // console.log("[UserSlice Thunk] loginUserThunk initiated for:", email);
    try {
      const response = await loginUser(email, password);
      // console.log(
      //   "[UserSlice Thunk] loginUser service call successful. Response:",
      //   response,
      // );
      return response;
    } catch (error) {
      const message = error.message || "Login failed";
      // console.error(
      //   "[UserSlice Thunk] loginUser service call failed. Error:",
      //   message,
      // );
      return rejectWithValue(message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      // console.log("[UserSlice Reducer] setUserDetails:", action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logoutUser: (state) => {
      // console.log("[UserSlice Reducer] logoutUser initiated.");
      logout();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.successMessage = "You have been logged out successfully.";
      // console.log("[UserSlice Reducer] State after logout:", state);
    },
    clearAuthMessages: (state) => {
      // console.log("[UserSlice Reducer] clearAuthMessages initiated.");
      state.error = null;
      state.successMessage = null;
    },
    setError: (state, action) => {
      // console.log("[UserSlice Reducer] setError:", action.payload);
      state.error = action.payload;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        // console.log("[UserSlice Extra Reducer] registerUserThunk.pending");
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        // console.log(
        //   "[UserSlice Extra Reducer] registerUserThunk.fulfilled. Payload:",
        //   action.payload,
        // );
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.successMessage =
          action.payload.message || "Registration successful!";
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        // console.error(
        //   "[UserSlice Extra Reducer] registerUserThunk.rejected. Payload:",
        //   action.payload,
        // );
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
        state.successMessage = null;
      })
      .addCase(loginUserThunk.pending, (state) => {
        // console.log("[UserSlice Extra Reducer] loginUserThunk.pending");
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        // console.log(
        //   "[UserSlice Extra Reducer] loginUserThunk.fulfilled. Payload:",
        //   action.payload,
        // );
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.successMessage = action.payload.message || "Login successful!";
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        // console.error(
        //   "[UserSlice Extra Reducer] loginUserThunk.rejected. Payload:",
        //   action.payload,
        // );
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
        state.successMessage = null;
      });
  },
});

export const { setUserDetails, logoutUser, clearAuthMessages, setError } =
  userSlice.actions;

export default userSlice.reducer;
