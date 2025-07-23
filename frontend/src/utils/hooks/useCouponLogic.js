// frontend/src/utils/hooks/useCouponLogic.js
import { useState, useCallback } from "react";
import {
  AVAILABLE_COUPONS,
  COUPON_MESSAGE_DURATION,
} from "../../components/common/cartConstants";

export const useCouponLogic = (
  subtotal,
  setDiscountAmount,
  setShippingCost,
  setShippingMessage,
) => {
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState({ type: "", text: "" });

  const clearCouponMessage = useCallback(() => {
    setTimeout(
      () => setCouponMessage({ type: "", text: "" }),
      COUPON_MESSAGE_DURATION,
    );
  }, []);

  const applyCoupon = useCallback(() => {
    const code = couponCode.trim().toUpperCase();
    const coupon = AVAILABLE_COUPONS[code];

    // Validate coupon code input
    if (!code) {
      setCouponMessage({ type: "error", text: "Please enter a coupon code." });
      setDiscountAmount(0);
      clearCouponMessage();
      return;
    }

    // Check if coupon exists
    if (!coupon) {
      setCouponMessage({ type: "error", text: "Invalid coupon code." });
      setDiscountAmount(0);
      clearCouponMessage();
      return;
    }

    // Check minimum subtotal requirement
    if (subtotal < coupon.minSubtotal) {
      setCouponMessage({
        type: "error",
        text: `Coupon requires a subtotal of ₦${coupon.minSubtotal.toFixed(2)}.`, // Changed $ to ₦ and removed / 100 as per previous context
      });
      setDiscountAmount(0);
      clearCouponMessage();
      return;
    }

    // Apply coupon based on type
    switch (coupon.type) {
      case "percentage": {
        const percentageDiscount = subtotal * coupon.value;
        setDiscountAmount(percentageDiscount);
        setCouponMessage({
          type: "success",
          text: `Coupon "${code}" applied! ${coupon.value * 100}% off.`,
        });
        break;
      } // End block scope

      case "fixed": {
        // Added block scope
        setDiscountAmount(coupon.value);
        setCouponMessage({
          type: "success",
          text: `Coupon "${code}" applied! ₦${coupon.value.toFixed(2)} off.`, // Changed $ to ₦ and removed / 100
        });
        break;
      } // End block scope

      case "shipping": {
        // Added block scope
        setShippingCost(0);
        setDiscountAmount(0); // Ensure discount is cleared if free shipping is applied
        setShippingMessage({ type: "success", text: "Free shipping applied!" });
        setCouponMessage({
          type: "success",
          text: `Coupon "${code}" applied! Free shipping.`,
        });
        break;
      } // End block scope

      default:
        setCouponMessage({ type: "error", text: "Invalid coupon type." });
        setDiscountAmount(0);
    }

    clearCouponMessage();
  }, [
    couponCode,
    subtotal,
    setDiscountAmount,
    setShippingCost,
    setShippingMessage,
    clearCouponMessage,
  ]);

  return {
    couponCode,
    setCouponCode,
    couponMessage,
    applyCoupon,
  };
};
