// frontend/src/components/cartpage/EmptyCartMessage.js
import React from 'react';
import { MotionDiv, MotionButton, messageVariants, buttonTapVariants } from '../../animation/cartAnimate';
import { ChevronRight } from 'lucide-react';


const EmptyCartMessage = ({ onStartShopping, onShowMessageBox }) => {
  return (
    <MotionDiv
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center py-16 bg-gray-50 rounded-xl shadow-inner border border-dashed border-gray-200"
    >
      <p className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty!</p>
      <p className="text-lg text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
      <MotionButton
        variants={buttonTapVariants}
        whileHover="hover"
        whileTap="tap"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        onClick={() => onShowMessageBox('Navigating to Products Page!', 'This is a simulation. In a real application, you would be redirected to the products page.', onStartShopping)}
      >
        Start Shopping <ChevronRight className="ml-2 -mr-1 w-5 h-5" />
      </MotionButton>
    </MotionDiv>
  );
};

export default EmptyCartMessage;
