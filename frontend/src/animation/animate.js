// frontend/src/animation/animate.js
import React from "react";
import { motion } from "framer-motion";

// Animation variants for different use cases
export const animationVariants = {
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: "easeOut" },
  },

  // Hero section animations
  heroTitle: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  },

  heroSubtitle: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
  },

  heroButtons: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.4, ease: "easeOut" },
  },

  // Card animations
  cardContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  },

  cardItem: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
  },

  // Slide animations
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  },

  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
  },

  // Header animations
  headerSlide: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },

  // Footer animations
  footerSlide: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.4, duration: 0.5, ease: "easeOut" },
  },

  // Stats counter animation
  statsContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  statsItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },

  // Hover animations
  buttonHover: {
    whileHover: {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2 },
    },
    whileTap: { scale: 0.95 },
  },

  cardHover: {
    whileHover: {
      y: -10,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  },
};

// Custom hook for scroll-triggered animations
export const useScrollAnimation = () => ({
  initial: { opacity: 0, y: 50 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  viewport: { once: true, amount: 0.3 },
});

// Pre-configured animated components - these are already named exports
export const AnimatedDiv = motion.div;
export const AnimatedH1 = motion.h1;
export const AnimatedH2 = motion.h2;
export const AnimatedH3 = motion.h3;
export const AnimatedP = motion.p;
export const AnimatedButton = motion.button;
export const AnimatedSection = motion.section;
export const AnimatedNav = motion.nav;
export const AnimatedHeader = motion.header;
export const AnimatedFooter = motion.footer;

// Counter animation component
export function AnimatedCounter({ end, duration = 2, suffix = "" }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {count.toLocaleString()}
      {suffix}
    </motion.span>
  );
}

// Page wrapper with consistent animations
export function PageWrapper({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={animationVariants.pageTransition.initial}
      animate={animationVariants.pageTransition.animate}
      exit={animationVariants.pageTransition.exit}
      transition={animationVariants.pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}

// Section wrapper for scroll animations
export function ScrollSection({ children, className = "", delay = 0 }) {
  const scrollAnimation = useScrollAnimation();

  return (
    <motion.section
      className={className}
      initial={scrollAnimation.initial}
      whileInView={scrollAnimation.whileInView}
      viewport={scrollAnimation.viewport}
      transition={{
        ...scrollAnimation.whileInView.transition,
        delay,
      }}
    >
      {children}
    </motion.section>
  );
}

export const fadeIn = (direction, type, delay, duration) => {
  let x = 0;
  let y = 0;

  if (direction === "left") {
    x = 100;
  } else if (direction === "right") {
    x = -100;
  } else if (direction === "up") {
    y = 100;
  } else if (direction === "down") {
    y = -100;
  }

  return {
    hidden: {
      x,
      y,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

export const slideIn = (direction, type, delay, duration) => {
  let x = 0;
  let y = 0;

  if (direction === "left") {
    x = "-100%";
  } else if (direction === "right") {
    x = "100%";
  } else if (direction === "up") {
    y = "100%";
  } else if (direction === "down") {
    y = "-100%";
  }

  return {
    hidden: {
      x,
      y,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

export const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren: delayChildren || 0,
    },
  },
});
