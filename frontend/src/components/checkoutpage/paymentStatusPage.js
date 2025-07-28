// frontend/src/components/checkoutpage/paymentStatusPage.js
import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { MotionDiv } from "../../animation/cartAnimate"; // Assuming MotionDiv is exported from here
import MessageBox from "../common/messageBox";

// Define MotionButton if it's not exported from cartAnimate.js
const MotionButton = motion.button;

// Define variants for framer-motion animations
const buttonTapVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

function PaymentStatusPage() {
  const stripe = useStripe();
  const location = useLocation();
  const navigate = useNavigate();

  const [paymentStatus, setPaymentStatus] = useState("loading"); // loading, succeeded, processing, failed
  const [paymentMessage, setPaymentMessage] = useState(
    "Confirming your payment...",
  );
  const [orderId, setOrderId] = useState(null);
  const [messageBox, setMessageBox] = useState({
    isVisible: false,
    message: "",
  });

  const showMessageBox = (message) => {
    setMessageBox({ isVisible: true, message });
  };

  const hideMessageBox = () => {
    setMessageBox({ isVisible: false, message: "" });
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(location.search).get(
      "payment_intent_client_secret",
    );
    const orderIdFromUrl = new URLSearchParams(location.search).get("orderId");
    setOrderId(orderIdFromUrl);

    if (!clientSecret) {
      setPaymentStatus("failed");
      setPaymentMessage(
        "Payment confirmation failed: Missing payment intent client secret in URL.",
      );
      showMessageBox(
        "Payment confirmation failed. Please contact support if you believe this is an error.",
      );
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setPaymentStatus("succeeded");
            setPaymentMessage(
              "Payment successful! Your order has been placed.",
            );
            showMessageBox("Payment successful! Thank you for your purchase.");
            break;
          case "processing":
            setPaymentStatus("processing");
            setPaymentMessage(
              "Your payment is processing. You will receive an email once it is complete.",
            );
            showMessageBox(
              "Your payment is processing. We will notify you when it is complete.",
            );
            break;
          case "requires_payment_method":
            setPaymentStatus("failed");
            setPaymentMessage(
              "Payment failed. Please try again with a different payment method.",
            );
            showMessageBox("Payment failed. Please try again.");
            break;
          case "requires_action":
            setPaymentStatus("failed");
            setPaymentMessage(
              "Payment requires further action, but it was not completed. Please try again.",
            );
            showMessageBox(
              "Payment requires further action, but it was not completed. Please try again.",
            );
            break;
          case "canceled":
            setPaymentStatus("failed");
            setPaymentMessage("Payment was canceled.");
            showMessageBox("Payment was canceled.");
            break;
          default:
            setPaymentStatus("failed");
            setPaymentMessage(
              "Something went wrong with your payment. Please contact support.",
            );
            showMessageBox(
              "An unexpected error occurred with your payment. Please contact support.",
            );
            break;
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        if (process.env.NODE_ENV === "development") {
          console.error("Error retrieving PaymentIntent:", err);
        }

        setPaymentStatus("failed");
        setPaymentMessage(
          "Failed to confirm payment status due to a network error. Please contact support.",
        );
        showMessageBox(
          "Failed to confirm payment status. Please check your internet connection or contact support.",
        );
      });
  }, [stripe, location.search]);

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case "succeeded":
        return (
          <svg
            className="w-16 h-16 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />{" "}
            {/* Self-closing */}
          </svg>
        );
      case "processing":
        return (
          <svg
            className="animate-spin w-16 h-16 text-blue-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 12v.621c0 2.457 2.305 4.913 5.357 4.913h3.328c.316 0 .623-.016.924-.04l2.884-.344m-5.327-6.502l2.257-2.257l4.505 4.505M18 10h1.582a2.25 2.25 0 012.244 2.077v.172c0 1.14-.921 2.062-2.062 2.062H18"
            />{" "}
            {/* Self-closing */}
          </svg>
        );
      case "failed":
        return (
          <svg
            className="w-16 h-16 text-red-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />{" "}
            {/* Self-closing */}
          </svg>
        );
      default: // Handles 'loading' as well
        return (
          <svg
            className="animate-pulse w-16 h-16 text-gray-400 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />{" "}
            {/* Self-closing */}
          </svg>
        );
    }
  };

  const getStatusTextColor = () => {
    switch (paymentStatus) {
      case "succeeded":
        return "text-green-700";
      case "processing":
        return "text-blue-700";
      case "failed":
      case "loading": // You might want a different color for loading, adjust as needed
      default:
        return "text-red-700";
    }
  };

  const getStatusHeadingText = () => {
    switch (paymentStatus) {
      case "loading":
        return "Confirming Payment...";
      case "succeeded":
        return "Payment Confirmed!";
      case "processing":
        return "Payment Processing";
      case "failed":
      default:
        return "Payment Failed";
    }
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex items-center justify-center min-h-[60vh] p-4"
    >
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-md w-full text-center">
        <div className="mb-6">{getStatusIcon()}</div>
        <h2 className={`text-3xl font-bold mb-4 ${getStatusTextColor()}`}>
          {getStatusHeadingText()}
        </h2>
        <p className="text-gray-600 mb-6 text-lg">{paymentMessage}</p>
        {orderId && (
          <p className="text-gray-500 text-sm mb-4">
            Order ID: <span className="font-semibold">{orderId}</span>
          </p>
        )}
        <MotionButton
          variants={buttonTapVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => navigate("/")}
          className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-full shadow-md
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Go to Home
        </MotionButton>
      </div>
      {messageBox.isVisible && ( // Only render MessageBox if it's visible
        <MessageBox
          message={messageBox.message}
          isVisible={messageBox.isVisible}
          onClose={hideMessageBox}
        />
      )}
    </MotionDiv>
  );
}

export default PaymentStatusPage;
