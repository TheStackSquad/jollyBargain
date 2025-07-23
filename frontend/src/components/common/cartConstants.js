// frontend/src/components/common/cartConstants.js

export const AVAILABLE_COUPONS = {
  SAVE10: {
    type: "percentage",
    value: 0.1,
    minSubtotal: 5000,
    description: "10% off for orders over $50.00",
  },
  FREESHIP: {
    type: "shipping",
    value: 0,
    minSubtotal: 10000,
    description: "Free shipping for orders over $100.00",
  },
  FIXED2000: {
    type: "fixed",
    value: 2000,
    minSubtotal: 8000,
    description: "$20.00 off for orders over $80.00",
  },
};

export const VAT_RATE = 0.075;

export const SHIPPING_RATES = {
  DEFAULT: 10.0,
  PREMIUM_ZIP: 15.0,
  PREMIUM_ZIP_CODE: "90210",
};

export const COUPON_MESSAGE_DURATION = 3000;
export const SHIPPING_MESSAGE_DURATION = 3000;
