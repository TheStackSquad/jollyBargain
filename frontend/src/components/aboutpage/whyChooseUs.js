//frontend/src/components/aboutpage/whyChooseUs.js

import React from 'react';
import {
  AnimatedDiv,
  AnimatedH2,
  AnimatedH3,
  AnimatedP,
  ScrollSection,
  animationVariants,
} from '../../animation/animate'; // Adjust path

const WhyChooseUsSection = ({ scrollAnimation }) => {
  const features = [
    {
      icon: "💰",
      title: "Unbeatable Prices",
      description: "Our price-matching guarantee and exclusive partnerships ensure you always get the best deal. We track prices across multiple platforms to bring you savings of up to 70%."
    },
    {
      icon: "🔒",
      title: "Secure & Safe",
      description: "Your security is our priority. We use bank-level encryption, secure payment processing, and never store your sensitive information. Shop with complete peace of mind."
    },
    {
      icon: "🚚",
      title: "Lightning Fast Delivery",
      description: "With our network of fulfillment centers and trusted shipping partners, most orders reach you within 24-48 hours. Free shipping on orders over $50."
    },
    {
      icon: "⭐",
      title: "Quality Guaranteed",
      description: "Every product is carefully vetted by our quality team. We partner only with verified sellers and offer a 30-day money-back guarantee on all purchases."
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      description: "Our dedicated customer service team is here to help around the clock. Get instant support via chat, email, or phone whenever you need assistance."
    },
    {
      icon: "📱",
      title: "Easy Shopping",
      description: "Our intuitive platform makes finding and buying products effortless. Advanced search, personalized recommendations, and one-click checkout streamline your experience."
    }
  ];

  return (
    <ScrollSection className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <AnimatedH2
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16"
          {...scrollAnimation}
        >
          Why JollyBargain?
        </AnimatedH2>

        <AnimatedDiv
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={animationVariants.cardContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <AnimatedDiv
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              variants={animationVariants.cardItem}
              {...animationVariants.cardHover}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <AnimatedH3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </AnimatedH3>
              <AnimatedP className="text-gray-600 leading-relaxed">
                {feature.description}
              </AnimatedP>
            </AnimatedDiv>
          ))}
        </AnimatedDiv>
      </div>
    </ScrollSection>
  );
};

export default WhyChooseUsSection;
