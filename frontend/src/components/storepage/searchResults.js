// frontend/src/components/storepage/searchResults.js
import React from "react";
import { motion } from "framer-motion";
import DealCard from "./dealCard";

function SearchResults({
  products = [],
  isLoading = false,
  pagination = {},
  searchQuery = {},
  onClaimDeal,
  onPageChange,
  onSortChange,
}) {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);

  const sortOptions = [
    { value: "createdAt-desc", label: "Newest First" },
    { value: "createdAt-asc", label: "Oldest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "title-asc", label: "Name: A to Z" },
    { value: "title-desc", label: "Name: Z to A" },
  ];

  const handleSortChange = (sortValue) => {
    const [sortBy, sortOrder] = sortValue.split("-");
    onSortChange({ sortBy, sortOrder });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Searching products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Results Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Search Results
            </h2>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              {searchQuery.searchTerm && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  &ldquo;{searchQuery.searchTerm}
                </span>
              )}
              {searchQuery.category && searchQuery.category !== "all" && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  Category: {searchQuery.category}
                </span>
              )}
              {(searchQuery.minPrice || searchQuery.maxPrice) && (
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  Price:{" "}
                  {searchQuery.minPrice
                    ? formatPrice(searchQuery.minPrice)
                    : "0"}{" "}
                  -{" "}
                  {searchQuery.maxPrice
                    ? formatPrice(searchQuery.maxPrice)
                    : "∞"}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {pagination.totalCount || 0} products found
            </span>

            <select
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              defaultValue="createdAt-desc"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0120 12a8 8 0 11-16 0 8 8 0 016 7.291z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600">
            `Try adjusting your search terms or filters to find what you&apos;re
            looking for.`
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DealCard
                deal={product}
                onClaimDeal={onClaimDeal}
                index={index}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
              {Math.min(
                pagination.currentPage * pagination.limit,
                pagination.totalCount,
              )}{" "}
              of {pagination.totalCount} products
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>

              {/* Page numbers */}
              <div className="flex gap-1">
                {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                  const pageNum = Math.max(1, pagination.currentPage - 2) + i;
                  if (pageNum > pagination.totalPages) return null;

                  return (
                    <button
                      type="button"
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`px-3 py-2 rounded-lg ${
                        pageNum === pagination.currentPage
                          ? "bg-blue-500 text-white"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
