//frontend/src/components/homepage/statSection

import React from 'react';
import {
  AnimatedDiv,
  AnimatedCounter,
  ScrollSection,
  animationVariants,
} from '../../animation/animate'; // Adjust path based on your animation file location

const StatsSection = () => {
  const stats = [
    { number: 500, suffix: "K+", label: "Happy Customers" },
    { number: 1, suffix: "M+", label: "Products Sold" },
    { number: 50, suffix: "K+", label: "Daily Deals" },
    { number: 99.9, suffix: "%", label: "Uptime" }
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
          {stats.map((stat, index) => (
            <AnimatedDiv
              key={index}
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
};

export default StatsSection;