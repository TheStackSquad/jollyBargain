// frontend/src/components/checkoutpage/paymentPortal/formFields.js
import React from "react";

function FormFields({ formData, setFormData }) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="cardName"
          className="block text-sm font-medium text-gray-700"
        >
          Name on Card
        </label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          value={formData.cardName}
          onChange={(e) =>
            setFormData({ ...formData, cardName: e.target.value })
          }
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  );
}

export default FormFields;
