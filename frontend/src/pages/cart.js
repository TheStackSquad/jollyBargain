// frontend/src/pages/cart.js
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MotionDiv, containerVariants } from "../animation/cartAnimate";

// Import new components
import CartHeader from "../components/cartpage/cartUI/cartHeader";
import CartContent from "../components/cartpage/cartUI/cartContent";
import TrustSection from "../components/cartpage/cartUI/trustSection";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  // Navigation handlers
  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/store");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-inter text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="relative max-w-7xl mx-auto">
        {/* Header with decorative elements */}
        <CartHeader itemCount={cartItems.length} />

        {/* Main Content Container */}
        <div className="bg-white/70 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
          <MotionDiv
            className="p-6 sm:p-8 lg:p-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <CartContent
              cartItems={cartItems}
              onCheckout={handleCheckout}
              onContinueShopping={handleContinueShopping}
            />
          </MotionDiv>
        </div>

        {/* Bottom Trust Section */}
        <TrustSection />
      </div>
    </div>
  );
}

export default CartPage;
