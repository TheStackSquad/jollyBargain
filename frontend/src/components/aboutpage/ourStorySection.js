// frontend/src/componenyts/aboutpage/ourStorySection.js

import React from "react";
import { Link } from "react-router-dom";
import {
  AnimatedDiv,
  AnimatedH2,
  AnimatedH3,
  AnimatedP,
  AnimatedButton,
  ScrollSection,
  animationVariants,
} from "../../animation/animate"; // Adjust path

function OurStorySection({ scrollAnimation }) {
  const { initial, whileInView, viewport } = scrollAnimation;

  return (
    <ScrollSection className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedDiv
            initial={initial}
            whileInView={whileInView}
            viewport={viewport}
          >
            {" "}
            {/* Fixed prop spreading */}
            <AnimatedH2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </AnimatedH2>
            <AnimatedP className="text-lg text-gray-700 mb-6 leading-relaxed">
              Founded in 2023, JollyBargain started with a simple idea: everyone
              deserves access to quality products at unbeatable prices. What
              began as a small team of deal-hunters has grown into a trusted
              platform serving hundreds of thousands of happy customers.
            </AnimatedP>
            <AnimatedP className="text-lg text-gray-700 mb-6 leading-relaxed">
              We believe that great deals shouldn&apos;t be hard to find.
              That&apos;s why {/* Fixed unescaped apostrophes */}
              we&apos;ve built a platform that brings together the best offers
              from {/* Fixed unescaped apostrophes */}
              trusted sellers, all in one convenient place.
            </AnimatedP>
            <Link to="/store">
              {" "}
              {/* Wrapped in Link tag */}
              <AnimatedButton
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3
                rounded-full font-semibold"
                whileHover={animationVariants.buttonHover.whileHover}
                whileTap={animationVariants.buttonHover.whileTap}
              >
                Shop Our Deals
              </AnimatedButton>
            </Link>
          </AnimatedDiv>

          <AnimatedDiv
            className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl"
            initial={initial} // Fixed prop spreading
            whileInView={whileInView} // Fixed prop spreading
            viewport={viewport} // Fixed prop spreading
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <AnimatedH3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </AnimatedH3>
              <AnimatedP className="text-gray-700 leading-relaxed">
                To democratize access to quality products by connecting smart
                shoppers with incredible deals, while maintaining the highest
                standards of security and customer service.
              </AnimatedP>
            </div>
          </AnimatedDiv>
        </div>
      </div>
    </ScrollSection>
  );
}

export default OurStorySection;
