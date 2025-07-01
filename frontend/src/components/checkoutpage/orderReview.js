import React from 'react';
import { MotionDiv, MotionButton, buttonTapVariants } from '../../animation/cartAnimate';

const OrderReview = ({
  cartItems,
  shippingInfo,
  paymentInfo,
  subtotal,
  shippingCost,
  totalTax,
  grandTotal,
  onPlaceOrder,
  onPrevStep,
}) => {
  // Provide default empty objects for shippingInfo and paymentInfo if they are undefined
  // This prevents "Cannot read properties of undefined" errors
  const currentShippingInfo = shippingInfo || {};
  const currentPaymentInfo = paymentInfo || {};
  
  // Provide default values for numeric props to prevent toFixed() errors
  const currentSubtotal = subtotal || 0;
  const currentShippingCost = shippingCost || 0;
  const currentTotalTax = totalTax || 0;
  const currentGrandTotal = grandTotal || 0;

  return (
    <MotionDiv
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        Review Your Order
      </h2>

      {/* Shipping Information */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Shipping Address</h3>
        <p className="text-gray-600">
          {currentShippingInfo.fullName || 'Placeholder Name'}
        </p>
        <p className="text-gray-600">
          {currentShippingInfo.addressLine1 || '123 Placeholder St'}
        </p>
        {currentShippingInfo.addressLine2 && <p className="text-gray-600">{currentShippingInfo.addressLine2}</p>}
        <p className="text-gray-600">
          {currentShippingInfo.city || 'Anytown'}, {currentShippingInfo.state || 'AS'} {currentShippingInfo.zipCode || '00000'}
        </p>
        <p className="text-gray-600">
          {currentShippingInfo.country || 'USA'}
        </p>
      </div>

      {/* Payment Information */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Payment Method</h3>
        <p className="text-gray-600">
          Card Holder: {currentPaymentInfo.cardName || 'Placeholder Cardholder'}
        </p>
        <p className="text-gray-600">
          Card Number: **** **** **** {currentPaymentInfo.cardNumber ? currentPaymentInfo.cardNumber.slice(-4) : '0000'}
        </p>
        <p className="text-gray-600">
          Expires: {currentPaymentInfo.expiryDate || 'MM/YY'}
        </p>
      </div>

      {/* Order Items */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Order Items</h3>
        <div className="space-y-3">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-gray-700">
                <span className="font-medium">{item.name} (x{item.quantity})</span>
                <span>${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No items in cart. (Placeholder)</p>
          )}
        </div>
      </div>

      {/* Order Totals */}
      <div className="space-y-3 mb-8 text-lg border-t border-gray-200 pt-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-semibold">${currentSubtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span className="font-semibold">${currentShippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span className="font-semibold">${currentTotalTax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-300 pt-3 flex justify-between text-xl font-bold text-indigo-700">
          <span>Order Total:</span>
          <span>${currentGrandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <MotionButton
          type="button"
          variants={buttonTapVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onPrevStep}
          className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 ease-in-out"
        >
          Back to Payment
        </MotionButton>
        <MotionButton
          type="button"
          variants={buttonTapVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onPlaceOrder}
          className="px-6 py-3 bg-green-600 text-white font-bold rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
        >
          Place Order
        </MotionButton>
      </div>
    </MotionDiv>
  );
};

export default OrderReview;