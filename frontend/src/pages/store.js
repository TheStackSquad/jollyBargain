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
  const [isMobile, setIsMobile] = useState(false);

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

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Auto-hide filters on mobile when screen size changes
      if (mobile && showFilters) {
        setShowFilters(false);
      }
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showFilters]);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await loadProducts({ page: 1, limit: 12 });
      } catch (err) {
        setError("Failed to load products. Please try again.");
        // console.error("Error loading products:", err);
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
        //    console.error("Error applying filters:", err);
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
      //  console.error("Error loading more products:", err);
    }
  }, [currentPage, loadMoreProducts, filters]);

  // Handle add to cart with feedback
  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product);
      //    console.log(`Added ${product.name} to cart`);
    },
    [addToCart],
  );

  // Handle remove from cart
  const handleRemoveFromCart = useCallback(
    (productId) => {
      removeFromCart(productId);
      //      console.log(`Removed product with ID: ${productId} from cart`);
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

  // Handle filter toggle for mobile
  const handleFilterToggle = useCallback(() => {
    setShowFilters(!showFilters);
  }, [showFilters]);

  // Close filters when clicking outside (mobile)
  const handleOverlayClick = useCallback(() => {
    if (isMobile) {
      setShowFilters(false);
    }
  }, [isMobile]);

  if (isLoading && filteredProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-sm mx-auto"
        >
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-12 w-12 sm:h-16 sm:w-16 border-4 border-indigo-500 border-t-transparent rounded-full"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 sm:mt-6 text-base sm:text-lg font-medium text-gray-700"
          >
            Loading our finest products...
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-2 text-xs sm:text-sm text-gray-500 px-4"
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

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Mobile Filter Overlay */}
        <AnimatePresence>
          {showFilters && isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={handleOverlayClick}
            />
          )}
        </AnimatePresence>

        {/* Container that changes layout based on screen size */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Filters Section - Stacks on top for mobile/tablet */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{
                  x: isMobile ? -320 : 0,
                  opacity: isMobile ? 0 : 1,
                  height: isMobile ? 0 : "auto",
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  x: isMobile ? -320 : 0,
                  opacity: isMobile ? 0 : 1,
                  height: isMobile ? 0 : "auto",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className={`
              ${
                isMobile
                  ? "fixed top-0 left-0 h-full w-80 max-w-[90vw] bg-white z-50 shadow-2xl overflow-y-auto"
                  : "w-full lg:w-72 xl:w-80 lg:flex-shrink-0"
              }
            `}
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

          {/* Main Content Area - Stacks below filters on mobile/tablet */}
          <div className="flex-1 min-w-0 w-full">
            {/* Toolbar */}
            <motion.div
              variants={fadeIn("up", "tween", 0.1, 0.5)}
              className="bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6"
            >
              <ShopToolbar
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                sortBy={filters.sortBy}
                onSortChange={(sortBy) => updateFilter("sortBy", sortBy)}
                productsCount={filteredProducts ? filteredProducts.length : 0}
                totalProducts={totalProducts}
                onShowFilters={handleFilterToggle}
                showFilters={showFilters}
                isMobile={isMobile}
              />
            </motion.div>

            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-500 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-shrink-0 mb-2 sm:mb-0">
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
                  <div className="sm:ml-3 flex-1">
                    <p className="text-sm text-red-700 break-words">{error}</p>
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center px-3 py-1.5 sm:py-1 border border-transparent text-xs sm:text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Products or Empty State */}
            {filteredProducts && filteredProducts.length > 0 ? (
              <>
                <motion.div
                  variants={fadeIn("up", "tween", 0.2, 0.75)}
                  className="mb-6 sm:mb-8"
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
                    isMobile={isMobile}
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
                    isMobile={isMobile}
                  />
                </motion.div>
              </>
            ) : (
              <motion.div
                variants={slideIn("up", "tween", 0.2, 0.75)}
                className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden"
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
                  isMobile={isMobile}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle FAB */}
      {isMobile && (
        <AnimatePresence>
          {!showFilters && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={handleFilterToggle}
              className="fixed bottom-20 right-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg z-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Open filters"
            >
              <svg
                className="w-6 h-6"
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
            </motion.button>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export default ShopNowPage;
