// frontend/ src/ components/ orderPortal/ orderReview.js

import React from "react";
import { useSelector } from "react-redux";
import { MotionDiv } from "../../../animation/cartAnimate";

// Import the new sub-components
import ShippingInfoCard from "./shippingInfoCard";
import PaymentInfoCard from "./paymentInfoCard";
import OrderItemsList from "./orderItemList";
import OrderSummary from "./orderSummary";
import OrderReviewActions from "./orderReviewActions";

function OrderReview({
  shippingInfo,
  paymentInfo,
  onPlaceOrder,
  onPrevStep,
  onEditShipping,
  onEditPayment,
  isProcessing = false,
}) {
  // Console logs for all props (for debugging as requested)
  // console.log("OrderReview (Refactored) Props:");
  // console.log("  shippingInfo:", shippingInfo);
  // console.log("  paymentInfo:", paymentInfo);
  // console.log("  onPlaceOrder:", onPlaceOrder);
  // console.log("  onPrevStep:", onPrevStep);
  // console.log("  onEditShipping:", onEditShipping);
  // console.log("  onEditPayment:", onEditPayment);
  // console.log("  isProcessing:", isProcessing);

  // Fetch cart data directly from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const vatRate = 0.075; // 7.5% VAT rate
  const shippingCost = useSelector((state) => state.cart.shippingCost || 0);
  const discountAmount = useSelector((state) => state.cart.discountAmount || 0);

  // Calculate totals based on cartItems
  const calculatedSubtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0,
  );
  const subtotalAfterDiscount = calculatedSubtotal - discountAmount;
  const calculatedVat = subtotalAfterDiscount * vatRate;
  const calculatedGrandTotal =
    subtotalAfterDiscount + calculatedVat + shippingCost;

  // Provide default empty objects for info, and check for validity
  const currentShippingInfo = shippingInfo || {};
  const isShippingInfoComplete =
    !!currentShippingInfo.fullName &&
    !!currentShippingInfo.addressLine1 &&
    !!currentShippingInfo.city &&
    !!currentShippingInfo.state &&
    !!currentShippingInfo.zipCode &&
    !!currentShippingInfo.country;

  const currentPaymentInfo = paymentInfo || {};
  const isPaymentInfoComplete =
    !!currentPaymentInfo.cardName &&
    !!currentPaymentInfo.cardNumber &&
    !!currentPaymentInfo.expiryDate &&
    !!currentPaymentInfo.cvc;

  // Console logs for completeness status (as requested)
  // console.log(
  //   "OrderReview (Refactored): isShippingInfoComplete:",
  //   isShippingInfoComplete,
  // );
  // console.log(
  //   "OrderReview (Refactored): isPaymentInfoComplete:",
  //   isPaymentInfoComplete,
  // );

  // Helper for currency formatting - defined here as it's used by multiple sub-components
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <MotionDiv
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Review Your Order
        </h2>
        <p className="text-indigo-100 text-sm">
          Please review your order details before placing your order
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* Shipping and Payment Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ShippingInfoCard
            shippingInfo={currentShippingInfo}
            isShippingInfoComplete={isShippingInfoComplete}
            onEditShipping={onEditShipping}
          />
          <PaymentInfoCard
            paymentInfo={currentPaymentInfo}
            isPaymentInfoComplete={isPaymentInfoComplete}
            onEditPayment={onEditPayment}
          />
        </div>

        {/* Order Items List */}
        <OrderItemsList cartItems={cartItems} formatCurrency={formatCurrency} />

        {/* Order Totals Summary */}
        <OrderSummary
          calculatedSubtotal={calculatedSubtotal}
          discountAmount={discountAmount}
          shippingCost={shippingCost}
          calculatedVat={calculatedVat}
          calculatedGrandTotal={calculatedGrandTotal}
          vatRate={vatRate}
          formatCurrency={formatCurrency}
        />

        {/* Action Buttons */}
        <OrderReviewActions
          onPrevStep={onPrevStep}
          onPlaceOrder={onPlaceOrder}
          isProcessing={isProcessing}
          cartItemCount={cartItems.length}
          isShippingInfoComplete={isShippingInfoComplete}
          isPaymentInfoComplete={isPaymentInfoComplete}
        />
      </div>
    </MotionDiv>
  );
}

export default OrderReview;
