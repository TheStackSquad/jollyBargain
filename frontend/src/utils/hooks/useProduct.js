// frontend/src/hooks/useProducts.js
import { useState, useCallback } from 'react';
import { productService } from '../../services/storeServices/getProductService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // loadProducts: Handles initial product loading and filtering
  const loadProducts = useCallback(async ({ page = 1, limit = 12, filters = {} }) => {
    setIsLoading(true);
    setError(null); // Clear any previous errors
    try {
      // productService.getProducts now returns a structured object:
      // { products: [...], total: N, status: S } for 2xx responses
      // or { data: null, status: 304 } for 304 Not Modified
      const response = await productService.getProducts({
        page,
        limit,
        ...filters
      });

      // Handle 304 Not Modified: If data hasn't changed, retain current state
      if (response.status === 304) {
        console.log('Products are not modified. Retaining existing data in useProducts state.');
        // No state update needed, as existing data is current.
        return;
      }

      // For 2xx responses, update state with the new data
      setProducts(response.products || []); // Ensure it's an array
      setFilteredProducts(response.products || []); // Ensure it's an array
      setTotalProducts(response.total || 0); // Ensure it's a number

    } catch (err) {
      // Error caught from apiClient (via productService) will have custom properties
      console.error('Error loading products (in useProducts hook):', err);
      // Use the error message from the custom error object, or a generic one
      setError(err.message || 'Failed to load products. Please try again.');
      // On error, clear product data to reflect no valid data was loaded
      setProducts([]);
      setFilteredProducts([]);
      setTotalProducts(0);
    } finally {
      setIsLoading(false); // Always set loading to false when operation completes
    }
  }, []); // Dependencies: Empty array, as productService is stable and arguments are passed in

  // loadMoreProducts: Handles loading additional products for pagination
  const loadMoreProducts = useCallback(async ({ page, limit = 12, filters = {} }) => {
    setIsLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await productService.getProducts({
        page,
        limit,
        ...filters
      });

      // Handle 304 Not Modified: If no new products, do not append
      if (response.status === 304) {
        console.log('More products not modified. Not appending to current list.');
        return;
      }

      // Append new products to existing lists
      setProducts(prev => [...prev, ...(response.products || [])]);
      setFilteredProducts(prev => [...prev, ...(response.products || [])]);
      // totalProducts should usually be stable after initial load, but if API sends it with pagination,
      // you could update it here:
      // setTotalProducts(response.total || totalProducts);

    } catch (err) {
      console.error('Error loading more products (in useProducts hook):', err);
      setError(err.message || 'Failed to load more products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependencies: Empty array, as productService is stable and arguments are passed in

  // searchProducts: Handles product search functionality
  const searchProducts = useCallback(async (query) => {
    setIsLoading(true);
    setError(null); // Clear any previous errors
    try {
      // productService.searchProducts also returns a structured object
      const response = await productService.searchProducts(query);

      // Handle 304 Not Modified: If search results haven't changed, retain current state
      if (response.status === 304) {
        console.log('Search results not modified. Retaining previous search results.');
        return;
      }

      // Update filtered products and total based on search results
      setFilteredProducts(response.products || []);
      setTotalProducts(response.total || 0);

    } catch (err) {
      console.error('Error searching products (in useProducts hook):', err);
      setError(err.message || 'Failed to search products. Please try again.');
      // On search error, clear filtered products to reflect no valid search results
      setFilteredProducts([]);
      setTotalProducts(0);
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependencies: Empty array, as productService is stable and arguments are passed in

  // Return all states and functions for consumption by components
  return {
    products,          // All products loaded (including paginated)
    filteredProducts,  // Products after applying filters/search
    totalProducts,     // Total count of products matching current criteria
    isLoading,         // Loading state for API calls
    error,             // Any error message from API calls
    loadProducts,      // Function to load initial/filtered products
    loadMoreProducts,  // Function to load more products
    searchProducts     // Function to search products
  };
};
