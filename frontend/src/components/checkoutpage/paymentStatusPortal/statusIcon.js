// frontend/component/paymentStatusPortal/statusIcon.js
import React from "react";

function StatusIcon({ status }) {
  switch (status) {
    case "succeeded":
      return (
        <svg
          className="w-16 h-16 text-green-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      );
    case "processing":
      return (
        <svg
          className="w-16 h-16 text-yellow-500 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" strokeDasharray="40" />
        </svg>
      );
    default:
      return (
        <svg
          className="w-16 h-16 text-red-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
  }
}

export default StatusIcon;
