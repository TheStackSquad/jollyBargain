// frontend/src/utils/validation/paymentValidation.js

export const validatePaymentForm = (formData) => {
  const errors = {};
  let isValid = true;

  // Validate Card Name
  if (!formData.cardName || formData.cardName.trim() === "") {
    errors.cardName = "Name on card is required.";
    isValid = false;
  } else if (!/^[a-zA-Z\s.'-]+$/.test(formData.cardName.trim())) {
    errors.cardName = "Name on card contains invalid characters.";
    isValid = false;
  }

  // Validate Card Number
  // Simple check for 16 digits (or 19 with spaces)
  const cardNumberClean = formData.cardNumber
    ? formData.cardNumber.replace(/\s/g, "")
    : "";
  if (!cardNumberClean) {
    errors.cardNumber = "Card number is required.";
    isValid = false;
  } else if (!/^\d{13,19}$/.test(cardNumberClean)) {
    // Basic check for 13-19 digits
    errors.cardNumber = "Card number is invalid.";
    isValid = false;
  }
  // For production, you'd use a library like 'validator' or specific payment gateway SDKs
  // to validate card numbers (e.g., Luhn algorithm, card type detection).

  // Validate Expiry Date (MM/YY)
  if (!formData.expiryDate || formData.expiryDate.trim() === "") {
    errors.expiryDate = "Expiry date is required.";
    isValid = false;
  } else {
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY format
    const match = formData.expiryDate.trim().match(expiryRegex);

    if (!match) {
      errors.expiryDate = "Invalid expiry date format (MM/YY).";
      isValid = false;
    } else {
      const month = parseInt(match[1], 10);
      const year = parseInt(`20${match[2]}`, 10); // Assuming 20XX for the year

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed

      if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        errors.expiryDate = "Card has expired.";
        isValid = false;
      }
    }
  }

  // Validate CVC
  if (!formData.cvc || formData.cvc.trim() === "") {
    errors.cvc = "CVC is required.";
    isValid = false;
  } else if (!/^\d{3,4}$/.test(formData.cvc.trim())) {
    // 3 or 4 digits
    errors.cvc = "Invalid CVC.";
    isValid = false;
  }

  return { isValid, errors };
};
