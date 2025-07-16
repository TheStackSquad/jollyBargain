// frontend/src/components/storepage/featuredDeal.js

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import StockProgressBar from "./stockProgressBar";
import { dealRefresh, priceStrike } from "../../animation/flashDealAnimate";

function FeaturedDeal({ deal, onClaimDeal }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(Number(price) || 0);

  if (!deal) return null;

  const displayPrice = deal.salePrice || deal.price;
  const originalPrice = deal.originalPrice || deal.price * 1.25;
  const discountPercentage = deal.discount || 20;

  const imageUrl =
    deal.images && deal.images.length > 0
      ? deal.images[0].url
      : "/images/placeholder.jpg";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={deal._id}
        className="max-w-6xl mx-auto px-4 mb-12"
        initial={dealRefresh.initial}
        animate={dealRefresh.animate}
        exit={dealRefresh.exit}
        transition={dealRefresh.transition}
      >
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-4 rounded-t-2xl">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            🔥 FEATURED DEAL OF THE CYCLE 🔥
          </h2>
          <p className="text-sm opacity-90 mt-1">
            Limited time offer - Don't miss out!
          </p>
        </div>

        <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden">
          <div className="md:flex items-center">
            <div className="md:w-1/2 p-8">
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={deal.title || deal.name}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.src = "/images/placeholder.jpg";
                  }}
                />

                <div className="absolute -top-3 -right-3 bg-yellow-400 text-black p-3 rounded-full font-bold text-center shadow-lg">
                  <div className="text-xs">SAVE</div>
                  <div className="text-sm">
                    {formatPrice(originalPrice - displayPrice)}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
                  {discountPercentage}% OFF
                </span>
                <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded">
                  {deal.category}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {deal.title || deal.name}
              </h3>

              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-red-500 mr-4">
                  {formatPrice(displayPrice)}
                </span>
                <div className="relative">
                  <span className="text-xl text-gray-500">
                    {formatPrice(originalPrice)}
                  </span>
                  <motion.div
                    className="absolute top-1/2 left-0 h-0.5 bg-red-500"
                    initial={priceStrike.initial}
                    animate={priceStrike.animate}
                    exit={priceStrike.exit}
                    transition={priceStrike.transition}
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-green-500">✓</span>
                    <span>Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-500">✓</span>
                    <span>1 Year Warranty</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-500">✓</span>
                    <span>30-Day Return</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-500">✓</span>
                    <span>Genuine Product</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <StockProgressBar
                  stock={deal.stock}
                  claimed={deal.claimed || 0}
                  size="large"
                  delay={0.5}
                />
              </div>

              <div className="space-y-3">
                <motion.button
                  type="button" // Added explicit type="button"
                  onClick={() => onClaimDeal(deal)}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transform transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🛒 CLAIM THIS DEAL NOW
                </motion.button>

                <div className="flex gap-2">
                  <button
                    type="button" // Added explicit type="button"
                    className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    ❤️ Add to Wishlist
                  </button>
                  <button
                    type="button" // Added explicit type="button"
                    className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    📤 Share Deal
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    {deal.rating || "4.8"} rating
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-blue-500">👥</span>
                    {deal.views || "2.1k"} views today
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-green-500">🔒</span>
                    Secure checkout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default FeaturedDeal;
