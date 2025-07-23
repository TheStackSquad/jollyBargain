// frontend/src/components/checkoutpage/paymentPortal/cardInput.js
import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardInput({ cardError }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="card-element"
        className="block text-sm font-medium text-gray-700"
      >
        Card Details
      </label>
      <div className="border rounded-md p-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
        <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
      </div>
      {cardError && <p className="text-red-500 text-sm">{cardError}</p>}
    </div>
  );
}

export default CardInput;
