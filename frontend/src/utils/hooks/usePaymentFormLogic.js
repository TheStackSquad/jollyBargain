// frontend/utils/hooks/usePaymentFormLogic.js
import { useEffect, useRef, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

function usePaymentFormLogic(onNextStep, initialData = {}) {
  const stripe = useStripe(); // This is the 'stripe' object
  const elements = useElements(); // This is the 'elements' object
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
    setCardError(""); // Clear previous card errors

    // **IMPORTANT:** Add checks for stripe and elements availability
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setIsLoading(false);
      submittedRef.current = false;
      // Optionally, set an error message for the user
      setCardError("Stripe is not loaded. Please try again in a moment.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setCardError("Card element not found.");
      setIsLoading(false);
      submittedRef.current = false;
      return;
    }

    try {
      // **THIS IS WHERE YOU'LL LIKELY USE 'stripe'**
      // Example: Create a PaymentMethod
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: formData.cardName, // Use the cardName from your form data
          // Add other billing details if you collect them (e.g., email, address)
        },
      });

      if (error) {
        setCardError(error.message);
        setIsLoading(false);
        submittedRef.current = false;
        return; // Stop if there's an error from Stripe
      }

      // If successful, you'll get a paymentMethod.id
      // You would then send this paymentMethod.id to your backend
      // for confirmation or to create a PaymentIntent.
      //  console.log("PaymentMethod created:", paymentMethod);

      // Call onNextStep with the payment method details or other relevant data
      // For example, you might pass the paymentMethod.id to your next step
      onNextStep({ ...formData, paymentMethodId: paymentMethod.id });
    } catch (err) {
      //   console.error("Payment submission failed:", err);
      // You might want to set a generic error if the catch block is reached
      setCardError("An unexpected error occurred during payment processing.");
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
