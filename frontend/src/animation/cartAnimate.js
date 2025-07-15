// frontend/src/components/motion/cartAnimate.js
import { motion } from "framer-motion";

// Variants for individual cart items entering/exiting
export const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      opacity: { duration: 0.2 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
};

// Variants for the overall cart container
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger items as they appear
    },
  },
};

// Variants for button presses
export const buttonTapVariants = {
  tap: { scale: 0.95 },
  hover: { scale: 1.05 },
};

// Variants for messages (e.g., empty cart, coupon success/error)
export const messageVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

// Variants for section headers or titles
export const headerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Variants for input field focus
export const inputFocusVariants = {
  focus: {
    borderColor: "#6366F1",
    boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.5)",
  },
  initial: { borderColor: "#D1D5DB", boxShadow: "none" },
};

// Variants for product recommendation cards
export const recommendationCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Export motion component directly for convenience
export const MotionDiv = motion.div;
export const MotionButton = motion.button;
export const MotionInput = motion.input;
