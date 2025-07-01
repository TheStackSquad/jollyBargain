// frontend/src/components/checkoutpage/PaymentMethodForm.js
import React, { useState } from 'react';
import { MotionDiv, MotionButton, buttonTapVariants } from '../../animation/cartAnimate';

/**
 * Renders the payment method input form.
 * @param {object} props - The component props.
 * @param {function} props.onNextStep - Callback to proceed to the next step.
 * @param {function} props.onPrevStep - Callback to go back to the previous step.
 * @param {object} props.initialData - Initial form data.
 */
const PaymentMethodForm = ({ onNextStep, onPrevStep, initialData = {} }) => {
  const [formData, setFormData] = useState({
    cardName: initialData.cardName || '',
    cardNumber: initialData.cardNumber || '',
    expiryDate: initialData.expiryDate || '',
    cvc: initialData.cvc || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (formData.cardName && formData.cardNumber && formData.expiryDate && formData.cvc) {
      onNextStep(formData);
    } else {
      // Using a simple alert here; in a real app, you'd use a more integrated message system or MessageBox
      alert('Please fill in all required payment fields.');
    }
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        Payment Information
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
            Name on Card
          </label>
          <input
            type="text"
            name="cardName"
            id="cardName"
            value={formData.cardName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            id="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            placeholder="XXXX XXXX XXXX XXXX"
            maxLength="19" // Max length for typical card numbers with spaces
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
              Expiry Date (MM/YY)
            </label>
            <input
              type="text"
              name="expiryDate"
              id="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>
          <div>
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <input
              type="text"
              name="cvc"
              id="cvc"
              value={formData.cvc}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              placeholder="XXX"
              maxLength="4"
              required
            />
          </div>
        </div>
        <div className="col-span-full flex justify-between mt-6">
          <MotionButton
            type="button"
            variants={buttonTapVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onPrevStep}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 ease-in-out"
          >
            Back to Shipping
          </MotionButton>
          <MotionButton
            type="submit"
            variants={buttonTapVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Continue to Review
          </MotionButton>
        </div>
      </form>
    </MotionDiv>
  );
};

export default PaymentMethodForm;
