// frontend/src/pages/cart.js
import React, { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateItemQuantity,
  removeItemFromCart,
  // clearCart // Uncomment if you want to clear cart on checkout
} from '../reduxStore/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

import {
  containerVariants,
  headerVariants,
  MotionDiv,
} from '../animation/cartAnimate';

// Subcomponents
import CartItem from '../components/cartpage/cartItem';
import CartSummary from '../components/cartpage/cartSummary';
import EmptyCartMessage from '../components/cartpage/emptyCartMessage';

// Lucide React Icons
import { ShoppingCart } from 'lucide-react';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for coupon and shipping remain local for now
  const [couponCode, setCouponCode] = React.useState('');
  const [couponMessage, setCouponMessage] = React.useState({ type: '', text: '' });
  const [shippingZipCode, setShippingZipCode] = React.useState('');
  const [shippingCost, setShippingCost] = React.useState(0);
  const [shippingMessage, setShippingMessage] = React.useState({ type: '', text: '' });
  const [taxRate, setTaxRate] = React.useState(0.08); // 8% tax rate for demonstration

  // Calculate cart totals - now depends on Redux cartItems
  const { subtotal, totalTax, grandTotal } = useMemo(() => {
    const calculatedSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const calculatedTax = calculatedSubtotal * taxRate;
    const calculatedGrandTotal = calculatedSubtotal + calculatedTax + shippingCost;
    return {
      subtotal: calculatedSubtotal,
      totalTax: calculatedTax,
      total: calculatedGrandTotal, // Renamed grandTotal to total for consistency with some APIs
    };
  }, [cartItems, shippingCost, taxRate]);

  // Handle quantity change - dispatch Redux action
  const handleQuantityChange = (id, delta) => {
    dispatch(updateItemQuantity({ id, delta }));
  };

  // Handle item removal - dispatch Redux action
  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  // Handle save for later (simulated) - for now, just removes from cart and shows message
  const handleSaveForLater = (id) => {
    dispatch(removeItemFromCart(id)); // Remove from cart
    console.log(`Item ${id} removed from cart and simulated as saved for later.`);
    setCouponMessage({ type: 'success', text: 'Item moved to saved for later!' });
    setTimeout(() => setCouponMessage({ type: '', text: '' }), 3000);
  };

  // Apply coupon code (simulated logic)
  const handleApplyCoupon = () => {
    if (couponCode.trim().toLowerCase() === 'save20') {
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

  // Handle checkout (simulated) - now directly navigates
  const handleCheckout = () => {
    console.log('Proceeding to checkout!');
    // dispatch(clearCart()); // Optional: uncomment if you want to clear cart on checkout initiation
    navigate('/checkout'); // Direct navigation
  };

  // Handle continue shopping (simulated) - now directly navigates
  const handleContinueShopping = () => {
    navigate('/store'); // Direct navigation to your store page
  };

  // Handle show message box - add this function back
  const handleShowMessageBox = (message) => {
    // You can implement this however you want - could show a modal, toast, etc.
    alert(message); // Simple implementation
    // Or you could set a state for a custom modal/notification
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
              onShowMessageBox={handleShowMessageBox} // Added back the prop
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
                      key={item._id}
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
                total={grandTotal} // Passed as 'total'
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
              />
            </div>
          )}
        </MotionDiv>
      </div>
    </div>
  );
};

export default CartPage;