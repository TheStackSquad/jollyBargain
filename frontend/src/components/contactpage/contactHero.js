// frontend/src/components/contactpage/ContactHero.js
import React from 'react';
import { AnimatedH1, AnimatedP } from '../../animation/animate';

const ContactHero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedH1
          className="text-5xl md:text-6xl font-bold mb-6 font-jetbrain"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Contact Us
        </AnimatedH1>
        <AnimatedP
          className="text-xl md:text-2xl text-blue-100 font-roboto max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          We're here to help! Reach out to us for any questions, concerns, or feedback.
        </AnimatedP>
      </div>
    </section>
  );
};

export default ContactHero;