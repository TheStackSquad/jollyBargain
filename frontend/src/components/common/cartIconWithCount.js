// frontend/src/components/common/CartIconWithCount.js
import React from "react";
import { useSelector } from "react-redux"; // Import useSelector to read from Redux store
import { ShoppingCart } from "lucide-react"; // Import the cart icon
import { Link } from "react-router-dom"; // Import Link for navigation

/**
 * CartIconWithCount Component
 * Displays a shopping cart icon with a real-time badge indicating the total number of items in the cart.
 * It reads the 'totalQuantity' from the Redux cart slice.
 */
function CartIconWithCount() {
  // Use useSelector to get the totalQuantity from the Redux store's cart slice.
  // We assume state.cart.totalQuantity exists and is updated by cartSlice.js.
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <Link
      to="/cart" // Link to the cart page
      className="relative flex items-center text-white hover:text-blue-200
      font-roboto transition-colors duration-300 hover:scale-105 transform"
      aria-label={`Shopping Cart with ${totalQuantity} items`} // Accessibility improvement
    >
      <ShoppingCart size={20} className="md:mr-2" /> {/* Cart icon */}
      {/* Conditionally render the badge if totalQuantity is greater than 0 */}
      {totalQuantity > 0 && (
        <span
          className="absolute -top-2 -right-2 md:right-0 bg-red-500 text-white text-xs
          font-bold rounded-full h-5 w-5 flex items-center justify-center
          transform translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:-translate-y-1/2"
          aria-live="polite" // Announce changes to screen readers
        >
          {totalQuantity}
        </span>
      )}
      <span className="hidden md:block">Cart</span>{" "}
      {/* Hide 'Cart' text on mobile */}
    </Link>
  );
}

export default CartIconWithCount;
