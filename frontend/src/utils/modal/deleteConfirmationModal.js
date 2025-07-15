// frontend/src/utils/modal/deleteConfirmationModal.js

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const modalVariants = {
  hidden: { opacity: 0, y: "-100vh" }, // Starts off-screen above
  visible: {
    opacity: 1,
    y: "0",
    transition: { type: "spring", stiffness: 100, damping: 15 },
  }, // Slides in
  exit: {
    opacity: 0,
    y: "100vh",
    transition: { ease: "easeOut", duration: 0.3 },
  }, // Slides out downwards
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// Destructure productToDelete instead of just productName
function DeleteConfirmationModal({
  isOpen,
  productToDelete,
  onConfirm,
  onCancel,
}) {
  // Extract details from productToDelete (will be null if modal is not open)
  const title = productToDelete?.title || "this product";
  const imageUrl = productToDelete?.images?.[0]?.url; // First image for preview
  const price = productToDelete?.price;
  const category = productToDelete?.category;
  const sku = productToDelete?.sku;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onCancel} // Allow clicking backdrop to cancel
          />

          {/* Modal Content */}
          <motion.div
            className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full
                       relative z-10 transform" // Line 77 adjusted
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 text-center mb-6">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>

            {/* Product Details for Confirmation */}
            {productToDelete && (
              <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50 text-center">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-24 h-24 object-cover rounded-md mx-auto mb-3
                               border border-gray-300" // Line 96 adjusted
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-800 break-words">
                  {title}
                </h3>
                {price && (
                  <p className="text-gray-600">Price: ${price.toFixed(2)}</p>
                )}
                {category && (
                  <p className="text-gray-600">Category: {category}</p>
                )}
                {sku && <p className="text-gray-600">SKU: {sku}</p>}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button" // Added type="button"
                onClick={onCancel}
                className="px-6 py-2 rounded-md border border-gray-300
                           text-gray-700 hover:bg-gray-100 transition-colors
                           duration-200 focus:outline-none focus:ring-2
                           focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                type="button" // Added type="button"
                onClick={onConfirm}
                className="px-6 py-2 rounded-md bg-red-600 text-white
                           hover:bg-red-700 transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteConfirmationModal;
