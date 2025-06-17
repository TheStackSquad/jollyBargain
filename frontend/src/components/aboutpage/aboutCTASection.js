//frontend/src/components/aboutpage/AboutCTASection.js

import React from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatedDiv,
  AnimatedH2,
  AnimatedP,
  AnimatedButton,
  ScrollSection,
  animationVariants,
} from '../../animation/animate'; // Adjust path

const AboutCTASection = ({ scrollAnimation }) => (
  <ScrollSection className="py-20 px-4 bg-white">
    <div className="max-w-4xl mx-auto text-center">
      <AnimatedH2
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        {...scrollAnimation}
      >
        Ready to Join the JollyBargain Family?
      </AnimatedH2>

      <AnimatedP
        className="text-xl text-gray-600 mb-8"
        {...scrollAnimation}
      >
        Start saving today and discover why hundreds of thousands of customers trust JollyBargain for their shopping needs.
      </AnimatedP>

      <AnimatedDiv className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/store"> {/* Wrapped in Link tag */}
          <AnimatedButton
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg"
            {...animationVariants.buttonHover}
          >
            Start Shopping
          </AnimatedButton>
        </Link>
        <Link to="/contact"> {/* Wrapped in Link tag, assuming a /contact page */}
          <AnimatedButton
            className="border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-full text-xl font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-300"
            {...animationVariants.buttonHover}
          >
            Contact Us
          </AnimatedButton>
        </Link>
      </AnimatedDiv>
    </div>
  </ScrollSection>
);

export default AboutCTASection;
