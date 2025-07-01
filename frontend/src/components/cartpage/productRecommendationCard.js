// frontend/src/components/cartpage/ProductRecommendationCard.js
import React from 'react';
import { MotionDiv, MotionButton, recommendationCardVariants, buttonTapVariants } from '../../animation/cartAnimate';
import MessageBox from '../cartpage/messageBox';

/**
 * Renders a single product recommendation card.
 * @param {object} props - The component props.
 * @param {object} props.product - The product object.
 * @param {function} props.onAddToCart - Callback to add product to cart.
 * @param {function} props.onShowMessageBox - Function to show the message box.
 */
const ProductRecommendationCard = ({ product, onAddToCart, onShowMessageBox }) => {
  return (
    <MotionDiv
      variants={recommendationCardVariants}
      className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out border border-gray-100"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x150/E0E7FF/4F46E5?text=No+Image`; }}
      />
      <div className="p-4 text-center">
        <h3 className="font-semibold text-gray-900 text-lg mb-1">{product.name}</h3>
        <p className="text-indigo-600 font-bold text-xl">${product.price.toFixed(2)}</p>
        <MotionButton
          variants={buttonTapVariants}
          whileHover="hover"
          whileTap="tap"
          className="mt-3 w-full bg-indigo-500 text-white py-2 rounded-full text-sm font-medium hover:bg-indigo-600 transition-colors duration-150 ease-in-out"
          onClick={() => onShowMessageBox(`Adding "${product.name}" to cart!`, 'This is a simulation. In a real application, the item would be added to your cart.', () => onAddToCart(product.id))}
        >
          Add to Cart
        </MotionButton>
      </div>
    </MotionDiv>
  );
};

export default ProductRecommendationCard;
