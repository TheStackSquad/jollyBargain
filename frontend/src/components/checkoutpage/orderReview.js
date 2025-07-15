// frontend/src/components/checkoutpage/OrderReview.js
import React from "react";
import { useSelector } from "react-redux";
import {
  MotionDiv,
  MotionButton,
  buttonTapVariants,
} from "../../animation/cartAnimate";

function OrderReview({ shippingInfo, paymentInfo, onPlaceOrder, onPrevStep }) {
  // Fetch cart data directly from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  // const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  // const totalAmount = useSelector((state) => state.cart.totalAmount);

  const vatRate = 0.075;
  const shippingCost = useSelector((state) => state.cart.shippingCost || 0);

  const discountAmount = useSelector((state) => state.cart.discountAmount || 0);

  // Calculate totals based on cartItems
  const calculatedSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const subtotalAfterDiscount = calculatedSubtotal - discountAmount;
  const calculatedVat = subtotalAfterDiscount * vatRate;
  const calculatedGrandTotal =
    subtotalAfterDiscount + calculatedVat + shippingCost;

  // Provide default empty objects for shippingInfo and paymentInfo if they are undefined
  const currentShippingInfo = shippingInfo || {};
  const currentPaymentInfo = paymentInfo || {};

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
        {/* Order Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Shipping Information Card */}
          <div
            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl
          border border-blue-100 shadow-sm"
          >
            <div className="flex items-center mb-4">
              <div
                className="w-10 h-10 bg-blue-500 rounded-full flex items-center
              justify-center mr-3"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827
                    0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Shipping Address
              </h3>
            </div>
            <div className="space-y-1 text-gray-700">
              <p className="font-medium text-gray-900">
                {currentShippingInfo.fullName || "Placeholder Name"}
              </p>
              <p className="text-sm">
                {currentShippingInfo.addressLine1 || "123 Placeholder St"}
              </p>
              {currentShippingInfo.addressLine2 && (
                <p className="text-sm">{currentShippingInfo.addressLine2}</p>
              )}
              <p className="text-sm">
                {currentShippingInfo.city || "Anytown"},{" "}
                {currentShippingInfo.state || "AS"}{" "}
                {currentShippingInfo.zipCode || "00000"}
              </p>
              <p className="text-sm font-medium">
                {currentShippingInfo.country || "USA"}
              </p>
            </div>
          </div>

          {/* Payment Information Card */}
          <div
            className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl
          border border-green-100 shadow-sm"
          >
            <div className="flex items-center mb-4">
              <div
                className="w-10 h-10 bg-green-500 rounded-full flex items-center
              justify-center mr-3"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3
                    3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Payment Method
              </h3>
            </div>
            <div className="space-y-1 text-gray-700">
              <p className="font-medium text-gray-900">
                {currentPaymentInfo.cardName || "Placeholder Cardholder"}
              </p>
              <p className="text-sm font-mono">
                **** **** ****{" "}
                {currentPaymentInfo.cardNumber
                  ? currentPaymentInfo.cardNumber.slice(-4)
                  : "0000"}
              </p>
              <p className="text-sm">
                Expires: {currentPaymentInfo.expiryDate || "MM/YY"}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div
              className="w-10 h-10 bg-purple-500 rounded-full flex
            items-center justify-center mr-3"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Order Items</h3>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <MotionDiv
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center bg-white p-4 rounded-xl
                  shadow-sm border border-gray-100"
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3" />
                    <div>
                      <span className="font-medium text-gray-900">
                        {item.title}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        x{item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ₦{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                  </span>
                </MotionDiv>
              ))
            ) : (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 bg-gray-200 rounded-full flex
                items-center justify-center mx-auto mb-4"
                >
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600">
                  No items in cart. Please add items to proceed.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Totals */}
        <div
          className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6
        rounded-2xl border border-indigo-100 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-gray-700">
              <span>Subtotal:</span>
              <span className="font-semibold">
                ₦{calculatedSubtotal.toFixed(2)}
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
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
                  Discount:
                </span>
                <span className="font-semibold">
                  -₦{discountAmount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center text-gray-700">
              <span>Shipping:</span>
              <span className="font-semibold">₦{shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span>VAT:</span>
              <span className="font-semibold">₦{calculatedVat.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 pt-3 mt-3">
              <div className="flex justify-between items-center text-xl font-bold text-indigo-700">
                <span>Order Total:</span>
                <span className="text-2xl">
                  ₦{calculatedGrandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <MotionButton
            type="button"
            variants={buttonTapVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onPrevStep}
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
            type="button"
            variants={buttonTapVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onPlaceOrder}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600
            text-white font-bold rounded-2xl shadow-lg hover:from-green-700 hover:to-emerald-700
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
            transition duration-200 ease-in-out transform hover:scale-105"
          >
            Place Order
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
          </MotionButton>
        </div>
      </div>
    </MotionDiv>
  );
}

export default OrderReview;
