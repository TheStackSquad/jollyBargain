//frontend/src/components/homepage/categoriesPreviewSection

import React from 'react';
import {
  AnimatedDiv,
  AnimatedH2,
  ScrollSection,
  animationVariants,
} from '../../animation/animate'; // Adjust path based on your animation file location

const CategoriesPreviewSection = ({ scrollAnimation }) => {
  const categories = [
    { name: "Electronics", icon: "📱", color: "from-blue-500 to-blue-600" },
    { name: "Fashion", icon: "👕", color: "from-pink-500 to-pink-600" },
    { name: "Home & Garden", icon: "🏠", color: "from-green-500 to-green-600" },
    { name: "Sports", icon: "⚽", color: "from-orange-500 to-orange-600" }
  ];

  return (
    <ScrollSection className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <AnimatedH2
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16"
          {...scrollAnimation}
        >
          Shop by Category
        </AnimatedH2>

        <AnimatedDiv
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={animationVariants.cardContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {categories.map((category, index) => (
            <AnimatedDiv
              key={index}
              className={`bg-gradient-to-br ${category.color} text-white p-6 rounded-2xl text-center cursor-pointer transform hover:scale-105 transition-transform duration-300`}
              variants={animationVariants.cardItem}
              {...animationVariants.cardHover}
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <div className="font-semibold text-lg">{category.name}</div>
            </AnimatedDiv>
          ))}
        </AnimatedDiv>
      </div>
    </ScrollSection>
  );
};

export default CategoriesPreviewSection;