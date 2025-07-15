// frontend/src/components/aboutpage/AboutCTASection.js

import React from "react";
import { Link } from "react-router-dom";
import {
  AnimatedDiv,
  AnimatedH2,
  AnimatedP,
  AnimatedButton,
  ScrollSection,
  animationVariants,
} from "../../animation/animate"; // Adjust path

function AboutCTASection({ scrollAnimation }) {
  return (
    <ScrollSection className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedH2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          initial={scrollAnimation.initial}
          whileInView={scrollAnimation.whileInView}
          viewport={scrollAnimation.viewport}
        >
          Ready to Join the JollyBargain Family?
        </AnimatedH2>

        <AnimatedP
          className="text-xl text-gray-600 mb-8"
          initial={scrollAnimation.initial}
          whileInView={scrollAnimation.whileInView}
          viewport={scrollAnimation.viewport}
        >
          Start saving today and discover why hundreds of thousands of customers
          trust JollyBargain for their shopping needs.
        </AnimatedP>

        <AnimatedDiv className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/store">
            <AnimatedButton
              className="bg-gradient-to-r from-blue-600 to-purple-600
                         text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg"
              whileHover={animationVariants.buttonHover.whileHover}
              whileTap={animationVariants.buttonHover.whileTap}
            >
              Start Shopping
            </AnimatedButton>
          </Link>
          <Link to="/contact">
            <AnimatedButton
              className="border-2 border-blue-600 text-blue-600 px-10 py-4
                         rounded-full text-xl font-semibold hover:bg-blue-600
                         hover:text-white transition-colors duration-300"
              whileHover={animationVariants.buttonHover.whileHover}
              whileTap={animationVariants.buttonHover.whileTap}
            >
              Contact Us
            </AnimatedButton>
          </Link>
        </AnimatedDiv>
      </div>
    </ScrollSection>
  );
}

export default AboutCTASection;
