// frontend/src/reduxStore/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import userReducer from './user/userSlice';

/**
 * Configures and creates the Redux store using Redux Toolkit's configureStore.
 *
 * configureStore automatically sets up:
 * - The Redux DevTools Extension for easy debugging.
 * - Thunk middleware for handling asynchronous logic (like API calls).
 * - Immutability checks and serializability checks.
 *
 * @returns {Store} The configured Redux store.
 */
export const store = configureStore({
  reducer: {
    // Define your state slices here.
    // The keys here will be the names of your state in the Redux store.
    // For example, `state.cart` will refer to the cart slice's state.
    cart: cartReducer,
    user: userReducer,
  },
  // You can add middleware, devTools options, etc., here if needed.
  // For most cases, the defaults provided by configureStore are sufficient.
});

// Optional: Export RootState and AppDispatch types for TypeScript users
// if you were using TypeScript, you would define these for better type inference.
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
