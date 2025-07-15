// frontend/src/components/faqpage/FAQHero.js
import React from "react";
import { AnimatedH1, AnimatedP } from "../../animation/animate";

function FAQHero() {
  return (
    <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedH1
          className="text-5xl md:text-6xl font-bold mb-6 font-jetbrain"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Frequently Asked Questions
        </AnimatedH1>
        <AnimatedP
          className="text-xl md:text-2xl text-purple-100 font-roboto max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Find quick answers to common questions about shopping, shipping,
          returns, and more.
        </AnimatedP>
      </div>
    </section>
  );
}

export default FAQHero;
