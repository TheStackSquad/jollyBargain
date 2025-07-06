//frontend/src/animation/adminAnimate.js

export const pageMountAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const deleteItemAnim = {
  hidden: { opacity: 0, height: 0, padding: 0, margin: 0 },
  visible: { opacity: 1, height: "auto" },
  exit: { 
    opacity: 0, 
    height: 0,
    padding: 0,
    margin: 0,
    transition: {
      duration: 0.3
    }
  }
};