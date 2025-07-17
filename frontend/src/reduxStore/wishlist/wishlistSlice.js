// frontend/src/reduxStore/wishlist/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // This will store product IDs or full product objects
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const productToAdd = action.payload; // Expecting the full product object
      // Check if item already exists to prevent duplicates
      const exists = state.items.some((item) => item._id === productToAdd._id);
      if (!exists) {
        state.items.push(productToAdd);
        // Optional: Save to localStorage here if you want persistence
        // localStorage.setItem('wishlistItems', JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action) => {
      const productIdToRemove = action.payload; // Expecting just the product ID
      state.items = state.items.filter(
        (item) => item._id !== productIdToRemove,
      );
      // Optional: Save to localStorage here
      // localStorage.setItem('wishlistItems', JSON.stringify(state.items));
    },
    // You might add a loadWishlistFromLocalStorage action later
    // For now, let's keep it simple
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

// Selector to check if a product is in the wishlist
export const selectIsInWishlist = (state, productId) =>
  state.wishlist.items.some((item) => item._id === productId);

export default wishlistSlice.reducer;
