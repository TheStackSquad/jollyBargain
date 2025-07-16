// frontend/src/components/storepage/dealGrid.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import DealCard from "./dealCard"; // This is the next component to review!
import {
  staggerContainer,
  staggerItem,
} from "../../animation/flashDealAnimate";

function DealsGrid({
  deals,
  onClaimDeal,
  currentPoolIndex,
  title = "More Amazing Deals",
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      <motion.h2
        className="text-3xl font-bold text-center text-gray-900 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h2>

      {deals.length === 0 ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No deals found
          </h3>
          <p className="text-gray-500">Try adjusting your search filters</p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPoolIndex}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {deals.map((deal, index) => (
              <motion.div key={deal._id} variants={staggerItem}>
                <DealCard deal={deal} onClaimDeal={onClaimDeal} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Load More Button */}
      {deals.length > 0 && deals.length >= 6 && (
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            type="button"
            className="bg-gradient-to-r from-blue-500 to-purple-500
            text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg
            transform hover:scale-105 transition-all duration-300"
          >
            Load More Deals
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default DealsGrid;
