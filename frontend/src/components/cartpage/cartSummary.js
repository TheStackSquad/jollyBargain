import React from 'react';
import { AnimatePresence } from 'framer-motion';
// MessageBox import removed as it's no longer used
import {
  MotionDiv,
  MotionButton,
  MotionInput,
  headerVariants,
  buttonTapVariants,
  inputFocusVariants,
  messageVariants,
} from '../../animation/cartAnimate'; // Adjusted path for cartAnimate
import { ChevronRight } from 'lucide-react';

const CartSummary = ({
  subtotal,
  shippingCost,
  totalTax,
  grandTotal,
  taxRate,
  couponCode,
  setCouponCode,
  couponMessage,
  shippingZipCode,
  setShippingZipCode,
  shippingMessage,
  handleApplyCoupon,
  handleEstimateShipping,
  // onContinueShopping prop removed as it's no longer directly used for message box
}) => {

  // handleCheckout now directly redirects to the checkout page
  const handleCheckout = () => {
    // In a real application, you might want to perform final checks or send data
    // to the server before redirecting. For this example, we'll directly redirect.
    window.location.href = '/checkout';
  };

  // handleContinueShopping now directly redirects to the store page
  const handleContinueShopping = () => {
    window.location.href = '/store';
  };

  return (
    <>
      <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
        <MotionDiv variants={headerVariants} className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          Order Summary
        </MotionDiv>

        <div className="space-y-3 mb-6 text-lg">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span className="font-semibold">${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax ({taxRate * 100}%):</span>
            <span className="font-semibold">${totalTax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-300 pt-3 flex justify-between text-xl font-bold text-indigo-700">
            <span>Order Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Coupon Code Input */}
        <div className="mb-6">
          <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
            Have a coupon code?
          </label>
          <div className="flex rounded-md shadow-sm">
            <MotionInput
              type="text"
              id="coupon"
              name="coupon"
              className="flex-1 block w-full rounded-l-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-3 text-gray-900 transition-all duration-200 ease-in-out"
              placeholder="Enter code (e.g., SAVE20)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              variants={inputFocusVariants}
              whileFocus="focus"
              initial="initial"
            />
            <MotionButton
              variants={buttonTapVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleApplyCoupon}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Apply
            </MotionButton>
          </div>
          <AnimatePresence>
            {couponMessage.text && (
              <MotionDiv
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`mt-2 text-sm ${couponMessage.type === 'error' ? 'text-red-600' : 'text-green-600'}`}
              >
                {couponMessage.text}
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>

        {/* Shipping Estimator */}
        <div className="mb-6">
          <label htmlFor="shippingZip" className="block text-sm font-medium text-gray-700 mb-2">
            Estimate Shipping
          </label>
          <div className="flex rounded-md shadow-sm">
            <MotionInput
              type="text"
              id="shippingZip"
              name="shippingZip"
              className="flex-1 block w-full rounded-l-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-3 text-gray-900 transition-all duration-200 ease-in-out"
              placeholder="Enter Zip Code"
              value={shippingZipCode}
              onChange={(e) => setShippingZipCode(e.target.value)}
              variants={inputFocusVariants}
              whileFocus="focus"
              initial="initial"
            />
            <MotionButton
              variants={buttonTapVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleEstimateShipping}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
            >
              Estimate
            </MotionButton>
          </div>
          <AnimatePresence>
            {shippingMessage.text && (
              <MotionDiv
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`mt-2 text-sm ${shippingMessage.type === 'error' ? 'text-red-600' : 'text-gray-600'}`}
              >
                {shippingMessage.text}
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>

        {/* Checkout Button */}
        <MotionButton
          variants={buttonTapVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleCheckout} // Now directly calls handleCheckout for redirection
          className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-full shadow-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5"
        >
          Proceed to Checkout <ChevronRight className="ml-2 w-5 h-5" />
        </MotionButton>

        {/* Continue Shopping */}
        <div className="mt-4 text-center">
          <button
            onClick={handleContinueShopping} // Now directly calls handleContinueShopping for redirection
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-150 ease-in-out cursor-pointer"
          >
            Or continue shopping
          </button>
        </div>
      </div>

      {/* MessageBox Modal - Removed as per request */}
    </>
  );
};

export default CartSummary;
