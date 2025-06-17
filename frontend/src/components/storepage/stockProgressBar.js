//frontend/src/components/storepage/stockProgressBar
import React from 'react';
import { motion } from 'framer-motion';

const StockProgressBar = ({ stock, claimed, size = 'medium', showText = true, delay = 0 }) => {
  const remaining = stock - claimed;
  const percentage = (claimed / stock) * 100;
  
  const getStockStatus = () => {
    if (remaining <= 3) return { 
      text: `Only ${remaining} left!`, 
      color: 'text-red-500', 
      bgColor: 'from-red-500 to-red-600',
      urgency: 'high' 
    };
    if (percentage >= 70) return { 
      text: `${Math.round(percentage)}% claimed`, 
      color: 'text-orange-500', 
      bgColor: 'from-orange-400 to-red-500',
      urgency: 'medium' 
    };
    return { 
      text: `${remaining} available`, 
      color: 'text-green-500', 
      bgColor: 'from-green-400 to-green-500',
      urgency: 'low' 
    };
  };

  const status = getStockStatus();
  
  const sizeClasses = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3'
  };

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  const urgencyAnimation = status.urgency === 'high' ? {
    animate: { 
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8]
    },
    transition: { 
      duration: 1.5, 
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {};

  return (
    <div className="w-full">
      {showText && (
        <div className="flex justify-between items-center mb-1">
          <span className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
            Stock Status
          </span>
          <motion.span 
            className={`${textSizeClasses[size]} font-bold ${status.color}`}
            {...urgencyAnimation}
          >
            {status.text}
          </motion.span>
        </div>
      )}
      
      <div className={`bg-gray-200 rounded-full ${sizeClasses[size]} overflow-hidden`}>
        <motion.div 
          className={`bg-gradient-to-r ${status.bgColor} ${sizeClasses[size]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: 1.5, 
            delay: delay,
            ease: "easeOut" 
          }}
        />
      </div>
      
      {/* Urgency indicator for very low stock */}
      {status.urgency === 'high' && (
        <motion.div
          className="mt-1 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5 }}
        >
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
            🔥 Hurry! Almost sold out
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default StockProgressBar;