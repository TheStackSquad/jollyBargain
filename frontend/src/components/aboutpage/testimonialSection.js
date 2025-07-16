// frontend/src/components/aboutpage/TestimonialsSection.js // NOTE: Corrected the filename comment
// However, the component name is HowItWorksSection.js as per the import path and function name.
// Assuming the provided code is indeed for HowItWorksSection.js

import React from "react";
import {
  AnimatedDiv,
  AnimatedH2,
  AnimatedH3,
  AnimatedP,
  ScrollSection,
  animationVariants,
} from "../../animation/animate"; // Adjust path

function HowItWorksSection({ scrollAnimation }) {
  const steps = [
    {
      step: "1",
      title: "Browse",
      description: "Explore thousands of products across multiple categories",
      icon: "🔍",
    },
    {
      step: "2",
      title: "Compare",
      description: "See real-time prices and read authentic reviews",
      icon: "⚖️",
    },
    {
      step: "3",
      title: "Purchase",
      description: "Secure checkout with multiple payment options",
      icon: "💳",
    },
    {
      step: "4",
      title: "Enjoy",
      description: "Fast delivery straight to your doorstep",
      icon: "📦",
    },
  ];

  return (
    <ScrollSection className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedH2
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16"
          // Explicitly passing props from scrollAnimation
          initial={scrollAnimation.initial}
          whileInView={scrollAnimation.whileInView}
          viewport={scrollAnimation.viewport}
        >
          How It Works
        </AnimatedH2>

        <AnimatedDiv
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={animationVariants.cardContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map(
            (
              step, // Removed 'index' as it's no longer needed for the key
            ) => (
              <AnimatedDiv
                key={step.step} // Using 'step.step' as a unique key
                className="text-center"
                variants={animationVariants.cardItem}
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <AnimatedH3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </AnimatedH3>
                <AnimatedP className="text-gray-600">
                  {step.description}
                </AnimatedP>
              </AnimatedDiv>
            ),
          )}
        </AnimatedDiv>
      </div>
    </ScrollSection>
  );
}

export default HowItWorksSection;
