// frontend/src/components/cartpage/CartItem.js
import React from 'react';
import { MotionDiv, MotionButton, itemVariants, buttonTapVariants } from '../../animation/cartAnimate';
import { Trash2, Minus, Plus, Save } from 'lucide-react';

const CartItem = ({ item, onQuantityChange, onRemoveItem, onSaveForLater }) => {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col sm:flex-row items-center bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4 last:mb-0 transition-all duration-300 ease-in-out"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg mr-0 sm:mr-6 mb-4 sm:mb-0 flex-shrink-0"
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/E0E7FF/4F46E5?text=No+Image`; }}
      />
      <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
        <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
        <p className="text-gray-700 font-medium">
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center space-x-2 mr-0 sm:mr-6 mb-4 sm:mb-0">
        <MotionButton
          variants={buttonTapVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => onQuantityChange(item.id, -1)}
          className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-150 ease-in-out"
          aria-label={`Decrease quantity of ${item.name}`}
        >
          <Minus className="w-4 h-4" />
        </MotionButton>
        <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
        <MotionButton
          variants={buttonTapVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => onQuantityChange(item.id, 1)}
          className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-150 ease-in-out"
          aria-label={`Increase quantity of ${item.name}`}
        >
          <Plus className="w-4 h-4" />
        </MotionButton>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <MotionButton
          variants={buttonTapVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => onSaveForLater(item.id)}
          className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-150 ease-in-out flex items-center justify-center"
          aria-label={`Save ${item.name} for later`}
        >
          <Save className="w-5 h-5" />
        </MotionButton>
        <MotionButton
          variants={buttonTapVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => onRemoveItem(item.id)}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-150 ease-in-out flex items-center justify-center"
          aria-label={`Remove ${item.name} from cart`}
        >
          <Trash2 className="w-5 h-5" />
        </MotionButton>
      </div>
    </MotionDiv>
  );
};

export default CartItem;
