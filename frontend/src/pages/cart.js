// frontend/src/pages/cart.js
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MotionDiv, containerVariants } from "../animation/cartAnimate";

// Import new components
import CartHeader from "../components/cartpage/cartUI/cartHeader";
import CartContent from "../components/cartpage/cartUI/cartContent";
import CartSidebar from "../components/cartpage/cartUI/cartSidebar";
import TrustSection from "../components/cartpage/cartUI/trustSection";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const handleCheckout = () => navigate("/checkout");
  const handleContinueShopping = () => navigate("/store");

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-inter text-gray-800">
      <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12 xl:px-16 xl:py-16">
        <div className="relative mx-auto w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
          <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16">
            <CartHeader itemCount={cartItems.length} />
          </div>

          <div className="relative bg-blue/20 backdrop-blur-md shadow-2xl rounded-2xl sm:rounded-3xl lg:rounded-[2rem] xl:rounded-[2.5rem] border border-white/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-purple-100/10 pointer-events-none" />

            <MotionDiv
              className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-gray-100"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Desktop layout (lg and up) */}
              <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">
                <div className="lg:col-span-8 xl:col-span-7">
                  <CartContent
                    cartItems={cartItems}
                    onCheckout={handleCheckout}
                    onContinueShopping={handleContinueShopping}
                  />
                </div>

                <div className="lg:col-span-4 xl:col-span-5 sticky top-6">
                  <CartSidebar
                    cartItems={cartItems}
                    onCheckout={handleCheckout}
                    onContinueShopping={handleContinueShopping}
                  />
                </div>
              </div>

              {/* Mobile/tablet layout */}
              <div className="lg:hidden space-y-6 sm:space-y-8 md:space-y-10">
                <div className="w-full">
                  <CartContent
                    cartItems={cartItems}
                    onCheckout={handleCheckout}
                    onContinueShopping={handleContinueShopping}
                  />
                </div>
                <div className="w-full">
                  <CartSidebar
                    cartItems={cartItems}
                    onCheckout={handleCheckout}
                    onContinueShopping={handleContinueShopping}
                  />
                </div>
              </div>
            </MotionDiv>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20">
            <TrustSection />
          </div>
        </div>
      </div>

      {/* Background visuals */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] bg-gradient-to-tr from-indigo-300/20 to-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-radial from-purple-200/10 to-transparent rounded-full blur-2xl" />
      </div>
    </div>
  );
}

export default CartPage;
