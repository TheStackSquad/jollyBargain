// frontend/ src/ components/ orderPortal/ orderItemList.js
import React from "react";
import { ShoppingCart } from "lucide-react";
import { MotionDiv } from "../../../animation/cartAnimate";

function OrderItemsList({ cartItems, formatCurrency }) {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <div
          className="w-10 h-10 bg-purple-500 rounded-full flex
          items-center justify-center mr-3"
        >
          <ShoppingCart className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Order Items</h3>
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <MotionDiv
              key={item._id || index} // Use index as fallback key if _id is missing
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }} // Reduced stagger delay slightly
              className="flex justify-between items-center bg-white p-4 rounded-xl
              shadow-sm border border-gray-100"
            >
              <div className="flex items-center">
                {item.imageUrl && ( // Conditionally render image if available
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-md mr-3"
                  />
                )}
                <div className={!item.imageUrl ? "flex items-center" : ""}>
                  {/* Adjust if no image */}
                  {!item.imageUrl && (
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3" />
                  )}{" "}
                  {/* Small dot if no image */}
                  <div>
                    <span className="font-medium text-gray-900">
                      {item.title}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      x{item.quantity}
                    </span>
                  </div>
                </div>
              </div>
              <span className="font-semibold text-gray-900">
                {formatCurrency((item.price || 0) * (item.quantity || 0))}
              </span>
            </MotionDiv>
          ))
        ) : (
          <div className="text-center py-8">
            <div
              className="w-16 h-16 bg-gray-200 rounded-full flex
            items-center justify-center mx-auto mb-4"
            >
              <ShoppingCart className="w-8 h-8 text-gray-400" />{" "}
              {/* Changed to ShoppingCart icon */}
            </div>
            <p className="text-gray-600">
              No items in cart. Please add items to proceed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderItemsList;
