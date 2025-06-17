//frontend/src/home

import React from 'react';
import {
  PageWrapper,
  useScrollAnimation,
} from './animation/animate'; // Keep essential animation imports

// Import your new subcomponents
import HeroSection from './components/homepage/heroSection';
import FeaturesSection from './components/homepage/featureSection';
import StatsSection from './components/homepage/statSection';
import CategoriesPreviewSection from './components/homepage/categoriesPreviewSection';
import CTASection from './components/homepage/ctaSection';

const Home = () => {
  const scrollAnimation = useScrollAnimation();

  return (
    <PageWrapper className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection scrollAnimation={scrollAnimation} />

      {/* Stats Section */}
      <StatsSection />

      {/* Categories Preview */}
      <CategoriesPreviewSection scrollAnimation={scrollAnimation} />

      {/* CTA Section */}
      <CTASection scrollAnimation={scrollAnimation} />
    </PageWrapper>
  );
};

export default Home;