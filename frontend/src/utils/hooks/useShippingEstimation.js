// frontend/src/components/utils/hooks/useShippingEstimation.js
import { useState, useCallback } from "react";
import {
  SHIPPING_RATES,
  SHIPPING_MESSAGE_DURATION,
} from "../../components/common/cartConstants";

/**
 * Custom hook for shipping estimation logic
 * @param {Function} setShippingCost - Function to update shipping cost
 * @returns {Object} Shipping estimation functions and state
 */
export const useShippingEstimation = (setShippingCost) => {
  const [shippingZipCode, setShippingZipCode] = useState("");
  const [shippingMessage, setShippingMessage] = useState({
    type: "",
    text: "",
  });

  const clearShippingMessage = useCallback(() => {
    setTimeout(
      () => setShippingMessage({ type: "", text: "" }),
      SHIPPING_MESSAGE_DURATION,
    );
  }, []);

  const estimateShipping = useCallback(() => {
    const zipCode = shippingZipCode.trim();

    // Validate zip code input
    if (!zipCode) {
      setShippingMessage({ type: "error", text: "Please enter a zip code." });
      setShippingCost(0);
      clearShippingMessage();
      return;
    }

    // Calculate shipping based on zip code
    if (zipCode === SHIPPING_RATES.PREMIUM_ZIP_CODE) {
      setShippingCost(SHIPPING_RATES.PREMIUM_ZIP);
      setShippingMessage({
        type: "success",
        text: `Shipping estimated for ${zipCode}.`,
      });
    } else {
      setShippingCost(SHIPPING_RATES.DEFAULT);
      setShippingMessage({
        type: "info",
        text: "Shipping estimated. (Default rate applied)",
      });
    }

    clearShippingMessage();
  }, [shippingZipCode, setShippingCost, clearShippingMessage]);

  return {
    shippingZipCode,
    setShippingZipCode,
    shippingMessage,
    estimateShipping,
  };
};
