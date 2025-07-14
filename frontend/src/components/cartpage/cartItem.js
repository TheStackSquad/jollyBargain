// frontend/src/components/cartpage/CartItem.js
import React from 'react';
import { MotionDiv, MotionButton, itemVariants, buttonTapVariants } from '../../animation/cartAnimate';
import { Trash2, Minus, Plus, Save } from 'lucide-react';

const CartItem = ({ item, onQuantityChange, onRemoveItem, onSaveForLater }) => {
  // Destructure properties directly from the 'item' prop
  // CHANGE: 'imageUrls' should be 'images' based on your provided data structure
  const { _id, title, price, quantity, images } = item;

  // Determine the main image URL with a fallback
  // CHANGE: Access the 'url' property from the first object in the 'images' array
  const mainImageUrl = images && images.length > 0 && images[0].url
    ? images[0].url // Use the 'url' property of the first image object
    : `https://placehold.co/100x100/E0E7FF/4F46E5?text=No+Image`;

  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col sm:flex-row items-center bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4 last:mb-0 transition-all duration-300 ease-in-out"
    >
      <img
        src={mainImageUrl} // Use the derived mainImageUrl
        alt={title} // Use title for alt text
        className="w-24 h-24 object-cover rounded-lg mr-0 sm:mr-6 mb-4 sm:mb-0 flex-shrink-0"
        // The onError handler here is less critical now that mainImageUrl has a fallback,
        // but it can still catch network issues for the provided URL.
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/E0E7FF/4F46E5?text=Error`; }}
      />
      <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">Price: ${price.toFixed(2)}</p>
        <p className="text-gray-700 font-medium">
          Subtotal: ${(price * quantity).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center space-x-2 mr-0 sm:mr-6 mb-4 sm:mb-0">
        <MotionButton
          variants={buttonTapVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => onQuantityChange(_id, -1)}
          className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-150 ease-in-out"
          aria-label={`Decrease quantity of ${title}`}
        >
          <Minus className="w-4 h-4" />
        </MotionButton>
        <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
        <MotionButton
          variants={buttonTapVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => onQuantityChange(_id, 1)}
          className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-150 ease-in-out"
          aria-label={`Increase quantity of ${title}`}
        >
          <Plus className="w-4 h-4" />
        </MotionButton>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <MotionButton
          variants={buttonTapVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => onSaveForLater(_id)}
          className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-150 ease-in-out flex items-center justify-center"
          aria-label={`Save ${title} for later`}
        >
          <Save className="w-5 h-5" />
        </MotionButton>
        <MotionButton
          variants={buttonTapVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => onRemoveItem(_id)}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-150 ease-in-out flex items-center justify-center"
          aria-label={`Remove ${title} from cart`}
        >
          <Trash2 className="w-5 h-5" />
        </MotionButton>
      </div>
    </MotionDiv>
  );
};

export default CartItem;