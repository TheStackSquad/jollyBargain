//frontend/src/pages/About.js

import React from 'react';
import {
  PageWrapper,
  useScrollAnimation,
} from '../animation/animate'; // Keep essential animation imports

// Import your new subcomponents for the About page
import AboutHeroSection from '../components/aboutpage/aboutHeroSection';
import OurStorySection from '../components/aboutpage/ourStorySection';
import WhyChooseUsSection from '../components/aboutpage/whyChooseUs';
import HowItWorksSection from '../components/aboutpage/howItWorksSection';
import AboutStatsSection from '../components/aboutpage/aboutStatSection';
import TestimonialsSection from '../components/aboutpage/testimonialSection';
import AboutCTASection from '../components/aboutpage/aboutCTASection';

const About = () => {
  const scrollAnimation = useScrollAnimation();

  return (
    <PageWrapper className="min-h-screen">
      {/* Hero Section */}
      <AboutHeroSection />

      {/* Our Story Section */}
      <OurStorySection scrollAnimation={scrollAnimation} />

      {/* Why Choose Us - Detailed */}
      <WhyChooseUsSection scrollAnimation={scrollAnimation} />

      {/* How It Works */}
      <HowItWorksSection scrollAnimation={scrollAnimation} />

      {/* Stats Section */}
      <AboutStatsSection scrollAnimation={scrollAnimation} />

      {/* Testimonials */}
      <TestimonialsSection scrollAnimation={scrollAnimation} />

      {/* CTA Section */}
      <AboutCTASection scrollAnimation={scrollAnimation} />
    </PageWrapper>
  );
};

export default About;
