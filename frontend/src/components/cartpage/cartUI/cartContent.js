// frontend/src/components/cartpage/cartUI/cartContent.js
import React from "react";
import { AnimatePresence } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { MotionDiv, headerVariants } from "../../../animation/cartAnimate";

import CartItemsList from "./cartItemsList";
import EmptyCartMessage from "../emptyCartMessage";

function CartContent({
  cartItems,
  handleQuantityChange,
  handleRemoveItem,
  handleSaveForLater,
  handleContinueShopping,
  // Remove the 'sidebar' prop from here
}) {
  if (cartItems.length === 0) {
    return <EmptyCartMessage onStartShopping={handleContinueShopping} />;
  }

  return (
    // Remove the internal grid. This component will now just fill the space given to it by its parent (CartPage).
    <div>
      <MotionDiv
        variants={headerVariants}
        className="flex items-center justify-between mb-6 pb-4 border-b
                   border-gradient-to-r from-indigo-200 to-purple-200"
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
  );
}

export default CartContent;
