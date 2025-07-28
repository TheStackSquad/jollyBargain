// frontend/ src/ components/ orderPortal/ paymentInfoCard.js
import React from "react";
import { Edit, CreditCard } from "lucide-react";
import {
  MotionButton,
  buttonTapVariants,
} from "../../../animation/cartAnimate"; // Assuming this path is correct

function PaymentInfoCard({
  paymentInfo,
  isPaymentInfoComplete,
  onEditPayment,
}) {
  // Provide default empty object for info
  const currentPaymentInfo = paymentInfo || {};

  return (
    <div
      className={`bg-gradient-to-br p-6 rounded-2xl border shadow-sm ${
        isPaymentInfoComplete
          ? "from-green-50 to-emerald-50 border-green-100"
          : "from-red-50 to-orange-50 border-red-100" // Highlight if incomplete
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              isPaymentInfoComplete ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Payment Method
          </h3>
        </div>
        {onEditPayment && ( // Only show edit button if onEditPayment is provided
          <MotionButton
            type="button"
            variants={buttonTapVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onEditPayment}
            className="p-2 rounded-full text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Edit payment method"
          >
            <Edit className="w-5 h-5" />
          </MotionButton>
        )}
      </div>
      <div className="space-y-1 text-gray-700">
        {isPaymentInfoComplete ? (
          <>
            <p className="font-medium text-gray-900">
              {currentPaymentInfo.cardName}
            </p>
            <p className="text-sm font-mono">
              **** **** ****{" "}
              {currentPaymentInfo.cardNumber
                ? currentPaymentInfo.cardNumber.slice(-4)
                : "0000"}
            </p>
            <p className="text-sm">Expires: {currentPaymentInfo.expiryDate}</p>
          </>
        ) : (
          <p className="text-red-600 font-medium">
            Payment information is incomplete. Please go back to fill it in.
          </p>
        )}
      </div>
    </div>
  );
}

export default PaymentInfoCard;
