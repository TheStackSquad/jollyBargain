// frontend/src/components/cartpage/cartUI/cartSidebar.js
import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import { MotionDiv } from "../../../animation/cartAnimate";
import { useCartCalculations } from "../../../utils/hooks/useCartCalculations";
import { useCouponLogic } from "../../../utils/hooks/useCouponLogic";
import { useShippingEstimation } from "../../../utils/hooks/useShippingEstimation";
import CartSummary from "../cartSummary"; // This is the presentational component

// Changed to a function declaration for ESLint rule: react/function-component-definition
function CartSidebar({ cartItems, onCheckout, onContinueShopping }) {
  // Local state for coupon and shipping messages
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState({ type: "", text: "" });
  const [shippingZipCode, setShippingZipCode] = useState("");
  const [shippingMessage, setShippingMessage] = useState({
    type: "",
    text: "",
  });

  // State for the actual calculated values that affect totals
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0); // This will be updated by coupon logic

  // 1. Calculate base totals including subtotal, VAT, and grand total.
  // This hook should return the vatRate if it's a constant used internally.
  const { subtotal, totalVat, grandTotal, vatRate } = useCartCalculations(
    cartItems,
    shippingCost,
    discountAmount,
  );

  // 2. Use shipping estimation hook.
  // The estimateShipping function returned by this hook will update shippingCost and shippingMessage.
  const { estimateShipping } = useShippingEstimation(
    setShippingCost,
    setShippingMessage,
  );

  // 3. Use coupon logic hook.
  // The applyCoupon function returned by this hook will update discountAmount and potentially shippingCost.
  const { applyCoupon } = useCouponLogic(
    subtotal, // Pass the dynamically calculated subtotal to the coupon logic
    setDiscountAmount,
    setShippingCost, // Pass setShippingCost for free shipping coupons
    setCouponMessage,
  );

  // Handlers to pass to CartSummary
  // These wrap the functions from the custom hooks, passing the current state values.
  const handleApplyCoupon = () => {
    applyCoupon(couponCode); // Call the applyCoupon function from the hook with current couponCode
  };

  const handleEstimateShipping = () => {
    estimateShipping(shippingZipCode); // Call the estimateShipping function from the hook with current shippingZipCode
  };

  return (
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
            <h3 className="text-xl font-bold text-white">Order Summary</h3>
          </div>
          <div className="text-right">
            <p className="text-indigo-100 text-sm">Total Items</p>
            <p className="text-white font-bold text-lg">{cartItems.length}</p>
          </div>
        </div>
      </div>

      {/* Summary Content */}
      <div className="bg-white/80 backdrop-blur-sm rounded-b-2xl border border-t-0 border-white/30">
        <CartSummary
          subtotal={subtotal}
          shippingCost={shippingCost}
          totalVat={totalVat}
          grandTotal={grandTotal}
          vatRate={vatRate} // Use the vatRate from the useCartCalculations hook
          discountAmount={discountAmount} // Use the discountAmount state
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          couponMessage={couponMessage}
          shippingZipCode={shippingZipCode}
          setShippingZipCode={setShippingZipCode}
          shippingMessage={shippingMessage}
          handleApplyCoupon={handleApplyCoupon} // Pass the wrapper handler
          handleEstimateShipping={handleEstimateShipping} // Pass the wrapper handler
          handleCheckout={onCheckout}
          onContinueShopping={onContinueShopping}
        />
      </div>
    </MotionDiv>
  );
}

export default CartSidebar;
