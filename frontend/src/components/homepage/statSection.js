// frontend/src/components/homepage/statSection

import React from "react";
import {
  AnimatedDiv,
  AnimatedCounter,
  ScrollSection,
  animationVariants,
} from "../../animation/animate"; // Adjust path based on your animation file location

function StatsSection() {
  const stats = [
    // FIX: Added a unique 'id' to each stat object.
    // If you were fetching this data, a backend-provided ID would be ideal.
    { id: "customers", number: 500, suffix: "K+", label: "Happy Customers" },
    { id: "products", number: 1, suffix: "M+", label: "Products Sold" },
    { id: "daily-deals", number: 50, suffix: "K+", label: "Daily Deals" },
    { id: "uptime", number: 99.9, suffix: "%", label: "Uptime" },
  ];

  return (
    <ScrollSection className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedDiv
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          variants={animationVariants.statsContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((stat) => (
            <AnimatedDiv
              // FIX: Use a unique and stable property as the key.
              // 'stat.id' is preferred if available, otherwise 'stat.label' is a good fallback
              // since these labels appear unique and static.
              key={stat.id || stat.label}
              variants={animationVariants.statsItem}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter
                  end={stat.number}
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </AnimatedDiv>
          ))}
        </AnimatedDiv>
      </div>
    </ScrollSection>
  );
}

export default StatsSection;
