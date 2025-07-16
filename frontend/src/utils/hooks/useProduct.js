// frontend/src/hooks/useProducts.js
import { useState, useCallback } from "react";
import { productService } from "../../services/storeServices/getProductService";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(
    async ({ page = 1, limit = 12, filters = {} }) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await productService.getProducts({
          page,
          limit,
          ...filters,
        });

        if (response.status === 304) {
          return;
        }

        setProducts(response.products || []);
        setFilteredProducts(response.products || []);
        setTotalProducts(response.total || 0);
      } catch (err) {
        setError(err.message || "Failed to load products. Please try again.");
        setProducts([]);
        setFilteredProducts([]);
        setTotalProducts(0);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const loadMoreProducts = useCallback(
    async ({ page, limit = 12, filters = {} }) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await productService.getProducts({
          page,
          limit,
          ...filters,
        });

        if (response.status === 304) {
          return;
        }

        setProducts((prev) => [...prev, ...(response.products || [])]);
        setFilteredProducts((prev) => [...prev, ...(response.products || [])]);
      } catch (err) {
        // console.error(
        //   "Error loading more products (in useProducts hook):",
        //   err,
        // );
        setError(
          err.message || "Failed to load more products. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const searchProducts = useCallback(async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await productService.searchProducts(query);

      if (response.status === 304) {
        return;
      }

      setFilteredProducts(response.products || []);
      setTotalProducts(response.total || 0);
    } catch (err) {
      setError(err.message || "Failed to search products. Please try again.");
      setFilteredProducts([]);
      setTotalProducts(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    products,
    filteredProducts,
    totalProducts,
    isLoading,
    error,
    loadProducts,
    loadMoreProducts,
    searchProducts,
  };
};
