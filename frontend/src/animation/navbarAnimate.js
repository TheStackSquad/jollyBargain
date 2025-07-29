// frontend/src/animation/navbarAnimate.js
import { motion } from "framer-motion";

// Define animation variants for the dropdown navbar
export const navbarAnimationVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: {
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeIn",
      when: "afterChildren",
    },
  },
};

// Variants for individual menu items within the dropdown
export const menuItemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Export motion components for convenience
export const MotionDiv = motion.div;
export const MotionUl = motion.ul;
export const MotionLi = motion.li;
export const MotionLink = motion(motion.a); // Use motion.a for Link if it's not a direct motion component
export const MotionButton = motion.button;
