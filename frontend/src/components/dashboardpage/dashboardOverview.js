// frontend/src/components/dashboardpage/DashboardOverview.js
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../animation/animate'; // Your animation exports

const DashboardOverview = ({ userName }) => {
  // Simulated data
  const activeOrders = 2;
  const recentOrderStatus = 'Shipped - Delivered 2 days ago';
  const loyaltyPoints = 1250;

  return (
    <motion.div
      variants={fadeIn('up', 'tween', 0.1, 0.6)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Welcome, {userName}!</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats Card 1: Active Orders */}
        <motion.div
          variants={fadeIn('up', 'spring', 0.3, 0.7)}
          className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-200"
        >
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Active Orders</h3>
          <p className="text-4xl font-bold text-blue-600">{activeOrders}</p>
          <p className="text-gray-600 mt-2">Currently being processed or shipped.</p>
        </motion.div>

        {/* Quick Stats Card 2: Recent Order Status */}
        <motion.div
          variants={fadeIn('up', 'spring', 0.4, 0.7)}
          className="bg-green-50 p-6 rounded-xl shadow-md border border-green-200"
        >
          <h3 className="text-xl font-semibold text-green-800 mb-2">Recent Order</h3>
          <p className="text-lg font-bold text-green-600">{recentOrderStatus}</p>
          <p className="text-gray-600 mt-2">Your last order update.</p>
        </motion.div>

        {/* Quick Stats Card 3: Loyalty Points */}
        <motion.div
          variants={fadeIn('up', 'spring', 0.5, 0.7)}
          className="bg-purple-50 p-6 rounded-xl shadow-md border border-purple-200"
        >
          <h3 className="text-xl font-semibold text-purple-800 mb-2">Loyalty Points</h3>
          <p className="text-4xl font-bold text-purple-600">{loyaltyPoints}</p>
          <p className="text-gray-600 mt-2">Redeem for discounts!</p>
        </motion.div>
      </div>

      {/* Quick Links */}
      <motion.div
        variants={fadeIn('up', 'tween', 0.6, 0.6)}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition-colors duration-200 ease-in-out">
            Track My Orders
          </button>
          <button className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg shadow hover:bg-gray-300 transition-colors duration-200 ease-in-out">
            Update Profile
          </button>
        </div>
      </motion.div>

      {/* Placeholder for Recommendations */}
      <motion.div
        variants={fadeIn('up', 'tween', 0.7, 0.6)}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Recommended For You</h3>
        <p className="text-gray-600">
          (Product recommendations would appear here based on your browsing history.)
        </p>
        {/* You'd typically fetch and render actual product cards here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-24">Placeholder Product 1</div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-24">Placeholder Product 2</div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-24">Placeholder Product 3</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardOverview;
