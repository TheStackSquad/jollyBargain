// frontend/src/components/storepage/dealCard.js
import React from 'react';
import { motion } from 'framer-motion';
import StockProgressBar from '../storepage/stockProgressBar';
import { dealCardHover, urgencyBadge } from '../../animation/flashDealAnimate';

const DealCard = ({ deal, onClaimDeal, index = 0 }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(Number(price) || 0);
  };

  const getStockStatus = (stock, claimed) => {
    const remaining = (stock || 0) - (claimed || 0);
    if (remaining <= 3 && remaining > 0) return { urgency: 'high' };
    if (stock > 0 && (claimed / stock) * 100 >= 70) return { urgency: 'medium' };
    return { urgency: 'low' };
  };

  // Handle missing deal data
  if (!deal) return null;

  const stockStatus = getStockStatus(deal.stock, deal.claimed);

  // Use the backend fields directly - no more schema mismatches
  const imageUrl = deal.images && deal.images.length > 0 
    ? deal.images[0].url 
    : '/images/placeholder.jpg';

  // Use the transformed fields from backend
  const currentPrice = deal.salePrice || deal.price; // Use salePrice if available, fallback to price
  const originalPrice = deal.originalPrice || (deal.price * 1.25);
  const discount = deal.discount || 20;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      {...dealCardHover}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={deal.title || deal.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg'; // Fallback for broken images
          }}
        />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3">
          <motion.span
            className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold shadow-lg"
            {...(stockStatus.urgency === 'high' ? urgencyBadge : {})}
          >
            {discount}% OFF
          </motion.span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
            {deal.category}
          </span>
        </div>

        {/* Savings Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
            Save {formatPrice(originalPrice - currentPrice)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          {deal.title || deal.name}
        </h3>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-red-500">
            {formatPrice(currentPrice)}
          </span>
          <div className="text-right">
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(originalPrice)}
            </span>
            <div className="text-xs text-green-600 font-medium">
              You save {discount}%
            </div>
          </div>
        </div>

        {/* Stock Progress */}
        <div className="mb-4">
          <StockProgressBar
            stock={deal.stock}
            claimed={deal.claimed || 0}
            size="medium"
            delay={index * 0.05}
          />
        </div>

        {/* Action Button */}
        <motion.button
          onClick={() => onClaimDeal(deal)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transform transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
          Claim Deal
        </motion.button>

        {/* Additional Info */}
        <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
          <span>⭐ {deal.rating || '4.5'} rating</span>
          <span>🚚 Free delivery</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DealCard;