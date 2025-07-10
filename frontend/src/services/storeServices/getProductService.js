// frontend/src/services/productService.js
import { apiClient } from '../apiClient/apiClient';

export const productService = {
  // Get products with filtering, sorting, and pagination
async getProducts({
  page = 1,
  limit = 12,
  searchQuery = '',
  category = 'all',
  priceRange = [0, 1000],
  brands = [],
  sortBy = 'featured',
  rating = 0,
  inStock = false
}) {
  // Log the initial parameters received
  console.log('getProducts - Received parameters:', {
    page,
    limit,
    searchQuery,
    category,
    priceRange,
    brands,
    sortBy,
    rating,
    inStock
  });

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
  });

  if (searchQuery) params.append('search', searchQuery);
  if (category !== 'all') params.append('category', category);
  // Ensure priceRange values are only added if they are meaningful
  if (priceRange[0] !== undefined && priceRange[0] !== null) params.append('minPrice', priceRange[0].toString());
  if (priceRange[1] !== undefined && priceRange[1] !== null) params.append('maxPrice', priceRange[1].toString());
  if (brands.length > 0) params.append('brands', brands.join(','));
  if (rating > 0) params.append('minRating', rating.toString());
  if (inStock) params.append('inStock', 'true');

  // Log the constructed URLSearchParams
  console.log('getProducts - Constructed URLSearchParams:', params.toString());
  // You can also log the full URL that will be requested
  console.log('getProducts - Full API endpoint:', `/products?${params.toString()}`);


  try {
    // apiClient.get for /products now returns { products: [...], total: N, status: S }
    // or { data: null, status: 304 } if not modified.
    // We return this entire structured response directly.
    const response = await apiClient.get(`/products?${params}`);

    // Log the response received from the API
    console.log('getProducts - API response:', response);

    return response; // Return the full structured response from apiClient
  } catch (error) {
    console.error('Error in productService.getProducts:', error);
    throw error; // Re-throw the error for the calling hook/component to handle
  }
},

// Get a single product by ID
async getProduct(id) {
  // Log the ID for which the product is being fetched
  console.log('getProduct - Fetching product with ID:', id);

  try {
    // For single product, apiClient.get returns the raw data payload (response.data from axios)
    const response = await apiClient.get(`/products/${id}`);

    // Log the response for a single product
    console.log('getProduct - API response for product ID', id, ':', response);

    return response; // This will be the product object directly
  } catch (error) {
    console.error(`Error in productService.getProduct for ID ${id}:`, error);
    throw error;
  }
},

  // Search products
  async searchProducts(query) {
    try {
      // Similar to getProducts, searchProducts API also returns a list,
      // so apiClient.get will return the structured { products: [...], total: N, status: S }
      const response = await apiClient.get(`/products/search?q=${encodeURIComponent(query)}`);
      return response; // Return the full structured response from apiClient
    } catch (error) {
      console.error('Error in productService.searchProducts:', error);
      throw error;
    }
  },

  // Get product categories
  async getCategories() {
    try {
      const response = await apiClient.get('/products/categories');
      return response; // This will be the categories array directly
    } catch (error) {
      console.error('Error in productService.getCategories:', error);
      throw error;
    }
  },

  // Get product brands
  async getBrands() {
    try {
      const response = await apiClient.get('/products/brands');
      return response; // This will be the brands array directly
    } catch (error) {
      console.error('Error in productService.getBrands:', error);
      throw error;
    }
  },

  // Get featured products
  async getFeaturedProducts(limit = 8) {
    try {
      const response = await apiClient.get(`/products/featured?limit=${limit}`);
      return response; // This will be the featured products array directly
    } catch (error) {
      console.error('Error in productService.getFeaturedProducts:', error);
      throw error;
    }
  },

  // Get related products
  async getRelatedProducts(productId, limit = 4) {
    try {
      const response = await apiClient.get(`/products/${productId}/related?limit=${limit}`);
      return response; // This will be the related products array directly
    } catch (error) {
      console.error(`Error in productService.getRelatedProducts for product ID ${productId}:`, error);
      throw error;
    }
  },

  // Get products by category
  async getProductsByCategory(category, { page = 1, limit = 12, sortBy = 'featured' } = {}) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
    });
    try {
      const response = await apiClient.get(`/products/category/${category}?${params}`);
      return response; // This will be the products array for the category directly
    } catch (error) {
      console.error(`Error in productService.getProductsByCategory for category ${category}:`, error);
      throw error;
    }
  },

  // Get products by brand
  async getProductsByBrand(brand, { page = 1, limit = 12, sortBy = 'featured' } = {}) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
    });
    try {
      const response = await apiClient.get(`/products/brand/${brand}?${params}`);
      return response; // This will be the products array for the brand directly
    } catch (error) {
      console.error(`Error in productService.getProductsByBrand for brand ${brand}:`, error);
      throw error;
    }
  }
};
