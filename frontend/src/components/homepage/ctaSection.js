import React from "react";
import { Link } from "react-router-dom";
import {
  AnimatedH2,
  AnimatedP,
  AnimatedButton,
  ScrollSection,
  animationVariants,
} from "../../animation/animate"; // Adjust path based on your animation file location

function CTASection({ scrollAnimation }) {
  // Destructure scrollAnimation to explicitly pass props
  const { initial, whileInView, viewport, variants } = scrollAnimation;

  return (
    <ScrollSection className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedH2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          // FIX: Explicitly pass individual props instead of spreading scrollAnimation
          initial={initial}
          whileInView={whileInView}
          viewport={viewport}
          variants={variants}
        >
          Ready to Start Saving?
        </AnimatedH2>

        <AnimatedP
          className="text-xl text-gray-600 mb-8"
          // FIX: Explicitly pass individual props instead of spreading scrollAnimation
          initial={initial}
          whileInView={whileInView}
          viewport={viewport}
          variants={variants}
        >
          Join thousands of smart shoppers who save money every day with
          jollyBargain.
        </AnimatedP>

        <Link to="/store">
          <AnimatedButton
            // FIX: Broken into multiple lines to adhere to max-len
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4
                       rounded-full text-xl font-semibold shadow-lg"
            // FIX: Explicitly pass individual props for buttonHover variants
            whileHover={animationVariants.buttonHover.whileHover}
            whileTap={animationVariants.buttonHover.whileTap} // Assuming whileTap is part of buttonHover
            // FIX: Explicitly pass individual props from scrollAnimation
            initial={initial}
            whileInView={whileInView}
            viewport={viewport}
            variants={variants}
          >
            Get Started Today
          </AnimatedButton>
        </Link>
      </div>
    </ScrollSection>
  );
}

export default CTASection;
