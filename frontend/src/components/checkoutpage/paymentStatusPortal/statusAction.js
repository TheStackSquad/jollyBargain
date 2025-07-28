// frontend/component/paymentStatusPortal/statusAction.js
import React from "react";
import {
  MotionButton,
  buttonTapVariants,
} from "../../../animation/cartAnimate";

function StatusAction({ orderId }) {
  return (
    <div className="mt-6 flex justify-center gap-4">
      <MotionButton
        variants={buttonTapVariants}
        whileTap="tap"
        onClick={() => {
          window.location.href = "/store";
        }}
        className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded"
      >
        Back to Store
      </MotionButton>
      <MotionButton
        variants={buttonTapVariants}
        whileTap="tap"
        onClick={() => {
          window.location.href = `/orders/${orderId}`;
        }}
        className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
      >
        View Order
      </MotionButton>
    </div>
  );
}

export default StatusAction;
