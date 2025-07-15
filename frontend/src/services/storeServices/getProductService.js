// frontend/src/services/productService.js
import { apiClient } from "../apiClient/apiClient";

export const productService = {
  // Get products with filtering, sorting, and pagination
  async getProducts({
    page = 1,
    limit = 12,
    searchQuery = "",
    category = "all",
    priceRange = [0, 1000],
    brands = [],
    sortBy = "featured",
    rating = 0,
    inStock = false,
  }) {
    // Log the initial parameters received
    // console.log("getProducts - Received parameters:", {
    //    page,
    //    limit,
    //    searchQuery,
    //    category,
    //    priceRange,
    //    brands,
    //    sortBy,
    //    rating,
    //    inStock,
    // });

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
    });

    if (searchQuery) params.append("search", searchQuery);
    if (category !== "all") params.append("category", category);
    // Ensure priceRange values are only added if they are meaningful
    if (priceRange[0] !== undefined && priceRange[0] !== null)
      params.append("minPrice", priceRange[0].toString());
    if (priceRange[1] !== undefined && priceRange[1] !== null)
      params.append("maxPrice", priceRange[1].toString());
    if (brands.length > 0) params.append("brands", brands.join(","));
    if (rating > 0) params.append("minRating", rating.toString());
    if (inStock) params.append("inStock", "true");

    // Log the constructed URLSearchParams
    // console.log(
    //    "getProducts - Constructed URLSearchParams:",
    //    params.toString(),
    // );
    // // You can also log the full URL that will be requested
    // console.log(
    //    "getProducts - Full API endpoint:",
    //    `/products?${params.toString()}`,
    // );

    // Removed unnecessary try/catch wrapper
    const response = await apiClient.get(`/products?${params}`);

    // Log the response received from the API
    // console.log("getProducts - API response:", response);

    return response; // Return the full structured response from apiClient
  },

  // Get a single product by ID
  async getProduct(id) {
    // Log the ID for which the product is being fetched
    // console.log("getProduct - Fetching product with ID:", id);

    // Removed unnecessary try/catch wrapper
    const response = await apiClient.get(`/products/${id}`);

    // Log the response for a single product
    // console.log(
    //    "getProduct - API response for product ID",
    //    id,
    //    ":",
    //    response,
    // );

    return response; // This will be the product object directly
  },

  // Search products
  async searchProducts(query) {
    // Removed unnecessary try/catch wrapper
    // Similar to getProducts, searchProducts API also returns a list,
    // so apiClient.get will return the structured { products: [...], total: N, status: S }
    const response = await apiClient.get(
      `/products/search?q=${encodeURIComponent(query)}`,
    );
    return response; // Return the full structured response from apiClient
  },

  // Get product categories
  async getCategories() {
    // Removed unnecessary try/catch wrapper
    const response = await apiClient.get("/products/categories");
    return response; // This will be the categories array directly
  },

  // Get product brands
  async getBrands() {
    // Removed unnecessary try/catch wrapper
    const response = await apiClient.get("/products/brands");
    return response; // This will be the brands array directly
  },

  // Get featured products
  async getFeaturedProducts(limit = 8) {
    // Removed unnecessary try/catch wrapper
    const response = await apiClient.get(`/products/featured?limit=${limit}`);
    return response; // This will be the featured products array directly
  },

  // Get related products
  async getRelatedProducts(productId, limit = 4) {
    // Removed unnecessary try/catch wrapper
    const response = await apiClient.get(
      `/products/${productId}/related?limit=${limit}`,
    );
    return response; // This will be the related products array directly
  },

  // Get products by category
  async getProductsByCategory(
    category,
    { page = 1, limit = 12, sortBy = "featured" } = {},
  ) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
    });
    // Removed unnecessary try/catch wrapper
    const response = await apiClient.get(
      `/products/category/${category}?${params}`,
    );
    return response; // This will be the products array for the category directly
  },

  // Get products by brand
  async getProductsByBrand(
    brand,
    { page = 1, limit = 12, sortBy = "featured" } = {},
  ) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
    });
    // Removed unnecessary try/catch wrapper
    const response = await apiClient.get(`/products/brand/${brand}?${params}`);
    return response; // This will be the products array for the brand directly
  },
};
