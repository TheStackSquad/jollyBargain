import React from "react";
import { Link } from "react-router-dom";
import {
  AnimatedDiv,
  AnimatedH1,
  AnimatedP,
  AnimatedButton,
  animationVariants,
} from "../../animation/animate"; // Adjust path based on your animation file location

function HeroSection() {
  // Destructure the animation variants for explicit prop passing
  // Assuming heroTitle, heroSubtitle, heroButtons, and buttonHover are objects
  // containing properties like 'initial', 'animate', 'transition', 'whileHover', 'whileTap', etc.
  const { heroTitle, heroSubtitle, heroButtons, buttonHover } =
    animationVariants;

  return (
    <section
      // FIX: Break line to adhere to max-len
      className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedH1
          // FIX: Break line to adhere to max-len for className
          className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6
                     bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          // FIX: Explicitly pass individual props from heroTitle variant
          initial={heroTitle.initial}
          animate={heroTitle.animate}
          transition={heroTitle.transition}
          viewport={heroTitle.viewport} // Assuming viewport might be here
        >
          Amazing Deals, Every Day
        </AnimatedH1>

        <AnimatedP
          // FIX: Break line to adhere to max-len for className
          className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto"
          // FIX: Explicitly pass individual props from heroSubtitle variant
          initial={heroSubtitle.initial}
          animate={heroSubtitle.animate}
          transition={heroSubtitle.transition}
          viewport={heroSubtitle.viewport} // Assuming viewport might be here
        >
          Discover unbeatable prices on your favorite products. Save more, shop
          smarter with jollyBargain.
        </AnimatedP>

        <AnimatedDiv
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          // FIX: Explicitly pass individual props from heroButtons variant
          initial={heroButtons.initial}
          animate={heroButtons.animate}
          transition={heroButtons.transition}
          viewport={heroButtons.viewport} // Assuming viewport might be here
        >
          <Link to="/store">
            <AnimatedButton
              // FIX: Break line to adhere to max-len for className
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4
                         rounded-full text-lg font-semibold shadow-lg"
              // FIX: Explicitly pass individual props from buttonHover variant
              whileHover={buttonHover.whileHover}
              whileTap={buttonHover.whileTap} // Assuming whileTap is part of buttonHover
            >
              Shop Now
            </AnimatedButton>
          </Link>

          <Link to="/about">
            <AnimatedButton
              // FIX: Break line to adhere to max-len for className
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full
                         text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-300"
              // FIX: Explicitly pass individual props from buttonHover variant
              whileHover={buttonHover.whileHover}
              whileTap={buttonHover.whileTap} // Assuming whileTap is part of buttonHover
            >
              Learn More
            </AnimatedButton>
          </Link>
        </AnimatedDiv>
      </div>
    </section>
  );
}

export default HeroSection;
