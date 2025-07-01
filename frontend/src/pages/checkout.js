//frontend/src/pages/checkout

// import React, { useState } from 'react';

// Import FAQ page components
import CheckoutHeader from '../components/checkoutpage/checkoutHeader';
import OrderReview from '../components/checkoutpage/orderReview';
import PaymentMethodForm from '../components/checkoutpage/paymentMethodForm';
import ShippingAddress from '../components/checkoutpage/shippingAddressForm';

const Checkout = () => {

  return (
    <div className="min-h-screen">
      {/* Hero Section - introduces the FAQ page */}
      <CheckoutHeader />
      
      {/* Search Section - allows users to search through FAQs */}
      <OrderReview />
      
      {/* FAQ List Section - displays categorized questions and answers */}
      <PaymentMethodForm />

        <ShippingAddress />
    </div>
  );
};

export default Checkout;