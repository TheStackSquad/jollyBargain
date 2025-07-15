// frontend/src/components/storepage/searchBar.js
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { debounce } from "lodash";

function SearchBar({
  onSearch,
  onFilterChange,
  categories = [],
  isLoading = false,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search function to avoid too many API calls
  const debouncedSearch = useCallback(
    debounce((filters) => {
      onSearch(filters);
    }, 500),
    [onSearch],
  );

  // Handle immediate filter changes
  const handleFilterChange = (filterType, value) => {
    const filters = {
      searchTerm,
      category: selectedCategory,
      priceRange,
      [filterType]: value,
    };

    if (filterType === "category") {
      setSelectedCategory(value);
      filters.category = value;
    } else if (filterType === "priceRange") {
      setPriceRange(value);
      filters.priceRange = value;
    } else if (filterType === "searchTerm") {
      setSearchTerm(value);
      filters.searchTerm = value;
    }

    // Call onFilterChange immediately for UI updates
    onFilterChange(filters);

    // Debounced search for API calls
    debouncedSearch(filters);
  };

  // Handle form submission (immediate search)
  const handleSearch = (e) => {
    e.preventDefault();
    const filters = {
      searchTerm,
      category: selectedCategory,
      priceRange,
    };
    onSearch(filters);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange({ min: "", max: "" });
    const filters = {
      searchTerm: "",
      category: "all",
      priceRange: { min: "", max: "" },
    };
    onFilterChange(filters);
    onSearch(filters);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);

  const quickPriceFilters = [
    { label: `Under ${formatPrice(10000)}`, min: "", max: "10000" },
    {
      label: `${formatPrice(10000)} - ${formatPrice(50000)}`,
      min: "10000",
      max: "50000",
    },
    {
      label: `${formatPrice(50000)} - ${formatPrice(100000)}`,
      min: "50000",
      max: "100000",
    },
    { label: `Above ${formatPrice(100000)}`, min: "100000", max: "" },
  ];

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
              onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
              ) : (
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </div>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => handleFilterChange("category", e.target.value)}
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
            className={`px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
              showFilters
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              />
            </svg>
            Filters
          </button>

          {/* Clear Filters Button */}
          {(searchTerm ||
            selectedCategory !== "all" ||
            priceRange.min ||
            priceRange.max) && (
            <button
              type="button"
              onClick={clearFilters}
              className="px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Clear
            </button>
          )}
        </div>

        {/* Advanced Filters */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showFilters ? "auto" : 0,
            opacity: showFilters ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    onChange={(e) =>
                      handleFilterChange("priceRange", {
                        ...priceRange,
                        min: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) =>
                      handleFilterChange("priceRange", {
                        ...priceRange,
                        max: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Quick Price Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Price Filters
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {quickPriceFilters.map((filter, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        handleFilterChange("priceRange", {
                          min: filter.min,
                          max: filter.max,
                        })
                      }
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        priceRange.min === filter.min &&
                        priceRange.max === filter.max
                          ? "bg-blue-500 text-white"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Searching...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Search Products
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
}

export default SearchBar;
