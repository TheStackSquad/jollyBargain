//frontend/src/components/storepage/searchBar.js

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, onFilterChange, categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      searchTerm,
      category: selectedCategory,
      priceRange
    });
  };

  const handleFilterChange = (filterType, value) => {
    const filters = {
      searchTerm,
      category: selectedCategory,
      priceRange,
      [filterType]: value
    };
    
    if (filterType === 'category') {
      setSelectedCategory(value);
      filters.category = value;
    } else if (filterType === 'priceRange') {
      setPriceRange(value);
      filters.priceRange = value;
    }
    
    onFilterChange(filters);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Main Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleFilterChange('searchTerm', e.target.value);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
          
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            Filters
          </button>
        </div>

        {/* Advanced Filters */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: showFilters ? 'auto' : 0, 
            opacity: showFilters ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => handleFilterChange('priceRange', { ...priceRange, min: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => handleFilterChange('priceRange', { ...priceRange, max: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Quick Price Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Filters
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleFilterChange('priceRange', { min: '', max: '10000' })}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    Under {formatPrice(10000)}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFilterChange('priceRange', { min: '10000', max: '50000' })}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    {formatPrice(10000)} - {formatPrice(50000)}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFilterChange('priceRange', { min: '50000', max: '' })}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    Above {formatPrice(50000)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default SearchBar;