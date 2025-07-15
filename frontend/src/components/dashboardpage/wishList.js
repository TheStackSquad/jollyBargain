// frontend/src/components/dashboardpage/Wishlist.js
import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../animation/animate"; // Your animation exports

function Wishlist() {
  // Simulated Wishlist Data
  const wishlistItems = [
    {
      id: "PROD001",
      name: "Smartwatch Pro",
      price: 199.99,
      imageUrl: "https://placehold.co/100x100/A0B0C0/FFFFFF?text=Smartwatch",
    },
    {
      id: "PROD002",
      name: "Noise-Cancelling Headphones",
      price: 249.0,
      imageUrl: "https://placehold.co/100x100/C0A0B0/FFFFFF?text=Headphones",
    },
    {
      id: "PROD003",
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      imageUrl: "https://placehold.co/100x100/B0C0A0/FFFFFF?text=Speaker",
    },
  ];

  const handleAddToCart = (item) => {
    console.log(`Adding ${item.name} to cart.`);
    // In a real app, dispatch a Redux action to add item to cart
    // Replaced alert with console.log as alerts are discouraged.
    console.log(`${item.name} added to cart! (Simulated)`);
  };

  const handleRemoveFromWishlist = (item) => {
    console.log(`Removing ${item.name} from wishlist.`);
    // In a real app, dispatch a Redux action to remove item from wishlist
    // Replaced alert with console.log as alerts are discouraged.
    console.log(`${item.name} removed from wishlist! (Simulated)`);
  };

  return (
    <motion.div
      variants={fadeIn("up", "tween", 0.1, 0.6)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="space-y-6"
    >
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
        My Wishlist
      </h2>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-600">
          Your wishlist is empty. Start adding some items!
        </p>
      ) : (
        <motion.div variants={staggerContainer(0.1, 0.2)}>
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeIn("up", "spring", index * 0.1, 0.7)}
              className="flex items-center bg-white p-4 rounded-xl shadow-md
              border border-gray-200 mb-4 last:mb-0"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg mr-4 flex-shrink-0"
                onError={(e) => {
                  // This is a standard browser behavior for image error handling.
                  // The 'no-param-reassign' warning here is often configured to be ignored
                  // for this specific pattern in many projects.
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/100x100/CCCCCC/333333?text=No+Image";
                }}
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-lg">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 ml-4 flex-shrink-0">
                <button
                  type="button" // Added explicit type="button"
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600
                  transition-colors duration-200 ease-in-out text-sm"
                >
                  Add to Cart
                </button>
                <button
                  type="button" // Added explicit type="button"
                  onClick={() => handleRemoveFromWishlist(item)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600
                  transition-colors duration-200 ease-in-out text-sm"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Wishlist;
