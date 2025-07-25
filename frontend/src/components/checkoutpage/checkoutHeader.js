// frontend/src/components/checkoutpage/CheckoutHeader.js
import React from "react";
import { Package, CreditCard, CheckCircle } from "lucide-react";
import { MotionDiv, headerVariants } from "../../animation/cartAnimate";

function CheckoutHeader({ currentStep }) {
  const steps = [
    { id: 1, name: "Shipping", icon: Package },
    { id: 2, name: "Payment", icon: CreditCard },
    { id: 3, name: "Review", icon: CheckCircle },
  ];

  return (
    <MotionDiv
      variants={headerVariants}
      className="mb-8 p-4 bg-white rounded-t-3xl border-b border-gray-200"
    >
      <h1
        className="text-4xl sm:text-5xl font-extrabold text-gray-900
      leading-tight text-center mb-6"
      >
        Checkout
      </h1>
      <div className="flex justify-center items-center space-x-4 sm:space-x-8">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          // Refactored: Determine the background and shadow classes
          let stepBackgroundAndShadowClasses = "";
          if (isActive) {
            stepBackgroundAndShadowClasses = "bg-indigo-600 shadow-lg";
          } else if (isCompleted) {
            stepBackgroundAndShadowClasses = "bg-green-500";
          } else {
            stepBackgroundAndShadowClasses = "bg-gray-300";
          }

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`relative w-10 h-10 rounded-full flex items-center justify-center
                  text-white font-bold text-lg transition-all duration-300 ease-in-out
                  ${stepBackgroundAndShadowClasses}
                `}
              >
                <step.icon className="w-5 h-5" />
                {isCompleted && (
                  <CheckCircle
                    className="absolute -top-1 -right-1 w-5 h-5 text-green-500
                    bg-white rounded-full"
                  />
                )}
              </div>
              <p
                className={`mt-2 text-sm font-medium ${isActive ? "text-indigo-700" : "text-gray-500"}`}
              >
                {step.name}
              </p>
            </div>
          );
        })}
      </div>
    </MotionDiv>
  );
}

export default CheckoutHeader;
