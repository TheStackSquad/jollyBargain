// frontend/src/components/cartpage/cartUI/CartHeader.js
import React from "react";
import { ShoppingCart } from "lucide-react";
import { MotionDiv, headerVariants } from "../../../animation/cartAnimate";

// Changed to a function declaration to satisfy 'react/function-component-definition'
function CartHeader({ itemCount }) {
  return (
    <>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-200 rounded-full opacity-20 animate-pulse delay-2000" />
      </div>

      {/* Header Section */}
      <MotionDiv
        className="text-center mb-8 sm:mb-12 relative z-10"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full shadow-lg mb-6">
          <ShoppingCart className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Your Shopping Cart
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          {itemCount > 0
            ? `${itemCount} item${itemCount > 1 ? "s" : ""} ready for checkout`
            : "Your cart is waiting for amazing products"}
        </p>
      </MotionDiv>
    </>
  );
}

export default CartHeader;
