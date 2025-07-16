// frontend/src/components/dashboardpage/OrderHistory.js

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../animation/animate"; // Your animation exports

function OrderHistory() {
  // Simulated Order Data
  const orders = [
    {
      id: "ORD12345",
      date: "2023-10-26",
      total: 125.0,
      status: "Delivered",
      items: [
        { name: "Wireless Headphones", qty: 1, price: 75.0 },
        { name: "USB-C Cable (2m)", qty: 2, price: 25.0 },
      ],
      shippingAddress: "123 Main St, Anytown, USA",
      billingAddress: "123 Main St, Anytown, USA",
      paymentMethod: "Credit Card (**** 1234)",
    },
    {
      id: "ORD12344",
      date: "2023-09-15",
      total: 49.99,
      status: "Shipped",
      items: [{ name: "Ergonomic Mouse", qty: 1, price: 49.99 }],
      shippingAddress: "456 Oak Ave, Somewhere, USA",
      billingAddress: "456 Oak Ave, Somewhere, USA",
      paymentMethod: "PayPal",
    },
    {
      id: "ORD12343",
      date: "2023-08-01",
      total: 299.99,
      status: "Processing",
      items: [
        { name: "Mechanical Keyboard", qty: 1, price: 150.0 },
        { name: "Gaming Monitor", qty: 1, price: 149.99 },
      ],
      shippingAddress: "789 Pine Ln, Nowhere, USA",
      billingAddress: "789 Pine Ln, Nowhere, USA",
      paymentMethod: "Credit Card (**** 5678)",
    },
  ];

  // Helper function to get status-specific classes
  const getStatusClasses = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      variants={fadeIn("up", "tween", 0.1, 0.6)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="space-y-6"
    >
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        <motion.div variants={staggerContainer(0.1, 0.2)}>
          {orders.map((order, index) => (
            <motion.div
              key={order.id} // Using order.id as the key, which is unique
              variants={fadeIn("up", "spring", index * 0.1, 0.7)}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-4 last:mb-0"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Order #{order.id}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600 mb-2">Date: {order.date}</p>
              <p className="text-gray-600 mb-2">
                Total: ${order.total.toFixed(2)}
              </p>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Items:
                </h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {order.items.map(
                    (
                      item, // Removed itemIndex from map arguments
                    ) => (
                      <li key={item.name}>
                        {" "}
                        {/* Using item.name as key */}
                        {item.name} (x{item.qty}) - ${item.price.toFixed(2)}{" "}
                        each
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button" // Added explicit type
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-colors duration-200 ease-in-out text-sm"
                >
                  Track Order
                </button>
                <button
                  type="button" // Added explicit type
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg shadow hover:bg-gray-300 transition-colors duration-200 ease-in-out text-sm"
                >
                  View Invoice
                </button>
                <button
                  type="button" // Added explicit type
                  className="bg-purple-500 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-600 transition-colors duration-200 ease-in-out text-sm"
                >
                  Reorder
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default OrderHistory;
