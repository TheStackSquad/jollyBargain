// frontend/ src/ components/ orderPortal/ shippingInfoCard.js
import React from "react";
import { Edit, Package } from "lucide-react";
import {
  MotionButton,
  buttonTapVariants,
} from "../../../animation/cartAnimate";

function ShippingInfoCard({
  shippingInfo,
  isShippingInfoComplete,
  onEditShipping,
}) {
  // Provide default empty object for info
  const currentShippingInfo = shippingInfo || {};
  // console.log("whats the shipping info:", currentShippingInfo);
  return (
    <div
      className={`bg-gradient-to-br p-6 rounded-2xl border shadow-sm ${
        isShippingInfoComplete
          ? "from-blue-50 to-indigo-50 border-blue-100"
          : "from-red-50 to-orange-50 border-red-100" // Highlight if incomplete
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              isShippingInfoComplete ? "bg-blue-500" : "bg-red-500"
            }`}
          >
            <Package className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Shipping Address
          </h3>
        </div>
        {onEditShipping && ( // Only show edit button if onEditShipping is provided
          <MotionButton
            type="button"
            variants={buttonTapVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onEditShipping}
            className="p-2 rounded-full text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Edit shipping address"
          >
            <Edit className="w-5 h-5" />
          </MotionButton>
        )}
      </div>
      <div className="space-y-1 text-gray-700">
        {isShippingInfoComplete ? (
          <>
            <p className="font-medium text-gray-900">
              {currentShippingInfo.fullName}
            </p>
            <p className="text-sm">{currentShippingInfo.addressLine1}</p>
            {currentShippingInfo.addressLine2 && (
              <p className="text-sm">{currentShippingInfo.addressLine2}</p>
            )}
            <p className="text-sm">
              {currentShippingInfo.city}, {currentShippingInfo.state}{" "}
              {currentShippingInfo.zipCode}
            </p>
            <p className="text-sm font-medium">{currentShippingInfo.country}</p>
          </>
        ) : (
          <p className="text-red-600 font-medium">
            Shipping information is incomplete. Please go back to fill it in.
          </p>
        )}
      </div>
    </div>
  );
}

export default ShippingInfoCard;
