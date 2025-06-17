//frontend/src/components/homepage/ctaSection

import React from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatedH2,
  AnimatedP,
  AnimatedButton,
  ScrollSection,
  animationVariants,
} from '../../animation/animate'; // Adjust path based on your animation file location

const CTASection = ({ scrollAnimation }) => (
  <ScrollSection className="py-20 px-4 bg-white">
    <div className="max-w-4xl mx-auto text-center">
      <AnimatedH2
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        {...scrollAnimation}
      >
        Ready to Start Saving?
      </AnimatedH2>

      <AnimatedP
        className="text-xl text-gray-600 mb-8"
        {...scrollAnimation}
      >
        Join thousands of smart shoppers who save money every day with jollyBargain.
      </AnimatedP>

      <Link to="/store">
        <AnimatedButton
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg"
          {...animationVariants.buttonHover}
          {...scrollAnimation}
        >
          Get Started Today
        </AnimatedButton>
      </Link>
    </div>
  </ScrollSection>
);

export default CTASection;