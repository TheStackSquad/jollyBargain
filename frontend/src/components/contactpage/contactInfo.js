// frontend/src/components/contactpage/ContactInfo.js
import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { AnimatedP } from "../../animation/animate";

function ContactInfo() {
  // Contact information data with types for dynamic linking
  const contactDetails = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["1234 Commerce Street", "Business District, Lagos", "Nigeria"],
      color: "text-blue-600",
      type: "address",
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+234 8167118379", "+234 8155764221"],
      color: "text-green-600",
      type: "phone",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["support@jollybargain.com", "sales@jollybargain.com"],
      color: "text-purple-600",
      type: "email",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Mon - Fri: 9:00 AM - 6:00 PM",
        "Sat: 10:00 AM - 4:00 PM",
        "Sun: Closed",
      ],
      color: "text-orange-600",
      type: "hours",
    },
  ];

  // Helper function to create appropriate links based on type
  const createContactLink = (detail, type) => {
    const baseClasses =
      "text-gray-600 text-sm font-roboto transition-colors duration-200";

    switch (type) {
      case "phone":
        return (
          <a
            href={`tel:${detail.replace(/\s/g, "")}`}
            className={`${baseClasses} hover:text-green-600 hover:underline cursor-pointer`}
            aria-label={`Call ${detail}`}
          >
            {detail}
          </a>
        );
      case "email":
        return (
          <a
            href={`mailto:${detail}`}
            className={`${baseClasses} hover:text-purple-600 hover:underline cursor-pointer`}
            aria-label={`Email ${detail}`}
          >
            {detail}
          </a>
        );
      case "address": {
        // Wrap case block content in curly braces to avoid 'no-case-declarations'
        const addressQuery = encodeURIComponent(detail);
        return (
          <a
            href={`https://maps.google.com/maps?q=${addressQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseClasses} hover:text-blue-600 hover:underline cursor-pointer`}
            aria-label={`View ${detail} on map`}
          >
            {detail}
          </a>
        );
      } // Close the curly brace for the case block
      default:
        return <p className={baseClasses}>{detail}</p>;
    }
  };

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
            Get in Touch
          </AnimatedP>
          <AnimatedP
            className="text-gray-600 max-w-2xl mx-auto font-roboto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We&apos;re always here to help. Choose the best way to reach us
            based on your needs.
          </AnimatedP>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactDetails.map((item) => {
            // Removed 'index' from here
            const IconComponent = item.icon;
            return (
              <AnimatedP
                key={`${item.title}-${item.type}`} // Using a combination of title and type for a stable key
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg
                transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                // Delay based on a new index if needed, or remove if not critical for animation
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + contactDetails.indexOf(item) * 0.1,
                }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16
                  rounded-full bg-white shadow-md mb-4 ${item.color}`}
                >
                  <IconComponent size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 font-jetbrain">
                  {item.title}
                </h3>
                <div className="space-y-1">
                  {item.details.map(
                    (
                      detail, // Removed 'detailIndex' from here
                    ) => (
                      <div key={detail}>
                        {" "}
                        {/* Using 'detail' as the key, assuming it's unique within its parent array */}
                        {createContactLink(detail, item.type)}
                      </div>
                    ),
                  )}
                </div>
              </AnimatedP>
            );
          })}
        </div>

        {/* Additional Information */}
        <AnimatedP
          className="mt-12 bg-blue-50 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-blue-800 mb-2 font-jetbrain">
            Need Immediate Help&apos;?
          </h3>
          <p className="text-blue-700 mb-4 font-roboto">
            Check out our FAQ section for quick answers to common questions, or
            browse our help center for detailed guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/faq"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg
              hover:bg-blue-700 transition-colors duration-200 font-roboto
              font-medium focus:outline-none focus:ring-2
              focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Visit FAQ page"
            >
              Visit FAQ
            </a>
            <a
              href="/help-center"
              className="inline-block px-6 py-3 bg-white text-blue-600 border-2 border-blue-600
              rounded-lg hover:bg-blue-600 hover:text-white transition-all
              duration-200 font-roboto font-medium focus:outline-none focus:ring-2
              focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Visit Help Center"
            >
              Help Center
            </a>
          </div>
        </AnimatedP>
      </div>
    </section>
  );
}

export default ContactInfo;
