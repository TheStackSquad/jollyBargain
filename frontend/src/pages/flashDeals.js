// frontend/src/pages/flashDeal.js

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountdownTimer from "../components/countdown";
import SearchBar from "../components/storepage/searchBar";
// import SearchResults from '../components/storepage/searchResults';
import FeaturedDeal from "../components/storepage/featuredDeal";
import DealsGrid from "../components/storepage/dealGrid";
import { heroSection } from "../animation/flashDealAnimate";
import { apiClient } from "../services/apiClient/apiClient";

function FlashDeals() {
  const [currentDeals, setCurrentDeals] = useState([]);
  const [featuredDeal, setFeaturedDeal] = useState(null);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchFilters, setSearchFilters] = useState({
    searchTerm: "",
    category: "all",
    priceRange: { min: "", max: "" },
  });

  // Fetch flash deals from API
  const fetchDealsFromAPI = async () => {
    try {
      // console.log("Starting to fetch flash deals...");
      setIsLoading(true);

      const data = await apiClient.get("/flashDeals");
      // console.log("Flash deals data received:", data);

      setFeaturedDeal(data.featured || null);
      setCurrentDeals(data.deals || []);
      setIsLoading(false);

      // console.log("Flash deals state updated successfully");
    } catch (error) {
      // console.error("Error fetching flash deals:", error);
      setIsLoading(false);
    }
  };

  // Filter deals based on current filters
  const filterDeals = (deals, filters) =>
    deals.filter((deal) => {
      if (
        filters.searchTerm &&
        !deal.title?.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
        return false;
      if (
        filters.category !== "all" &&
        deal.category?.toLowerCase() !== filters.category.toLowerCase()
      )
        return false;
      if (
        filters.priceRange.min &&
        deal.price < parseInt(filters.priceRange.min, 10) // Added radix
      )
        return false;
      if (
        filters.priceRange.max &&
        deal.price > parseInt(filters.priceRange.max, 10) // Added radix
      )
        return false;
      return true;
    });

  // Get all unique categories
  const getAllCategories = () => {
    const categories = new Set();
    currentDeals.forEach((deal) => categories.add(deal.category));
    if (featuredDeal) categories.add(featuredDeal.category);
    return Array.from(categories);
  };

  const categories = getAllCategories();

  // Handle search/filter update
  const handleSearch = (filters) => {
    setSearchFilters((prev) => ({
      ...prev,
      ...filters,
    }));
  };

  const handleFilterChange = (filters) => {
    setSearchFilters((prev) => ({
      ...prev,
      ...filters,
    }));
  };

  // Handle claiming a deal
  // eslint-disable-next-line no-unused-vars
  const handleClaimDeal = (deal) => {
    // alert(
    //   `Claiming deal: ${deal.title} for ${new Intl.NumberFormat("en-NG", {
    //     style: "currency",
    //     currency: "NGN",
    //     minimumFractionDigits: 0,
    //   }).format(deal.price)}`,
    // );
  };

  // On timer end, reload deals
  const loadNewDeals = () => fetchDealsFromAPI();

  // Fetch on initial mount
  useEffect(() => {
    fetchDealsFromAPI();
  }, []);

  // Apply filters whenever deals or filters change
  useEffect(() => {
    const filtered = filterDeals(currentDeals, searchFilters);
    setFilteredDeals(filtered);
  }, [currentDeals, searchFilters]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700">
            Loading Flash Deals...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <motion.div
        className="text-center py-12 px-4"
        initial={heroSection.initial}
        animate={heroSection.animate}
        transition={heroSection.transition}
        // ... and any other props from heroSection
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          ⚡ <span className="text-red-500">FLASH DEALS</span> ⚡
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Incredible savings that won&apos;t last long!
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
      <FeaturedDeal deal={featuredDeal} onClaimDeal={handleClaimDeal} />

      {/* Deals Grid */}
      <DealsGrid
        deals={filteredDeals}
        onClaimDeal={handleClaimDeal}
        currentPoolIndex={0}
        title={
          searchFilters.searchTerm
            ? `Search Results (${filteredDeals.length} found)`
            : "More Amazing Deals"
        }
      />
    </div>
  );
}

export default FlashDeals;
