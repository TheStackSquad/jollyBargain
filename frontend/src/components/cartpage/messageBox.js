// frontend/src/components/cartpage/MessageBox.js
import React from 'react';
import { MotionDiv, MotionButton, buttonTapVariants } from '../../animation/cartAnimate';

const MessageBox = ({ title, message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <MotionDiv
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm mx-auto"
      >
        <p className="text-2xl font-bold text-gray-800 mb-4">{title}</p>
        <p className="text-gray-600 mb-6">{message}</p>
        <MotionButton
          variants={buttonTapVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onClose}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Got It!
        </MotionButton>
      </MotionDiv>
    </div>
  );
};

export default MessageBox;
