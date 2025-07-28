// frontend/ src/ components/ orderPortal/ orderReiewActions.js
import React from "react";
import { Loader2 } from "lucide-react";
import {
  MotionButton,
  buttonTapVariants,
} from "../../../animation/cartAnimate"; // Assuming this path is correct

function OrderReviewActions({
  onPrevStep,
  onPlaceOrder,
  isProcessing,
  cartItemCount,
  isShippingInfoComplete,
  isPaymentInfoComplete,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
      <MotionButton
        type="button"
        variants={buttonTapVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onPrevStep}
        disabled={isProcessing} // Disable if processing
        className="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-700
        font-medium rounded-2xl shadow-md hover:bg-gray-200 focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-200
        ease-in-out border border-gray-200"
      >
        <svg
          className="w-5 h-5 mr-2 inline"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Payment
      </MotionButton>
      <MotionButton
        type="submit"
        variants={buttonTapVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onPlaceOrder}
        disabled={
          isProcessing ||
          cartItemCount === 0 ||
          !isShippingInfoComplete ||
          !isPaymentInfoComplete
        } // Disable if processing, cart empty, or info incomplete
        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600
        text-white font-bold rounded-2xl shadow-lg hover:from-green-700 hover:to-emerald-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
        transition duration-200 ease-in-out transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:from-green-600 disabled:hover:to-emerald-600"
      >
        {isProcessing ? (
          <Loader2 className="animate-spin w-5 h-5 mr-2 inline" /> // Loader icon
        ) : (
          <svg
            className="w-5 h-5 ml-2 inline"
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
        )}
        {isProcessing ? "Placing Order..." : "Place Order"}
      </MotionButton>
    </div>
  );
}

export default OrderReviewActions;
