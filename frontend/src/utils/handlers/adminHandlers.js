// frontend/src/handlers/adminHandlers.js

import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById
} from '../../services/productService';

import { adminLogin, logout as performLogout } from '../../services/authServices';

export const handleAdminAuthenticate = async (identifier, password, setAuthError, setIsAuthenticated) => {
  setAuthError('');
  try {
    await adminLogin(identifier, password);
    setIsAuthenticated(true);
  } catch (err) {
    setAuthError(err.message || 'Authentication failed. Please check your credentials.');
    setIsAuthenticated(false);
  }
};

export const handleSignOut = (setStateSetters) => {
  performLogout();
  for (const [setter, value] of setStateSetters) {
    setter(value);
  }
};

export const fetchProducts = async (setProducts, setProductsError, setLoadingProducts) => {
  setLoadingProducts(true);
  setProductsError(null);
  try {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  } catch (err) {
    console.error('Error fetching products:', err);
    setProductsError(err.message || 'Failed to load products.');
  } finally {
    setLoadingProducts(false);
  }
};

export const handleCreateProduct = async (productData, fetchProducts, setCurrentView, setProductsError) => {
  setProductsError(null);
  try {
    console.log('Product data received by handleCreateProduct (before createProduct call):', productData); // New log
    console.log('Images array content received by handleCreateProduct:', productData.images); // New log

    const newProduct = await createProduct(productData);
    console.log('Product created:', newProduct);
    fetchProducts();
    setCurrentView('list');
  } catch (err) {
    console.error('Error creating product:', err);
    setProductsError(err.message || 'Failed to create product.');
    // Keep these as they are good for debugging errors
    console.log('Product data being sent (on error):', productData); 
    console.log('Images array content (on error):', productData.images); 
  }
};

export const handleUpdateProduct = async (editingProductId, productData, fetchProducts, setCurrentView, setEditingProduct, setProductsError) => {
  setProductsError(null);
  try {
    const updatedProduct = await updateProduct(editingProductId, productData);
    console.log('Product updated:', updatedProduct);
    fetchProducts();
    setCurrentView('list');
    setEditingProduct(null);
  } catch (err) {
    console.error('Error updating product:', err);
    setProductsError(err.message || 'Failed to update product.');
  }
};

export const handleDeleteWithAnimation = async (productId, setProducts, setDeletingId, setProductsError) => {
  if (!window.confirm('Are you sure you want to delete this product?')) return;

  setProductsError(null);
  setDeletingId(productId);
  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    await deleteProduct(productId);
    setProducts(prev => prev.filter(p => p._id !== productId));
  } catch (err) {
    console.error('Error deleting product:', err);
    setProductsError(err.message || 'Failed to delete product.');
  } finally {
    setDeletingId(null);
  }
};

export const handleEditProduct = async (productId, products, setEditingProduct, setCurrentView, setProductsError) => {
  setProductsError(null);
  try {
    const productToEdit = products.find(p => p._id === productId) || await getProductById(productId);
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setCurrentView('edit');
    } else {
      setProductsError('Product not found.');
    }
  } catch (err) {
    console.error('Error editing product:', err);
    setProductsError(err.message || 'Failed to load product.');
  }
};
