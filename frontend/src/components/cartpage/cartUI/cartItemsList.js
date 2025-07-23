// frontend/src/components/cartpage/cartUI/CartItemsList.js
import React from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import {
  updateItemQuantity,
  removeItemFromCart,
} from "../../../reduxStore/cart/cartSlice";
import { MotionDiv, headerVariants } from "../../../animation/cartAnimate";
import CartItem from "../cartItem"; // Corrected import path: removed 'cartpage/'

// Changed to a function declaration for ESLint rule: react/function-component-definition
function CartItemsList({ cartItems }) {
  const dispatch = useDispatch();

  // Handle quantity change - dispatch Redux action
  const handleQuantityChange = (id, delta) => {
    dispatch(updateItemQuantity({ id, delta }));
  };

  // Handle item removal - dispatch Redux action
  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  // Handle save for later (simulated) - for now, just removes from cart
  const handleSaveForLater = (id) => {
    dispatch(removeItemFromCart(id));
    // You could add a toast notification here instead of the previous alert
  };

  // Trust features data (moved here from CartPage to be self-contained)
  const trustFeatures = [
    {
      icon: (
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      bgColor: "bg-green-500",
      text: "Secure Checkout",
      textColor: "text-green-800",
    },
    {
      icon: (
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: "bg-blue-500",
      text: "Fast Delivery",
      textColor: "text-blue-800",
    },
    {
      icon: (
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: "bg-purple-500",
      text: "Quality Guaranteed",
      textColor: "text-purple-800",
    },
  ];

  return (
    <>
      {/* Section Header */}
      <MotionDiv
        variants={headerVariants}
        className="flex items-center justify-between mb-6 pb-4 border-b border-gradient-to-r from-indigo-200 to-purple-200"
      >
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Items in your Cart
            </h2>
            <p className="text-sm text-gray-600">
              Review and modify your selected items
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600">Premium Selection</span>
        </div>
      </MotionDiv>

      {/* Cart Items */}
      <div className="space-y-4">
        <AnimatePresence>
          {cartItems.map((item, index) => (
            <MotionDiv
              key={item._id} // Using item._id as key for stability
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 overflow-hidden"
            >
              <CartItem
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
                onSaveForLater={handleSaveForLater}
              />
            </MotionDiv>
          ))}
        </AnimatePresence>
      </div>

      {/* Trust Indicators (moved from CartPage to be self-contained within CartItemsList's section) */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200"
      >
        <div className="flex items-center justify-center space-x-8">
          {trustFeatures.map(
            (
              feature, // Removed index from map and using feature.text as key
            ) => (
              <div key={feature.text} className="flex items-center">
                <div
                  className={`w-8 h-8 ${feature.bgColor} rounded-full flex items-center justify-center mr-2`}
                >
                  {feature.icon}
                </div>
                <span className={`text-sm font-medium ${feature.textColor}`}>
                  {feature.text}
                </span>
              </div>
            ),
          )}
        </div>
      </MotionDiv>
    </>
  );
}

export default CartItemsList;
