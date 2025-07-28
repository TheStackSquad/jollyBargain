// frontend/src/pages/checkout.js
import React, { useState } from "react";
import CheckoutHeader from "../components/checkoutpage/checkoutHeader";
import OrderReview from "../components/checkoutpage/orderPortal/orderReview";
import PaymentMethodForm from "../components/checkoutpage/paymentMethodForm";
import ShippingAddress from "../components/checkoutpage/shippingAddressForm";

const CHECKOUT_STEPS = {
  SHIPPING: "shipping",
  PAYMENT: "payment",
  REVIEW: "review",
  CONFIRMATION: "confirmation",
};

function Checkout() {
  const [currentStep, setCurrentStep] = useState(CHECKOUT_STEPS.SHIPPING);
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  const handleNextStep = (data, nextStep) => {
    if (currentStep === CHECKOUT_STEPS.SHIPPING) {
      setShippingData(data);
      // console.log("Checkout.js: Saved shippingData:", data);
    } else if (currentStep === CHECKOUT_STEPS.PAYMENT) {
      setPaymentData(data);
      // console.log("Checkout.js: Saved paymentData:", data);
    }
    setCurrentStep(nextStep);
  };

  const handlePrevStep = (prevStep) => {
    setCurrentStep(prevStep);
  };

  const handleEditShipping = () => {
    // console.log("Checkout.js: Navigating back to Shipping for edit.");
    setCurrentStep(CHECKOUT_STEPS.SHIPPING);
  };

  const handleEditPayment = () => {
    // console.log("Checkout.js: Navigating back to Payment for edit.");
    setCurrentStep(CHECKOUT_STEPS.PAYMENT);
  };

  const handlePlaceOrder = async () => {
    setIsProcessingOrder(true);
    // console.log("Checkout.js: Attempting to place order with:", {
    //   shippingData,
    //   paymentData,
    // });
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      // console.log("Checkout.js: Order placed successfully (simulated)!");
      setCurrentStep(CHECKOUT_STEPS.CONFIRMATION);
    } catch (error) {
      // console.error("Checkout.js: Error placing order (simulated):", error);
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case CHECKOUT_STEPS.SHIPPING:
        return (
          <ShippingAddress
            onNextStep={(data) => handleNextStep(data, CHECKOUT_STEPS.PAYMENT)}
            initialData={shippingData}
          />
        );
      case CHECKOUT_STEPS.PAYMENT:
        return (
          <PaymentMethodForm
            initialData={paymentData}
            onNextStep={(data) => handleNextStep(data, CHECKOUT_STEPS.REVIEW)}
            onPrevStep={() => handlePrevStep(CHECKOUT_STEPS.SHIPPING)}
          />
        );
      case CHECKOUT_STEPS.REVIEW:
        return (
          <div className="text-center py-10 text-gray-600">
            Review your order details on the right.
            <button
              type="button" // ✅ fixed
              onClick={() => handlePrevStep(CHECKOUT_STEPS.PAYMENT)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded-md"
            >
              Back to Payment
            </button>
          </div>
        );
      case CHECKOUT_STEPS.CONFIRMATION:
        return (
          <div className="text-center py-10">
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-700">Thank you for your purchase.</p>
          </div>
        );
      default:
        return (
          <ShippingAddress
            onNextStep={(data) => handleNextStep(data, CHECKOUT_STEPS.PAYMENT)}
            initialData={shippingData}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <CheckoutHeader currentStep={currentStep} />
        <div className="mt-8 lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2 space-y-8">{renderStepComponent()}</div>
          <div className="lg:col-span-2 lg:sticky lg:top-8 h-fit">
            <OrderReview
              shippingInfo={shippingData}
              paymentInfo={paymentData}
              onPlaceOrder={handlePlaceOrder}
              onPrevStep={() =>
                handlePrevStep(
                  currentStep === CHECKOUT_STEPS.REVIEW
                    ? CHECKOUT_STEPS.PAYMENT
                    : currentStep,
                )
              }
              onEditShipping={handleEditShipping}
              onEditPayment={handleEditPayment}
              isProcessing={isProcessingOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
