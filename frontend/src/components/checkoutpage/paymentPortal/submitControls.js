// frontend/src/components/checkoutpage/paymentPortal/submitControls.js
import React from "react";
import {
  MotionButton,
  buttonTapVariants,
} from "../../../animation/cartAnimate";

function SubmitControls({ isLoading, onPrevStep }) {
  return (
    <div className="flex justify-between pt-6">
      <MotionButton
        type="button"
        variants={buttonTapVariants}
        whileTap="tap"
        onClick={onPrevStep}
        className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
      >
        Back to Shipping
      </MotionButton>
      <MotionButton
        type="submit"
        variants={buttonTapVariants}
        whileTap="tap"
        disabled={isLoading}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Continue to Review"}
      </MotionButton>
    </div>
  );
}

export default SubmitControls;
