// frontend/src/components/shippingpage/ShippingOptions.js
import React from "react";
import { Truck, Zap, Globe, Gift } from "lucide-react";
import { AnimatedP } from "../../animation/animate";

function ShippingOptions() {
  // Shipping options data
  const shippingOptions = [
    {
      icon: Truck,
      title: "Standard Shipping",
      duration: "3-7 Business Days",
      cost: "From ₦1,500",
      description:
        "Our most popular shipping option. Reliable and cost-effective for everyday orders.",
      features: [
        "Order tracking included",
        "Delivery Monday-Saturday",
        "Insurance up to ₦50,000",
      ],
      color: "bg-blue-500",
    },
    {
      icon: Zap,
      title: "Express Shipping",
      duration: "1-2 Business Days",
      cost: "From ₦3,500",
      description:
        "Fast delivery for urgent orders. Perfect when you need items quickly.",
      features: [
        "Priority processing",
        "Same-day dispatch",
        "SMS & email updates",
      ],
      color: "bg-orange-500",
    },
    {
      icon: Gift,
      title: "Free Shipping",
      duration: "5-10 Business Days",
      cost: "Free on ₦25,000+",
      description:
        "Enjoy free shipping on qualifying orders. No rush, great savings.",
      features: [
        "No minimum weight",
        "Same tracking features",
        "Perfect for bulk orders",
      ],
      color: "bg-green-500",
    },
    {
      icon: Globe,
      title: "International Shipping",
      duration: "7-21 Business Days",
      cost: "Varies by destination",
      description:
        "Worldwide delivery to over 150 countries. Bringing JollyBargain global.",
      features: [
        "Customs handling included",
        "International tracking",
        "Duty calculator available",
      ],
      color: "bg-purple-500",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <AnimatedP
            className="text-3xl font-bold text-gray-800 mb-4 font-jetbrain"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Choose Your Shipping Method
          </AnimatedP>
          <AnimatedP
            className="text-gray-600 max-w-2xl mx-auto font-roboto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Select the shipping option that best fits your timeline and budget.
            All options include full tracking and insurance.
          </AnimatedP>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shippingOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                // FIX: Use a stable unique key (e.g., option.title or a hypothetical option.id)
                key={option.title} // Assuming title is unique for each shipping option
                // FIX: Break line to adhere to max-len
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300
                 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`${option.color} p-3 rounded-xl text-white flex-shrink-0`}
                  >
                    <IconComponent size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800 font-jetbrain">
                        {option.title}
                      </h3>
                      <span className="text-lg font-semibold text-green-600 font-roboto">
                        {option.cost}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium mb-3 font-roboto">
                      {option.duration}
                    </p>
                    <p className="text-gray-600 mb-4 font-roboto">
                      {option.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2">
                      {option.features.map((feature) => (
                        <li
                          // FIX 3: Use the feature string itself as key if it's unique
                          // and the order of features within an option is static.
                          key={feature}
                          className="flex items-center text-sm text-gray-600 font-roboto"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ShippingOptions;
