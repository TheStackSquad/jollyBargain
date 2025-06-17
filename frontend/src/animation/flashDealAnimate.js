// src/animations/flashDealAnimate.js
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const dealCardHover = {
  whileHover: {
    scale: 1.03,
    y: -5,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  whileTap: {
    scale: 0.98
  }
};

export const progressBarFill = {
  initial: { width: 0 },
  animate: { width: "100%" },
  transition: {
    duration: 1.5,
    ease: "easeOut",
    delay: 0.5
  }
};

export const urgencyBadge = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const staggerContainer = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const timerFlip = {
  animate: {
    rotateX: [0, -90, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
};

export const dealRefresh = {
  initial: { opacity: 1, scale: 1 },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.3 }
  },
  enter: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, delay: 0.2 }
  }
};

export const loadingSpinner = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const heroSection = {
  initial: { opacity: 0, y: -30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const priceStrike = {
  initial: { width: 0 },
  animate: { 
    width: "100%",
    transition: {
      duration: 0.8,
      delay: 0.5,
      ease: "easeOut"
    }
  }
};