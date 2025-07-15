// frontend/src/hooks/useFilters.js
import { useState, useCallback } from "react";

const initialFilters = {
  searchQuery: "",
  category: "all",
  priceRange: [0, 1000],
  brands: [],
  sortBy: "featured",
  rating: 0,
  inStock: false,
};

export const useFilters = () => {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = useCallback((filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  }, []);

  const updateMultipleFilters = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const toggleBrand = useCallback((brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  }, []);

  const hasActiveFilters = useCallback(
    () =>
      filters.searchQuery !== "" ||
      filters.category !== "all" ||
      filters.priceRange[0] !== 0 ||
      filters.priceRange[1] !== 1000 ||
      filters.brands.length > 0 ||
      filters.rating > 0 ||
      filters.inStock,
    [filters],
  );

  return {
    filters,
    updateFilter,
    updateMultipleFilters,
    resetFilters,
    toggleBrand,
    hasActiveFilters,
  };
};
