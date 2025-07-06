// frontend/src/services/productService.js
import api from '../utils/adminApi'; // Import the configured Axios instance

/**
 * @typedef {Object} ProductFormData
 * @property {string} title
 * @property {number} price
 * @property {string} category
 * @property {string} description
 * @property {Array<File|{public_id: string, url: string}>} images - Can be File objects (new) or existing image objects.
 * @property {number} stock
 * @property {string} sku
 * @property {string} tags - Comma-separated string of tags
 * @property {string} status
 * @property {string} [_id] - Optional product ID for updates
 */

/**
 * Creates a new product.
 * @param {ProductFormData} productData - The product data from the form, including image files.
 * @returns {Promise<Object>} The created product data from the backend.
 */
export const createProduct = async (productData) => {
  const formData = new FormData();

  // Append all text fields
  for (const key in productData) {
    if (key !== 'images' && key !== 'tags' && key !== '_id') { // Exclude images, tags, and _id (for new product)
      formData.append(key, productData[key]);
    }
  }

  // Append tags as a comma-separated string (as expected by backend)
  formData.append('tags', Array.isArray(productData.tags) ? productData.tags.join(',') : productData.tags);

  // Append image files. Multer on backend expects 'images' field.
  if (productData.images && productData.images.length > 0) {
    productData.images.forEach((image) => {
      if (image instanceof File) {
        // Only append actual File objects for upload
        formData.append('images', image);
      }
      // Note: For create, we don't send existing image URLs, only new files.
      // The backend will handle the Cloudinary upload and return URLs.
    });
  }

  try {
    const response = await api.post('/products', formData, {
      // Axios automatically sets Content-Type to 'multipart/form-data'
      // with the correct boundary when FormData is used as data.
      // No need to set headers['Content-Type'] manually.
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error.response?.data || error.message);
    throw error; // Re-throw to be caught by the calling component
  }
};

/**
 * Updates an existing product.
 * @param {string} productId - The ID of the product to update.
 * @param {ProductFormData} productData - The updated product data from the form, including image files and existing image objects.
 * @returns {Promise<Object>} The updated product data from the backend.
 */
export const updateProduct = async (productId, productData) => {
  const formData = new FormData();

  // Append all text fields
  for (const key in productData) {
    if (key !== 'images' && key !== 'tags' && key !== '_id') { // Exclude images, tags, and _id
      formData.append(key, productData[key]);
    }
  }

  // Append tags as a comma-separated string
  formData.append('tags', Array.isArray(productData.tags) ? productData.tags.join(',') : productData.tags);

  // Handle images for update:
  // The backend's updateProduct controller has logic to handle
  // 1. New files in req.files (Multer) - these replace existing images
  // 2. req.body.images (as a JSON string) - if no new files, this array defines desired images (for removing old ones)

  const newFiles = productData.images.filter(image => image instanceof File);
  const existingImages = productData.images.filter(image => !(image instanceof File));

  if (newFiles.length > 0) {
    // If there are new files, append them directly.
    // The backend will treat these as replacements for existing images.
    newFiles.forEach(file => {
      formData.append('images', file);
    });
  } else {
    // If no new files, send the current desired list of images (which includes
    // existing ones to keep) as a JSON string.
    // The backend will parse this and decide which old images to delete from Cloudinary.
    formData.append('images', JSON.stringify(existingImages));
  }


  try {
    const response = await api.put(`/products/${productId}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetches all products.
 * @returns {Promise<Array<Object>>} An array of product objects.
 */
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data.data; // Assuming your backend returns { success: true, data: [...] }
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetches a single product by ID.
 * @param {string} productId - The ID of the product to fetch.
 * @returns {Promise<Object>} The product object.
 */
export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Deletes a product by ID.
 * @param {string} productId - The ID of the product to delete.
 * @returns {Promise<Object>} Success message from the backend.
 */
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error.response?.data || error.message);
    throw error;
  }
};
