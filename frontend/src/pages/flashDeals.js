//frontend/ src/pages/flashDeal.js

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountdownTimer from '../components/countdown';
import SearchBar from '../components/storepage/searchBar';
import FeaturedDeal from '../components/storepage/featuredDeal';
import DealsGrid from '../components/storepage/dealGrid';
import dealPools from '../data/flashDealData';
import { heroSection } from '../animation/flashDealAnimate';

const FlashDeals = () => {
  const [currentDeals, setCurrentDeals] = useState([]);
  const [featuredDeal, setFeaturedDeal] = useState(null);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: '',
    category: 'all',
    priceRange: { min: '', max: '' }
  });

  const [currentPoolIndex, setCurrentPoolIndex] = useState(0);
  const poolKeys = Object.keys(dealPools);

  // Extract all unique categories from deals
  const getAllCategories = () => {
    const categories = new Set();
    Object.values(dealPools).forEach(pool => {
      pool.deals.forEach(deal => categories.add(deal.category));
      if (pool.featured) categories.add(pool.featured.category);
    });
    return Array.from(categories);
  };

  const categories = getAllCategories();

  const loadNewDeals = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const nextPoolIndex = (currentPoolIndex + 1) % poolKeys.length;
      const selectedPool = dealPools[poolKeys[nextPoolIndex]];
      
      setFeaturedDeal(selectedPool.featured);
      setCurrentDeals(selectedPool.deals);
      setCurrentPoolIndex(nextPoolIndex);
      setIsLoading(false);
    }, 2000);
  };

  // Filter deals based on search criteria
  const filterDeals = (deals, filters) => {
    return deals.filter(deal => {
      // Search term filter
      if (filters.searchTerm && !deal.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (filters.category !== 'all' && deal.category.toLowerCase() !== filters.category) {
        return false;
      }
      
      // Price range filter
      if (filters.priceRange.min && deal.salePrice < parseInt(filters.priceRange.min)) {
        return false;
      }
      
      if (filters.priceRange.max && deal.salePrice > parseInt(filters.priceRange.max)) {
        return false;
      }
      
      return true;
    });
  };

  // Handle search and filter changes
  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  const handleFilterChange = (filters) => {
    setSearchFilters(filters);
  };

  // Handle deal claim
  const handleClaimDeal = (deal) => {
    // Here you would typically handle the deal claim logic
    // For now, we'll just show an alert
    alert(`Claiming deal: ${deal.name} for ${new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(deal.salePrice)}`);
  };

  // Apply filters whenever search filters or current deals change
  useEffect(() => {
    const filtered = filterDeals(currentDeals, searchFilters);
    setFilteredDeals(filtered);
  }, [currentDeals, searchFilters]);

  useEffect(() => {
    // Initialize with first pool
    const initialPool = dealPools[poolKeys[0]];
    setFeaturedDeal(initialPool.featured);
    setCurrentDeals(initialPool.deals);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading Flash Deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <motion.div 
        className="text-center py-12 px-4"
        {...heroSection}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          ⚡ <span className="text-red-500">FLASH DEALS</span> ⚡
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Incredible savings that won't last long!
        </p>
        
        <CountdownTimer onTimerEnd={loadNewDeals} />
      </motion.div>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <SearchBar 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          categories={categories}
        />
      </div>

      {/* Featured Deal */}
      <FeaturedDeal 
        deal={featuredDeal} 
        onClaimDeal={handleClaimDeal}
      />

      {/* Deals Grid */}
      <DealsGrid 
        deals={filteredDeals}
        onClaimDeal={handleClaimDeal}
        currentPoolIndex={currentPoolIndex}
        title={searchFilters.searchTerm ? `Search Results (${filteredDeals.length} found)` : "More Amazing Deals"}
      />
    </div>
  );
};

export default FlashDeals;