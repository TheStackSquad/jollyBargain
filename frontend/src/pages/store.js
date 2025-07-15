// frontend/src/pages/shopMore.js
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, staggerContainer, slideIn } from "../animation/animate";

// Components
import ShopHeader from "../components/storepage/shopHeader";
import ShopFilters from "../components/storepage/shopFilters";
import ShopToolbar from "../components/storepage/shopToolbar";
import ProductGrid from "../components/storepage/productGrid";
import EmptyState from "../components/storepage/emptyState";
import LoadMoreButton from "../components/storepage/loadMoreButton";

// Hooks
import { useProducts } from "../utils/hooks/useProduct";
import { useFilters } from "../utils/hooks/useFilters";
import { useCart } from "../utils/hooks/useCart";
import { useWishlist } from "../utils/hooks/useWishlist";

function ShopNowPage() {
  // State management
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Custom hooks
  const {
    products,
    filteredProducts,
    totalProducts,
    loadProducts,
    loadMoreProducts,
  } = useProducts();
  const { filters, updateFilter, resetFilters } = useFilters();
  const { cart, addToCart, removeFromCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await loadProducts({ page: 1, limit: 12 });
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error("Error loading products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [loadProducts]);

  // Apply filters when they change
  useEffect(() => {
    const applyFilters = async () => {
      try {
        setIsLoading(true);
        await loadProducts({
          page: 1,
          limit: 12,
          filters,
        });
        setCurrentPage(1);
      } catch (err) {
        setError("Failed to apply filters. Please try again.");
        console.error("Error applying filters:", err);
      } finally {
        setIsLoading(false);
      }
    };

    applyFilters();
  }, [filters, loadProducts]);

  // Handle load more
  const handleLoadMore = useCallback(async () => {
    try {
      const nextPage = currentPage + 1;
      await loadMoreProducts({
        page: nextPage,
        limit: 12,
        filters,
      });
      setCurrentPage(nextPage);
    } catch (err) {
      setError("Failed to load more products. Please try again.");
      console.error("Error loading more products:", err);
    }
  }, [currentPage, loadMoreProducts, filters]);

  // Handle add to cart with feedback
  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product);
      console.log(`Added ${product.name} to cart`);
    },
    [addToCart],
  );

  // Handle remove from cart
  const handleRemoveFromCart = useCallback(
    (productId) => {
      removeFromCart(productId);
      console.log(`Removed product with ID: ${productId} from cart`);
    },
    [removeFromCart],
  );

  // Handle wishlist toggle
  const handleWishlistToggle = useCallback(
    (productId) => {
      toggleWishlist(productId);
    },
    [toggleWishlist],
  );

  if (isLoading && filteredProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-16 w-16 border-4 border-indigo-500 border-t-transparent rounded-full"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg font-medium text-gray-700"
          >
            Loading our finest products...
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-2 text-sm text-gray-500"
          >
            Just a moment while we prepare your shopping experience
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <ShopHeader
        searchQuery={filters.searchQuery}
        onSearchChange={(query) => updateFilter("searchQuery", query)}
        cartCount={cart.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar with enhanced animation */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="hidden lg:block"
              >
                <ShopFilters
                  filters={filters}
                  onFilterChange={updateFilter}
                  showFilters={showFilters}
                  onHideFilters={() => setShowFilters(false)}
                  products={products}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <div className="flex-1">
            <motion.div
              variants={fadeIn("up", "tween", 0.1, 0.5)}
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
            >
              <ShopToolbar
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                sortBy={filters.sortBy}
                onSortChange={(sortBy) => updateFilter("sortBy", sortBy)}
                productsCount={filteredProducts ? filteredProducts.length : 0}
                totalProducts={totalProducts}
                onShowFilters={() => setShowFilters(true)}
              />
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6 shadow-sm"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                    <div className="mt-2">
                      <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {filteredProducts && filteredProducts.length > 0 ? (
              <>
                <motion.div
                  variants={fadeIn("up", "tween", 0.2, 0.75)}
                  className="mb-8"
                >
                  <ProductGrid
                    products={filteredProducts}
                    viewMode={viewMode}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
                    onToggleWishlist={handleWishlistToggle}
                    wishlist={wishlist}
                    cart={cart}
                    isLoading={isLoading}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <LoadMoreButton
                    onLoadMore={handleLoadMore}
                    hasMore={filteredProducts.length < totalProducts}
                    isLoading={isLoading}
                  />
                </motion.div>
              </>
            ) : (
              <motion.div
                variants={slideIn("up", "tween", 0.2, 0.75)}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <EmptyState
                  onClearFilters={resetFilters}
                  hasFilters={Object.values(filters).some(
                    (value) =>
                      value &&
                      value !== "all" &&
                      value !== "" &&
                      (Array.isArray(value) ? value.length > 0 : true),
                  )}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ShopNowPage;
