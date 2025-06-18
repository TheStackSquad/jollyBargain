// frontend/src/components/faqpage/FAQSearch.js
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { AnimatedP } from '../../animation/animate';

const FAQSearch = ({ onSearch }) => {
  // Search state management
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass search term to parent component
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <AnimatedP
            className="text-2xl font-bold text-gray-800 mb-2 font-jetbrain"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            Quick Search
          </AnimatedP>
          <AnimatedP
            className="text-gray-600 font-roboto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Type keywords to find specific answers
          </AnimatedP>
        </div>

        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for answers... (e.g., shipping, returns, payment)"
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm font-roboto"
          />
        </div>

        {/* Search Tips */}
        {searchTerm === '' && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 font-roboto">
              Popular searches: <span className="font-medium">shipping times</span>, <span className="font-medium">return policy</span>, <span className="font-medium">payment methods</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSearch;