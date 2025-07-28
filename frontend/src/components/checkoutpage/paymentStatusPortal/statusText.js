// frontend/component/paymentStatusPortal/statusText.js
import React from "react";

const getTitleText = (status) => {
  switch (status) {
    case "loading":
      return "Confirming Payment...";
    case "succeeded":
      return "Payment Confirmed!";
    case "processing":
      return "Payment Processing";
    default:
      return "Payment Failed";
  }
};

const getBodyText = (status) => {
  switch (status) {
    case "succeeded":
      return "Your payment has been successfully processed.";
    case "processing":
      return "Your payment is still being confirmed. This may take a few minutes.";
    case "loading":
      return "Please wait while we verify your payment.";
    default:
      return "There was an issue confirming your payment. Please try again or contact support.";
  }
};

function StatusText({ status }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-2">{getTitleText(status)}</h2>
      <p className="text-gray-600 text-sm">{getBodyText(status)}</p>
    </div>
  );
}

export default StatusText;
