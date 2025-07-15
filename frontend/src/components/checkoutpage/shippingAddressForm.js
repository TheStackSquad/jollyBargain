// frontend/src/components/checkoutpage/ShippingAddressForm.js
import React, { useState } from "react";
import {
  MotionDiv,
  MotionButton,
  buttonTapVariants,
} from "../../animation/cartAnimate";

/**
 * Renders the shipping address input form.
 * @param {object} props - The component props.
 * @param {function} props.onNextStep - Callback to proceed to the next step.
 * @param {object} props.initialData - Initial form data.
 */
function ShippingAddressForm({ onNextStep, initialData = {} }) {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || "",
    addressLine1: initialData.addressLine1 || "",
    addressLine2: initialData.addressLine2 || "",
    city: initialData.city || "",
    state: initialData.state || "",
    zipCode: initialData.zipCode || "",
    country: initialData.country || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (
      formData.fullName &&
      formData.addressLine1 &&
      formData.city &&
      formData.state &&
      formData.zipCode &&
      formData.country
    ) {
      onNextStep(formData);
    } else {
      // Using a simple alert here; in a real app, you'd use a more integrated message system or MessageBox
      alert("Please fill in all required shipping fields.");
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
        Shipping Address
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="col-span-full">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
            focus:ring-indigo-500 p-2"
            required
          />
        </div>
        <div className="col-span-full">
          <label
            htmlFor="addressLine1"
            className="block text-sm font-medium text-gray-700"
          >
            Address Line 1
          </label>
          <input
            type="text"
            name="addressLine1"
            id="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
            focus:ring-indigo-500 p-2"
            required
          />
        </div>
        <div className="col-span-full">
          <label
            htmlFor="addressLine2"
            className="block text-sm font-medium text-gray-700"
          >
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            name="addressLine2"
            id="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
            focus:ring-indigo-500 p-2"
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
            focus:ring-indigo-500 p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State / Province
          </label>
          <input
            type="text"
            name="state"
            id="state"
            value={formData.state}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
            focus:ring-indigo-500 p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-700"
          >
            Zip / Postal Code
          </label>
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-indigo-500 focus:ring-indigo-500 p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <input
            type="text"
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-indigo-500 focus:ring-indigo-500 p-2"
            required
          />
        </div>
        <div className="col-span-full flex justify-end mt-6">
          <MotionButton
            type="submit"
            variants={buttonTapVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-full shadow-md
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Continue to Payment
          </MotionButton>
        </div>
      </form>
    </MotionDiv>
  );
}

export default ShippingAddressForm;
