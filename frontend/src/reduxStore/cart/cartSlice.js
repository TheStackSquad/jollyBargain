// frontend/src/reduxStore/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Function to load cart state from localStorage
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) {
      return undefined; // Let Redux use its default initialState if nothing is in localStorage
    }
    // Parse the JSON string back into a JavaScript object
    return JSON.parse(serializedState);
  } catch (e) {
    // console.warn("Could not load cart state from localStorage", e);
    return undefined; // Return undefined to use default initialState on error
  }
};

// Function to save cart state to localStorage
const saveCartState = (state) => {
  try {
    // Serialize the state object to a JSON string before saving
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch (e) {
    // console.warn("Could not save cart state to localStorage", e);
  }
};

// Initial state for the cart slice.
// It tries to load from localStorage first, otherwise uses default empty state.
const initialState = loadCartState() || {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItemToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);

      // Fix for no-plusplus:
      state.totalQuantity += 1; // Changed from state.totalQuantity++;
      state.totalAmount += product.price;

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      // After any state change, save the entire cart state to localStorage
      saveCartState(state);
    },

    updateItemQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const existingItem = state.items.find((item) => item._id === id);

      if (existingItem) {
        state.totalQuantity += delta;
        state.totalAmount += existingItem.price * delta;

        existingItem.quantity += delta;

        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item._id !== id);
        }
      }
      // After any state change, save the entire cart state to localStorage
      saveCartState(state);
    },

    removeItemFromCart: (state, action) => {
      const idToRemove = action.payload;
      const removedItem = state.items.find((item) => item._id === idToRemove);

      if (removedItem) {
        state.totalQuantity -= removedItem.quantity;
        state.totalAmount -= removedItem.price * removedItem.quantity;
        state.items = state.items.filter((item) => item._id !== idToRemove);
      }
      // After any state change, save the entire cart state to localStorage
      saveCartState(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      // After clearing, save the empty state to localStorage
      saveCartState(state);
    },
  },

  // ... (rest of your slice) ...
});

export const {
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
