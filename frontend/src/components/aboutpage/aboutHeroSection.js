// frontend/src/components/aboutpage/aboutHeroSection.js

import React from "react";
import {
  AnimatedH1,
  AnimatedP,
  animationVariants,
} from "../../animation/animate"; // Adjust path

function AboutHeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedH1
          className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6"
          initial={animationVariants.heroTitle.initial}
          animate={animationVariants.heroTitle.animate}
          transition={animationVariants.heroTitle.transition}
        >
          About{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            JollyBargain
          </span>
        </AnimatedH1>

        <AnimatedP
          className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
          initial={animationVariants.heroSubtitle.initial}
          animate={animationVariants.heroSubtitle.animate}
          transition={animationVariants.heroSubtitle.transition}
        >
          We&apos;re on a mission to make great deals accessible to everyone,
          everywhere. Discover the story behind your favorite bargain
          destination.
        </AnimatedP>
      </div>
    </section>
  );
}

export default AboutHeroSection;
