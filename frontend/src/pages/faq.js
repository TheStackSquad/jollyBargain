// frontend/src/pages/faq.js
import React, { useState } from "react";

// Import FAQ page components
import FAQHero from "../components/faqpage/faqHero";
import FAQSearch from "../components/faqpage/faqSearch";
import FAQList from "../components/faqpage/faqList";

function FAQ() {
  // State to manage search functionality across components
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search term updates from search component
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - introduces the FAQ page */}
      <FAQHero />

      {/* Search Section - allows users to search through FAQs */}
      <FAQSearch onSearch={handleSearch} />

      {/* FAQ List Section - displays categorized questions and answers */}
      <FAQList searchTerm={searchTerm} />
    </div>
  );
}

export default FAQ;
