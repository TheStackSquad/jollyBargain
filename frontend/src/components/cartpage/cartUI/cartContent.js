// frontend/src/components/cartpage/cartUI/cartContent.js
import React from "react";
import { AnimatePresence } from "framer-motion"; // Needed for exit animations
import { Sparkles, Star } from "lucide-react"; // Needed for icons in header
import { MotionDiv, headerVariants } from "../../../animation/cartAnimate"; // Import MotionDiv and headerVariants

import CartItemsList from "./cartItemsList"; // Corrected path and added .js
// import CartSidebar from "./cartSidebar.js"; // Corrected comment spacing and added .js
import EmptyCartMessage from "../emptyCartMessage";

// Changed to a function declaration for ESLint rule: react/function-component-definition
function CartContent({
  cartItems,
  handleQuantityChange,
  handleRemoveItem,
  handleSaveForLater,
  handleContinueShopping, // Passed down from CartPage
  // subtotal, // These props are now handled by CartSidebar directly, passed via children
  // shippingCost,
  // totalVat,
  // grandTotal,
  // vatRate,
  // discountAmount,
  // couponCode,
  // setCouponCode,
  // couponMessage,
  // shippingZipCode,
  // setShippingZipCode,
  // shippingMessage,
  // handleApplyCoupon,
  // handleEstimateShipping,
  // handleCheckout,
  children, // To render CartSidebar as a child
}) {
  // Show empty cart message if no items
  if (cartItems.length === 0) {
    return <EmptyCartMessage onStartShopping={handleContinueShopping} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items List - Takes up 2/3 of the space on desktop */}
      <div className="lg:col-span-2">
        {/* Section Header for Cart Items List */}
        <MotionDiv
          variants={headerVariants}
          className="flex items-center justify-between mb-6 pb-4 border-b
          border-gradient-to-r from-indigo-200 to-purple-200"
        >
          <div className="flex items-center">
            <div
              className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500
            rounded-full flex items-center justify-center mr-4"
            >
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

        {/* Actual Cart Items */}
        <div className="space-y-4">
          <AnimatePresence>
            <CartItemsList
              cartItems={cartItems}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              onSaveForLater={handleSaveForLater}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Cart Sidebar - Takes up 1/3 of the space on desktop */}
      <div className="lg:col-span-1">
        {/* Render children, which is expected to be CartSidebar from CartPage */}
        {children}
      </div>
    </div>
  );
}

export default CartContent;
