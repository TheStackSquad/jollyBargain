// frontend/src/pages/cart.js
import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  containerVariants,
  headerVariants,
  MotionDiv,
} from '../animation/cartAnimate';

// Subcomponents
import CartItem from '../components/cartpage/cartItem';
import CartSummary from '../components/cartpage/cartSummary';
import EmptyCartMessage from '../components/cartpage/emptyCartMessage';
import ProductRecommendationCard from '../components/cartpage/productRecommendationCard';
import MessageBox from '../components/cartpage/messageBox';

// Lucide React Icons
import { ShoppingCart, Zap } from 'lucide-react';

// Placeholder data for demonstration
const initialCartItems = [
  {
    id: '1',
    name: 'Vintage Leather Backpack',
    price: 89.99,
    quantity: 1,
     image: '',
  },
  {
    id: '2',
    name: 'Noise Cancelling Headphones',
    price: 199.99,
    quantity: 2,
      image: '',
  },
  {
    id: '3',
    name: 'Smart Home Assistant',
    price: 49.99,
    quantity: 1,
      image: '',
  },
];

const recommendedProducts = [
  {
    id: 'rec1',
    name: 'Portable Bluetooth Speaker',
    price: 75.00,
    image: '',
  },
  {
    id: 'rec2',
    name: 'Ergonomic Office Chair',
    price: 250.00,
     image: '',
  },
  {
    id: 'rec3',
    name: 'Stainless Steel Water Bottle',
    price: 25.00,
      image: '',
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });
  const [shippingZipCode, setShippingZipCode] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingMessage, setShippingMessage] = useState({ type: '', text: '' });
  const [taxRate, setTaxRate] = useState(0.08); // 8% tax rate for demonstration

  const [messageBoxProps, setMessageBoxProps] = useState(null); // State for MessageBox

  // Function to show the message box
  const showMessageBox = (title, message, callback = null) => {
    setMessageBoxProps({ title, message, callback });
  };

  // Function to close the message box
  const closeMessageBox = () => {
    if (messageBoxProps && messageBoxProps.callback) {
      messageBoxProps.callback(); // Execute callback if provided
    }
    setMessageBoxProps(null);
  };

  // Calculate cart totals
  const { subtotal, totalTax, grandTotal } = useMemo(() => {
    const calculatedSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const calculatedTax = calculatedSubtotal * taxRate;
    const calculatedGrandTotal = calculatedSubtotal + calculatedTax + shippingCost;
    return {
      subtotal: calculatedSubtotal,
      totalTax: calculatedTax,
      grandTotal: calculatedGrandTotal,
    };
  }, [cartItems, shippingCost, taxRate]);

  // Handle quantity change
  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  // Handle item removal
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Handle save for later (simulated)
  const handleSaveForLater = (id) => {
    // In a real app, you'd move this to a 'saved for later' list in your backend/state
    handleRemoveItem(id);
    setCouponMessage({ type: 'success', text: 'Item moved to saved for later!' });
    setTimeout(() => setCouponMessage({ type: '', text: '' }), 3000);
  };

  // Apply coupon code (simulated logic)
  const handleApplyCoupon = () => {
    if (couponCode.trim().toLowerCase() === 'save20') {
      // For simplicity, we'll just show a success message. In a real app, you'd adjust prices or totals.
      setCouponMessage({ type: 'success', text: 'Coupon "SAVE20" applied! 20% off your subtotal.' });
    } else if (couponCode.trim() === '') {
      setCouponMessage({ type: 'error', text: 'Please enter a coupon code.' });
    } else {
      setCouponMessage({ type: 'error', text: 'Invalid coupon code.' });
    }
    setTimeout(() => setCouponMessage({ type: '', text: '' }), 3000);
  };

  // Estimate shipping cost (simulated logic)
  const handleEstimateShipping = () => {
    if (shippingZipCode.trim() === '90210') {
      setShippingCost(15.00);
      setShippingMessage({ type: 'success', text: 'Shipping estimated for 90210.' });
    } else if (shippingZipCode.trim() === '') {
      setShippingMessage({ type: 'error', text: 'Please enter a zip code.' });
      setShippingCost(0);
    } else {
      setShippingCost(10.00); // Default shipping for other zips
      setShippingMessage({ type: 'info', text: 'Shipping estimated. (Default rate applied)' });
    }
    setTimeout(() => setShippingMessage({ type: '', text: '' }), 3000);
  };

  // Handle checkout (simulated)
  const handleCheckout = () => {
    // In a real app, you'd navigate to the checkout page
    console.log('Proceeding to checkout!');
  };

  // Handle continue shopping (simulated)
  const handleContinueShopping = () => {
    // In a real app, you'd navigate to the products page
    console.log('Navigating back to shopping!');
  };

  // Handle add to cart for recommendations (simulated)
  const handleAddToCartRecommendation = (productId) => {
    console.log(`Adding recommended product ${productId} to cart.`);
    // In a real app, you'd add the product to cart state/backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 font-inter text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden">
        <MotionDiv
          className="p-6 sm:p-8 lg:p-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <MotionDiv variants={headerVariants} className="flex items-center mb-8">
            <ShoppingCart className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Your Shopping Cart
            </h1>
          </MotionDiv>

          {cartItems.length === 0 ? (
            <EmptyCartMessage
              onStartShopping={handleContinueShopping}
              onShowMessageBox={showMessageBox}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <div className="lg:col-span-2">
                <MotionDiv variants={headerVariants} className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  Items in your Cart
                </MotionDiv>
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemoveItem={handleRemoveItem}
                      onSaveForLater={handleSaveForLater}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Cart Summary and Actions */}
              <CartSummary
                subtotal={subtotal}
                shippingCost={shippingCost}
                totalTax={totalTax}
                grandTotal={grandTotal}
                taxRate={taxRate}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                couponMessage={couponMessage}
                shippingZipCode={shippingZipCode}
                setShippingZipCode={setShippingZipCode}
                shippingMessage={shippingMessage}
                handleApplyCoupon={handleApplyCoupon}
                handleEstimateShipping={handleEstimateShipping}
                handleCheckout={handleCheckout}
                onContinueShopping={handleContinueShopping}
                onShowMessageBox={showMessageBox} // Pass showMessageBox to CartSummary
              />
            </div>
          )}

          {/* Product Recommendations */}
          {cartItems.length > 0 && (
            <MotionDiv variants={headerVariants} className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center">
                <Zap className="w-6 h-6 text-purple-600 mr-2" /> You might also like
              </h2>
              <MotionDiv
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {recommendedProducts.map((product) => (
                  <ProductRecommendationCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCartRecommendation}
                    onShowMessageBox={showMessageBox} // Pass showMessageBox to ProductRecommendationCard
                  />
                ))}
              </MotionDiv>
            </MotionDiv>
          )}
        </MotionDiv>
      </div>

      {/* Render MessageBox if props are available */}
      <AnimatePresence>
        {messageBoxProps && (
          <MessageBox
            title={messageBoxProps.title}
            message={messageBoxProps.message}
            onClose={closeMessageBox}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage;
