// frontend/src/pages/cart.js
import React, { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Ensure useNavigate is imported
import { ShoppingCart, Sparkles, Star, TrendingUp } from "lucide-react";
import {
  updateItemQuantity,
  removeItemFromCart,
  // clearCart, // Keep clearCart if you want to use it after checkout
} from "../reduxStore/cart/cartSlice";

import {
  containerVariants,
  headerVariants,
  MotionDiv,
} from "../animation/cartAnimate";

// Subcomponents
import CartItem from "../components/cartpage/cartItem";
import CartSummary from "../components/cartpage/cartSummary";
import EmptyCartMessage from "../components/cartpage/emptyCartMessage";

// Lucide React Icons

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // State for coupon and shipping
  const [couponCode, setCouponCode] = React.useState("");
  const [couponMessage, setCouponMessage] = React.useState({
    type: "",
    text: "",
  });
  const [shippingZipCode, setShippingZipCode] = React.useState("");
  const [shippingCost, setShippingCost] = React.useState(0);
  const [shippingMessage, setShippingMessage] = React.useState({
    type: "",
    text: "",
  });
  //  eslint-disable-no-unused-vars
  // const [vatRate, setVatRate] = React.useState(0.075);
  const vatRate = 0.075;
  const [discountAmount, setDiscountAmount] = React.useState(0); // New state for applied discount

  // console.log(setVatRate);

  // --- FIX STARTS HERE ---
  // Memoize availableCoupons so it doesn't change on every render
  const availableCoupons = useMemo(
    () => ({
      SAVE10: { type: "percentage", value: 0.1, minSubtotal: 5000 }, // 10% off for orders over $5000
      FREESHIP: { type: "shipping", value: 0, minSubtotal: 10000 }, // Free shipping for orders over $10000
      FIXED2000: { type: "fixed", value: 2000, minSubtotal: 8000 }, // $2000 off for orders over $8000
    }),
    [],
  ); // Empty dependency array means this object is created only once
  // --- FIX ENDS HERE ---

  // Calculate cart totals - now depends on Redux cartItems and discount
  const { subtotal, totalVat, grandTotal } = useMemo(() => {
    const calculatedSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    let currentDiscountAmount = discountAmount; // Start with the currently applied discount

    // Re-evaluate discount if cart items change, to ensure it's still valid
    // This is a simplified re-evaluation; a real system might clear invalid coupons
    if (couponCode && availableCoupons[couponCode.toUpperCase()]) {
      const coupon = availableCoupons[couponCode.toUpperCase()];
      if (calculatedSubtotal < coupon.minSubtotal) {
        currentDiscountAmount = 0; // Invalidate discount if min subtotal not met
      }
    } else {
      currentDiscountAmount = 0; // No coupon or invalid coupon
    }

    const subtotalAfterDiscount = calculatedSubtotal - currentDiscountAmount;
    const calculatedVat = subtotalAfterDiscount * vatRate; // VAT applied after discount
    const calculatedGrandTotal =
      subtotalAfterDiscount + calculatedVat + shippingCost;

    return {
      subtotal: calculatedSubtotal,
      totalVat: calculatedVat,
      grandTotal: calculatedGrandTotal,
      discountAmount: currentDiscountAmount, // Return the re-evaluated discount
    };
  }, [
    cartItems,
    shippingCost,
    vatRate,
    discountAmount,
    couponCode,
    availableCoupons,
  ]); // availableCoupons is now a stable reference

  // Handle quantity change - dispatch Redux action
  const handleQuantityChange = (id, delta) => {
    dispatch(updateItemQuantity({ id, delta }));
  };

  // Handle item removal - dispatch Redux action
  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  // Handle save for later (simulated) - for now, just removes from cart and shows message
  const handleSaveForLater = (id) => {
    dispatch(removeItemFromCart(id)); // Remove from cart
    // console.log(
    //   `Item ${id} removed from cart and simulated as saved for later.`,
    // );
    setCouponMessage({
      type: "success",
      text: "Item moved to saved for later!",
    });
    setTimeout(() => setCouponMessage({ type: "", text: "" }), 3000);
  };

  // Apply coupon code logic
  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    const coupon = availableCoupons[code];

    if (!code) {
      setCouponMessage({ type: "error", text: "Please enter a coupon code." });
      setDiscountAmount(0); // Clear any previous discount
      return;
    }

    if (coupon) {
      if (subtotal < coupon.minSubtotal) {
        setCouponMessage({
          type: "error",
          text: `Coupon requires a subtotal of $${coupon.minSubtotal.toFixed(2)}.`,
        });
        setDiscountAmount(0);
        return;
      }

      let newDiscount = 0;
      if (coupon.type === "percentage") {
        newDiscount = subtotal * coupon.value;
        setCouponMessage({
          type: "success",
          text: `Coupon "${code}" applied! ${coupon.value * 100}% off.`,
        });
      } else if (coupon.type === "fixed") {
        newDiscount = coupon.value;
        setCouponMessage({
          type: "success",
          text: `Coupon "${code}" applied! $${coupon.value.toFixed(2)} off.`,
        });
      } else if (coupon.type === "shipping") {
        setShippingCost(0); // Set shipping to 0 for free shipping
        setShippingMessage({ type: "success", text: "Free shipping applied!" });
        setCouponMessage({
          type: "success",
          text: `Coupon "${code}" applied! Free shipping.`,
        });
      }
      setDiscountAmount(newDiscount); // Set the discount amount
    } else {
      setCouponMessage({ type: "error", text: "Invalid coupon code." });
      setDiscountAmount(0); // Clear any previous discount
    }
    setTimeout(() => setCouponMessage({ type: "", text: "" }), 3000);
  };

  // Estimate shipping cost (simulated logic)
  const handleEstimateShipping = () => {
    if (shippingZipCode.trim() === "90210") {
      setShippingCost(15.0);
      setShippingMessage({
        type: "success",
        text: "Shipping estimated for 90210.",
      });
    } else if (shippingZipCode.trim() === "") {
      setShippingMessage({ type: "error", text: "Please enter a zip code." });
      setShippingCost(0);
    } else {
      setShippingCost(10.0); // Default shipping for other zips
      setShippingMessage({
        type: "info",
        text: "Shipping estimated. (Default rate applied)",
      });
    }
    setTimeout(() => setShippingMessage({ type: "", text: "" }), 3000);
  };

  // Handle checkout (smooth redirect)
  const handleCheckout = () => {
    // console.log("Proceeding to checkout!");
    navigate("/checkout"); // Use navigate for smooth redirection
  };

  // Handle continue shopping (smooth redirect)
  const handleContinueShopping = () => {
    navigate("/store"); // Use navigate for smooth redirection
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-inter
    text-gray-800 p-4 sm:p-6 lg:p-8"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full
        opacity-20 animate-pulse"
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-indigo-200 rounded-full
        opacity-20 animate-pulse delay-1000"
        />
        <div
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-200 rounded-full
        opacity-20 animate-pulse delay-2000"
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <MotionDiv
          className="text-center mb-8 sm:mb-12"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            className="inline-flex items-center justify-center w-20 h-20
          bg-gradient-to-br from-indigo-600 to-purple-600
          rounded-full shadow-lg mb-6"
          >
            <ShoppingCart className="w-10 h-10 text-white" />
          </div>
          <h1
            className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600
          bg-clip-text text-transparent mb-4"
          >
            Your Shopping Cart
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            {cartItems.length > 0
              ? `${cartItems.length} item${cartItems.length > 1 ? "s" : ""} ready for checkout`
              : "Your cart is waiting for amazing products"}
          </p>
        </MotionDiv>

        {/* Main Content */}
        <div className="bg-white/70 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
          <MotionDiv
            className="p-6 sm:p-8 lg:p-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cartItems.length === 0 ? (
              <EmptyCartMessage
                onStartShopping={handleContinueShopping}
                // Removed onShowMessageBox to prevent alert()
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2">
                  {/* Section Header */}
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
                      <span className="text-sm text-gray-600">
                        Premium Selection
                      </span>
                    </div>
                  </MotionDiv>

                  {/* Cart Items */}
                  <div className="space-y-4">
                    <AnimatePresence>
                      {cartItems.map((item, index) => (
                        <MotionDiv
                          key={item._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30
                          overflow-hidden"
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

                  {/* Trust Indicators */}
                  <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border
                    border-green-200"
                  >
                    <div className="flex items-center justify-center space-x-8">
                      <div className="flex items-center">
                        <div
                          className="w-8 h-8 bg-green-500 rounded-full flex items-center
                        justify-center mr-2"
                        >
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
                        </div>
                        <span className="text-sm font-medium text-green-800">
                          Secure Checkout
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
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
                        </div>
                        <span className="text-sm font-medium text-blue-800">
                          Fast Delivery
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-2">
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
                        </div>
                        <span className="text-sm font-medium text-purple-800">
                          Quality Guaranteed
                        </span>
                      </div>
                    </div>
                  </MotionDiv>
                </div>

                {/* Cart Summary and Actions */}
                <div className="lg:col-span-1">
                  <MotionDiv
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="sticky top-6"
                  >
                    {/* Summary Header */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-t-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <TrendingUp className="w-6 h-6 text-white mr-2" />
                          <h3 className="text-xl font-bold text-white">
                            Order Summary
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-indigo-100 text-sm">Total Items</p>
                          <p className="text-white font-bold text-lg">
                            {cartItems.length}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Summary Content */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-b-2xl border border-t-0 border-white/30">
                      <CartSummary
                        subtotal={subtotal}
                        shippingCost={shippingCost}
                        totalVat={totalVat} // Changed to totalVat
                        grandTotal={grandTotal}
                        vatRate={vatRate} // Changed to vatRate
                        discountAmount={discountAmount} // Pass discount amount
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        couponMessage={couponMessage}
                        shippingZipCode={shippingZipCode}
                        setShippingZipCode={setShippingZipCode}
                        shippingMessage={shippingMessage}
                        handleApplyCoupon={handleApplyCoupon}
                        handleEstimateShipping={handleEstimateShipping}
                        handleCheckout={handleCheckout} // Pass the function down
                        onContinueShopping={handleContinueShopping} // Pass the function down
                      />
                    </div>
                  </MotionDiv>
                </div>
              </div>
            )}
          </MotionDiv>
        </div>

        {/* Bottom Trust Section */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <div
            className="inline-flex items-center space-x-6 bg-white/50 backdrop-blur-sm
          rounded-full px-6 py-3 shadow-lg"
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618
                  3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622
                  0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="text-sm text-gray-700">SSL Secured</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-blue-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402
                  2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              <span className="text-sm text-gray-700">
                Money Back Guarantee
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-purple-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11
                  14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <span className="text-sm text-gray-700">24/7 Support</span>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}

export default CartPage;
