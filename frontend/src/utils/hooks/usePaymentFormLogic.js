// frontend/utils/hooks/usePaymentFormLogic.js
import { useEffect, useRef, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

function usePaymentFormLogic(onNextStep, initialData = {}) {
  const stripe = useStripe();
  const elements = useElements();
  const submittedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardName: initialData.cardName || "",
  });
  const [cardError, setCardError] = useState("");

  useEffect(() => {
    const card = elements?.getElement(CardElement);
    if (card) {
      card.on("change", (event) => {
        if (event.error) {
          setCardError(event.error.message);
        } else {
          setCardError("");
        }
      });
    }
  }, [elements]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittedRef.current) return;

    setIsLoading(true);
    submittedRef.current = true;

    // Additional Stripe validations or token generation here (if any)
    try {
      onNextStep({ ...formData });
    } catch (err) {
      console.error("Payment submission failed:", err);
    } finally {
      setIsLoading(false);
      submittedRef.current = false;
    }
  };

  return {
    formData,
    setFormData,
    cardError,
    isLoading,
    submittedRef,
    handleSubmit,
  };
}

export default usePaymentFormLogic;
