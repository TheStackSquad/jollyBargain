// frontend/src/utils/handlers/paymentHandlers.js
import { validatePaymentForm } from "../validation/paymentValidation";
import { apiClient } from "../../services/apiClient"; // Ensure this path is correct

export const handlePaymentFormChange = (e, setFormData) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({ ...prevData, [name]: value }));
};

export const handlePaymentFormSubmit = async (
  e,
  formData,
  onNextStep,
  showMessageBox,
  setIsLoading,
  orderId, // Assuming orderId and amount are passed from the parent component
  amount,
) => {
  e.preventDefault();
  setIsLoading(true); // Start loading

  const { isValid, errors } = validatePaymentForm(formData);

  if (!isValid) {
    // Construct a single error message from all validation errors
    const errorMessages = Object.values(errors).join("\n");
    showMessageBox(errorMessages || "Please correct the highlighted errors.");
    setIsLoading(false); // Stop loading
    return;
  }

  try {
    // In a real application, you would integrate with a payment gateway SDK here (e.g., Stripe.js)
    // to tokenize the card details. For this example, we'll simulate it.
    // DO NOT SEND RAW CARD DETAILS TO YOUR BACKEND.
    // The `paymentToken` below is a placeholder for what a gateway would return.

    // Simulate tokenization or just send relevant (non-sensitive) data
    const paymentDataToSend = {
      orderId: orderId, // Pass the actual order ID
      amount: amount, // Pass the actual amount
      currency: "USD", // Or dynamically get this
      paymentMethodType: "credit_card",
      // In a real app, formData.cardNumber, expiryDate, cvc would be sent to the PAYMENT GATEWAY
      // and the gateway would return a token.
      // For this example, we'll just send a dummy token and card brand/last 4 for display.
      paymentToken: `tok_${Math.random().toString(36).substring(2, 15)}`, // Dummy token
      cardLast4: formData.cardNumber.slice(-4),
      cardBrand: "Visa", // Or detect based on card number
    };

    // Call your backend API to process the payment
    const response = await apiClient.post(
      "/payment/process",
      paymentDataToSend,
    );

    if (response && response.success) {
      showMessageBox("Payment processed successfully!");
      onNextStep(formData); // Proceed to the next step (e.g., review page)
    } else {
      // Backend might return specific error messages
      showMessageBox(response.message || "Payment failed. Please try again.");
    }
  } catch (error) {
    console.error("Payment submission error:", error);
    showMessageBox(
      error.message || "An error occurred during payment processing.",
    );
  } finally {
    setIsLoading(false); // Always stop loading
  }
};
