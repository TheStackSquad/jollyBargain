//frontend/src/components/homepage/heroSection
import React from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatedDiv,
  AnimatedH1,
  AnimatedP,
  AnimatedButton,
  animationVariants,
} from '../../animation/animate'; // Adjust path based on your animation file location

const HeroSection = () => (
  <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <AnimatedH1
        className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        {...animationVariants.heroTitle}
      >
        Amazing Deals, Every Day
      </AnimatedH1>

      <AnimatedP
        className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto"
        {...animationVariants.heroSubtitle}
      >
        Discover unbeatable prices on your favorite products. Save more, shop smarter with jollyBargain.
      </AnimatedP>

      <AnimatedDiv
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        {...animationVariants.heroButtons}
      >
        <Link to="/store">
          <AnimatedButton
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
            {...animationVariants.buttonHover}
          >
            Shop Now
          </AnimatedButton>
        </Link>

        <Link to="/about">
          <AnimatedButton
            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-300"
            {...animationVariants.buttonHover}
          >
            Learn More
          </AnimatedButton>
        </Link>
      </AnimatedDiv>
    </div>
  </section>
);

export default HeroSection;