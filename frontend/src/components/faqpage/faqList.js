// frontend/src/components/faqpage/FAQList.js
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedP } from "../../animation/animate";

function FAQList({ searchTerm }) {
  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState(new Set());

  // FAQ data organized by categories
  const faqData = [
    {
      category: "Orders & Shopping",
      questions: [
        {
          id: 1,
          question: "How do I place an order?",
          answer: `Simply browse our products, add items to your cart, and proceed to checkout.
            You can create an account for faster future purchases or checkout as a guest.`,
        },
        {
          id: 2,
          question: "Can I modify or cancel my order?",
          answer: `You can modify or cancel your order within 1 hour of placing it.
            After this time, your order enters processing and cannot be changed.
            Contact us immediately if you need assistance.`,
        },
        {
          id: 3,
          question: "What payment methods do you accept?",
          answer: `We accept all major credit cards (Visa, MasterCard, American Express),
            PayPal, bank transfers, and mobile money payments for Nigerian customers.`,
        },
      ],
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          id: 4,
          question: "How long does shipping take?",
          answer: `Standard shipping takes 3-7 business days within Nigeria.
            Express shipping is available for 1-2 business days.
            International shipping varies by destination (7-21 business days).`,
        },
        {
          id: 5,
          question: "How much does shipping cost?",
          answer: `Shipping costs vary by weight, size, and destination.
            Standard shipping starts at ₦1,500 within Lagos.
            Free shipping is available on orders over ₦25,000.`,
        },
        {
          id: 6,
          question: "Do you ship internationally?",
          answer: `Yes, we ship to most countries worldwide.
            International shipping rates and delivery times vary by destination.
            Additional customs fees may apply.`,
        },
      ],
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          id: 7,
          question: "What is your return policy?",
          answer: `We offer a 30-day return policy for most items. Products must be unused,
            in original packaging, and in sellable condition. Some items like electronics may
            have different return periods.`,
        },
        {
          id: 8,
          question: "How do I return an item?",
          answer: `Log into your account, go to "My Orders," select the item you want to return, 
            and follow the return process. We'll provide a prepaid return label for eligible returns.`,
        },
        {
          id: 9,
          question: "When will I receive my refund?",
          answer: `Refunds are processed within 3-5 business days after we receive your returned item.
            The money will appear in your original payment method within 5-10 business days.`,
        },
      ],
    },
    {
      category: "Account & Support",
      questions: [
        {
          id: 10,
          question: "Do I need an account to shop?",
          answer: `No, you can checkout as a guest. However, creating an account
            allows you to track orders, save favorites, faster checkout,
            and access exclusive member deals.`,
        },
        {
          id: 11,
          question: "How do I track my order?",
          answer: `You'll receive a tracking number via email once your order ships.
            You can also track orders by logging into
            your account or using our order tracking page.`,
        },
        {
          id: 12,
          question: "How can I contact customer service?",
          answer: `You can reach us via email at support@jollybargain.com,
            phone at +234 (0) 123 456 7890, or through our contact form.
            We respond within 24 hours during business days.`,
        },
      ],
    },
  ];

  // Toggle expanded state for FAQ items
  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  // Filter FAQ items based on search term
  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          searchTerm === "" ||
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        {filteredFAQs.length === 0 ? (
          // No results message
          <div className="text-center py-12">
            <AnimatedP
              className="text-xl text-gray-600 font-roboto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No FAQs found matching &apos;{searchTerm}. Try different keywords
              or browse all categories.
            </AnimatedP>
          </div>
        ) : (
          // FAQ Categories and Questions
          <div className="space-y-8">
            {filteredFAQs.map((category) => (
              <div
                key={category.category}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-purple-600 text-white px-6 py-4">
                  <h2 className="text-xl font-bold font-jetbrain">
                    {category.category}
                  </h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {category.questions.map((faq) => (
                    <div
                      key={faq.id}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() => toggleExpanded(faq.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors
                        duration-200 flex justify-between items-center"
                      >
                        <span className="font-medium text-gray-800 font-roboto pr-4">
                          {faq.question}
                        </span>
                        {expandedItems.has(faq.id) ? (
                          <ChevronUp className="h-5 w-5 text-purple-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-purple-600 flex-shrink-0" />
                        )}
                      </button>

                      {expandedItems.has(faq.id) && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 font-roboto leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Still need help section */}
        <div className="mt-12 bg-purple-50 rounded-2xl p-8 text-center">
          <AnimatedP
            className="text-xl font-semibold text-purple-800 mb-2 font-jetbrain"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Still Need Help?
          </AnimatedP>
          <AnimatedP
            className="text-purple-700 mb-4 font-roboto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Can&apos;t find what you&apos;re looking for? Our customer service
            team is here to help.
          </AnimatedP>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors duration-200 font-roboto font-medium"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}

export default FAQList;
