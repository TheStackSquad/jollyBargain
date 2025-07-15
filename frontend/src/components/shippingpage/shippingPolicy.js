// frontend/src/components/shippingpage/ShippingPolicy.js
import React from "react";
import { Shield, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { AnimatedP } from "../../animation/animate";

function ShippingPolicy() {
  // Policy sections data
  const policyData = [
    {
      icon: Shield,
      title: "Package Protection",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      points: [
        "All packages are insured up to ₦50,000 at no extra cost",
        "Premium insurance available for high-value items",
        "Signature confirmation required for orders over ₦100,000",
        "Photo proof of delivery provided for all shipments",
      ],
    },
    {
      icon: Clock,
      title: "Processing Time",
      color: "text-green-600",
      bgColor: "bg-green-50",
      points: [
        "Standard orders: 1-2 business days processing",
        "Custom/made-to-order items: 3-5 business days",
        "Orders placed before 2 PM ship same day",
        "No processing on weekends and public holidays",
      ],
    },
    {
      icon: AlertCircle,
      title: "Delivery Attempts",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      points: [
        "Up to 3 delivery attempts will be made",
        "SMS/email notifications sent before each attempt",
        "Packages held at local depot for 7 days after failed delivery",
        "Redelivery fees may apply for remote locations",
      ],
    },
    {
      icon: CheckCircle,
      title: "Special Handling",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      points: [
        "Fragile items packed with extra care and padding",
        "Electronics shipped in original manufacturer packaging",
        "Perishable items require express shipping",
        "Hazardous materials handled per safety regulations",
      ],
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
            Shipping Policies
          </AnimatedP>
          <AnimatedP
            className="text-gray-600 max-w-2xl mx-auto font-roboto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Important information about our shipping procedures, protection
            policies, and delivery standards.
          </AnimatedP>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {policyData.map((policy, index) => {
            const IconComponent = policy.icon;
            return (
              <div
                // FIX 1: Use policy.id as the key. If no ID, policy.title is a good fallback.
                key={policy.id}
                className={`${policy.bgColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center mb-4">
                  <div className={`${policy.color} mr-3`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 font-jetbrain">
                    {policy.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {policy.points.map(
                    (
                      point, // Removed 'pointIndex' from here
                    ) => (
                      <li key={point} className="flex items-start">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-roboto text-sm">
                          {point}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Terms and Conditions */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 font-jetbrain">
            Terms & Conditions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 font-jetbrain">
                Shipping Restrictions
              </h4>
              <ul className="space-y-2 text-gray-600 font-roboto">
                <li>• Some items cannot be shipped to certain locations</li>
                <li>• Hazardous materials require special handling</li>
                <li>• International shipping restrictions apply</li>
                <li>• Oversized items may incur additional fees</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 font-jetbrain">
                Delivery Responsibility
              </h4>
              <ul className="space-y-2 text-gray-600 font-roboto">
                <li>• Customer responsible for accurate delivery address</li>
                <li>• Someone must be available to receive packages</li>
                <li>
                  • Delivery to business addresses requires contact person
                </li>
                <li>• Additional charges for incorrect address changes</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2 font-jetbrain">
                  Questions About Shipping?
                </h4>
                <p className="text-gray-600 font-roboto">
                  Our customer service team is here to help with any shipping
                  questions.
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-4">
                <a
                  href="/contact"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700
                  transition-colors duration-200 font-roboto font-medium"
                >
                  Contact Support
                </a>
                <a
                  href="/faq"
                  className="px-6 py-3 bg-white text-green-600 border-2 border-green-600 rounded-lg
                  hover:bg-green-600 hover:text-white
                  transition-all duration-200 font-roboto font-medium"
                >
                  View FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShippingPolicy;
