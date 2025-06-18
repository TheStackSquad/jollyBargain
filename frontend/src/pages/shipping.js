// frontend/src/pages/shipping.js
import React from 'react';

// Import shipping page components
import ShippingHero from '../components/shippingpage/shippingHero';
import ShippingOptions from '../components/shippingpage/shippingOptions';
import ShippingZones from '../components/shippingpage/shippingZones';
import ShippingPolicy from '../components/shippingpage/shippingPolicy';

const Shipping = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - introduces the shipping page */}
      <ShippingHero />
      
      {/* Shipping Options Section - displays available shipping methods */}
      <ShippingOptions />
      
      {/* Shipping Zones Section - shows rates and calculator */}
      <ShippingZones />
      
      {/* Shipping Policy Section - details policies and terms */}
      <ShippingPolicy />
    </div>
  );
};

export default Shipping;