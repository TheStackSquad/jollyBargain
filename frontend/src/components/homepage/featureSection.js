import React from "react";
import {
  AnimatedDiv,
  AnimatedH2,
  AnimatedH3,
  AnimatedP,
  ScrollSection,
  animationVariants,
} from "../../animation/animate"; // Adjust path based on your animation file location

function FeaturesSection({ scrollAnimation }) {
  const features = [
    {
      // FIX: Add a unique 'id' if possible, otherwise 'title' can serve as a stable key here
      id: "best-prices", // Example: add an ID
      icon: "🏷️",
      title: "Best Prices",
      description:
        "We guarantee the lowest prices on all products. Find better deals elsewhere? We'll match them!",
    },
    {
      id: "fast-shipping", // Example: add an ID
      icon: "⚡",
      title: "Fast Shipping",
      description:
        "Lightning-fast delivery to your doorstep. Most orders arrive within 24-48 hours.",
    },
    {
      id: "secure-shopping", // Example: add an ID
      icon: "🛡️",
      title: "Secure Shopping",
      description:
        "Shop with confidence knowing your data is protected with bank-level security.",
    },
  ];

  // FIX: Destructure scrollAnimation to explicitly pass props
  const { initial, whileInView, viewport, variants } = scrollAnimation;

  return (
    <ScrollSection className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedH2
          // FIX: Break line to adhere to max-len
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16"
          // FIX: Explicitly pass individual props instead of spreading scrollAnimation
          initial={initial}
          whileInView={whileInView}
          viewport={viewport}
          variants={variants}
        >
          Why Choose jollyBargain?
        </AnimatedH2>

        <AnimatedDiv
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={animationVariants.cardContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature) => (
            <AnimatedDiv
              // FIX: Use a stable unique key (feature.id or feature.title)
              // We'll use feature.id if available, otherwise fallback to feature.title
              key={feature.id || feature.title}
              // FIX: Break line to adhere to max-len
              className="bg-gray-50 p-8 rounded-2xl text-center border border-gray-200
                         hover:shadow-xl transition-shadow duration-300"
              variants={animationVariants.cardItem}
              // FIX: Explicitly pass individual props for cardHover variants
              whileHover={animationVariants.cardHover.whileHover}
              whileTap={animationVariants.cardHover.whileTap} // Assuming whileTap is part of cardHover
            >
              <div className="text-6xl mb-6">{feature.icon}</div>
              <AnimatedH3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </AnimatedH3>
              <AnimatedP className="text-gray-600 leading-relaxed">
                {feature.description}
              </AnimatedP>
            </AnimatedDiv>
          ))}
        </AnimatedDiv>
      </div>
    </ScrollSection>
  );
}

export default FeaturesSection;
