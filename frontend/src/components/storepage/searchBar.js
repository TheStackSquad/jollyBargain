// frontend/src/components/storepage/searchBar.js
import React, { useState, useCallback, useMemo } from "react";
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
  const debouncedOnSearch = useMemo(
    () => debounce((filters) => onSearch(filters), 500),
    [onSearch], // onSearch is a dependency for creating the debounced function
  );

  const debouncedSearch = useCallback(
    (filters) => {
      debouncedOnSearch(filters);
    },
    [debouncedOnSearch], // The debounced function is the dependency
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
    {
      id: "under-10k",
      label: `Under ${formatPrice(10000)}`,
      min: "",
      max: "10000",
    },
    {
      id: "10k-50k",
      label: `${formatPrice(10000)} - ${formatPrice(50000)}`,
      min: "10000",
      max: "50000",
    },
    {
      id: "50k-100k",
      label: `${formatPrice(50000)} - ${formatPrice(100000)}`,
      min: "50000",
      max: "100000",
    },
    {
      id: "above-100k",
      label: `Above ${formatPrice(100000)}`,
      min: "100000",
      max: "",
    },
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
            {/* Quick Price Filters */}
            <p className="block text-sm font-medium text-gray-700 mb-2">
              Quick Price Filters
            </p>{" "}
            {/* Changed from <label> to <p> */}
            <div className="grid grid-cols-2 gap-2">
              {quickPriceFilters.map((filter) => (
                <button
                  key={filter.id} // Use the unique 'id' from your filter object
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
        </motion.div>
      </form>
    </div>
  );
}

export default SearchBar;
