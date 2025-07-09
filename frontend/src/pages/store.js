// frontend/src/pages/shopMore.js
import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from "../animation/animate";

// Components
import ShopHeader from '../components/storepage/shopHeader';
import ShopFilters from '../components/storepage/shopFilters';
import ShopToolbar from '../components/storepage/shopToolbar';
import ProductGrid from '../components/storepage/productGrid';
import EmptyState from '../components/storepage/emptyState';
import LoadMoreButton from '../components/storepage/loadMoreButton';

// Hooks
import { useProducts } from '../utils/hooks/useProduct';
import { useFilters } from '../utils/hooks/useFilters';
import { useCart } from '../utils/hooks/useCart';
import { useWishlist } from '../utils/hooks/useWishlist';

const ShopNowPage = () => {
  // State management
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Custom hooks
  const { products, filteredProducts, totalProducts, loadProducts, loadMoreProducts } = useProducts();
  const { filters, updateFilter, resetFilters } = useFilters();
  const { cart, addToCart, removeFromCart } = useCart(); // removeFromCart is here
  const { wishlist, toggleWishlist } = useWishlist();

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await loadProducts({ page: 1, limit: 12 });
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error('Error loading products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [loadProducts]); // Dependency added for loadProducts

  // Apply filters when they change
  useEffect(() => {
    const applyFilters = async () => {
      try {
        setIsLoading(true);
        await loadProducts({
          page: 1,
          limit: 12,
          filters: filters
        });
        setCurrentPage(1);
      } catch (err) {
        setError('Failed to apply filters. Please try again.');
        console.error('Error applying filters:', err);
      } finally {
        setIsLoading(false);
      }
    };

    applyFilters();
  }, [filters, loadProducts]); // Dependencies added for filters and loadProducts

  // Handle load more - using useCallback for memoization
  const handleLoadMore = useCallback(async () => {
    try {
      const nextPage = currentPage + 1;
      await loadMoreProducts({
        page: nextPage,
        limit: 12,
        filters: filters
      });
      setCurrentPage(nextPage);
    } catch (err) {
      setError('Failed to load more products. Please try again.');
      console.error('Error loading more products:', err);
    }
  }, [currentPage, loadMoreProducts, filters]);

  // Handle add to cart with feedback - using useCallback for memoization
  const handleAddToCart = useCallback((product) => {
    addToCart(product);
    // You can add toast notification here
    console.log(`Added ${product.name} to cart`);
  }, [addToCart]);

  // Handle remove from cart - newly added for usage
  const handleRemoveFromCart = useCallback((productId) => {
    removeFromCart(productId);
    console.log(`Removed product with ID: ${productId} from cart`);
  }, [removeFromCart]);

  // Handle wishlist toggle - using useCallback for memoization
  const handleWishlistToggle = useCallback((productId) => {
    toggleWishlist(productId);
    // You can add toast notification here
  }, [toggleWishlist]);

  if (isLoading && filteredProducts.length === 0) { // Using filteredProducts here for consistency
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    // Framer Motion: staggerContainer for the main section
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="min-h-screen bg-gray-50"
    >
      <ShopHeader
        searchQuery={filters.searchQuery}
        onSearchChange={(query) => updateFilter('searchQuery', query)}
        cartCount={cart.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <ShopFilters
            filters={filters}
            onFilterChange={updateFilter}
            showFilters={showFilters}
            onHideFilters={() => setShowFilters(false)}
            products={products} // Still passing original products to filters if needed for counts etc.
          />

          <div className="flex-1">
            <ShopToolbar
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={filters.sortBy}
              onSortChange={(sortBy) => updateFilter('sortBy', sortBy)}
              productsCount={filteredProducts ? filteredProducts.length : 0}
              totalProducts={totalProducts}
              onShowFilters={() => setShowFilters(true)}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 text-red-600 hover:text-red-700 font-medium"
                >
                  Retry
                </button>
              </div>
            )}

            {filteredProducts && filteredProducts.length > 0 ? ( // Fixed: Safe access
              <>
                {/* Framer Motion: fadeIn for the ProductGrid */}
                <motion.div variants={fadeIn('up', 'tween', 0.2, 0.75)}>
                  <ProductGrid
                    products={filteredProducts} // Ensure ProductGrid uses this prop
                    viewMode={viewMode}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart} // Passed down removeFromCart
                    onToggleWishlist={handleWishlistToggle}
                    wishlist={wishlist}
                    cart={cart} // Pass cart to ProductGrid to determine if item is in cart
                    isLoading={isLoading}
                  />
                </motion.div>

                <LoadMoreButton
                  onLoadMore={handleLoadMore}
                  hasMore={filteredProducts.length < totalProducts}
                  isLoading={isLoading}
                />
              </>
            ) : (
              <EmptyState
                onClearFilters={resetFilters}
                hasFilters={Object.values(filters).some(value =>
                  value && value !== 'all' && value !== '' &&
                  (Array.isArray(value) ? value.length > 0 : true)
                )}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopNowPage;