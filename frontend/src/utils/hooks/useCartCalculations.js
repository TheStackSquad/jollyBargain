// frontend/src/components/utils/hooks/useCartCalculations.js
import { useMemo } from "react";
import {
  VAT_RATE,
  AVAILABLE_COUPONS,
} from "../../components/common/cartConstants";

export const useCartCalculations = (
  cartItems,
  shippingCost,
  discountAmount,
  couponCode,
) => {
  const calculations = useMemo(() => {
    // Calculate subtotal from cart items
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Re-evaluate discount validity when cart changes
    let validDiscountAmount = discountAmount;
    if (couponCode && AVAILABLE_COUPONS[couponCode.toUpperCase()]) {
      const coupon = AVAILABLE_COUPONS[couponCode.toUpperCase()];
      if (subtotal < coupon.minSubtotal) {
        validDiscountAmount = 0; // Invalidate discount if min subtotal not met
      }
    } else {
      validDiscountAmount = 0; // No coupon or invalid coupon
    }

    // Calculate totals
    const subtotalAfterDiscount = subtotal - validDiscountAmount;
    const totalVat = subtotalAfterDiscount * VAT_RATE;
    const grandTotal = subtotalAfterDiscount + totalVat + shippingCost;

    return {
      subtotal,
      subtotalAfterDiscount,
      totalVat,
      grandTotal,
      validDiscountAmount,
      isDiscountValid: validDiscountAmount > 0,
    };
  }, [cartItems, shippingCost, discountAmount, couponCode]);

  return calculations;
};
