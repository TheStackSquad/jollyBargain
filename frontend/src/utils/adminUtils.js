// frontend/src/utils/adminUtils.js

import api from './adminApi';

// 🔐 Local admin password logic (temporary)
export const handleAuthentication = (passwordAttempt, setIsAuthenticated, setAuthError, AUTH_KEY) => {
  const ADMIN_PASSWORD = "adminpassword123"; // Change in production

  if (passwordAttempt === ADMIN_PASSWORD) {
    setIsAuthenticated(true);
    sessionStorage.setItem(AUTH_KEY, 'true');
    setAuthError('');
  } else {
    setAuthError('Incorrect password. Please try again.');
    setIsAuthenticated(false);
    sessionStorage.setItem(AUTH_KEY, 'false');
  }
};

// 📥 Fetch all products
export const fetchAllProducts = async (setProducts) => {
  try {
    const res = await api.get('/products');
    setProducts(res.data);
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};

// ➕ Create
export const handleCreateProduct = async (productData, setProducts, setCurrentView) => {
  try {
    const response = await api.post('/products', productData);
    setProducts(prev => [...prev, response.data]);
    setCurrentView('list');
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// ✏️ Update
export const handleUpdateProduct = async (productData, editingProduct, setProducts, setCurrentView, setEditingProduct) => {
  try {
    const response = await api.put(`/products/${editingProduct._id}`, productData);
    setProducts(prev =>
      prev.map(p => p._id === editingProduct._id ? response.data : p)
    );
    setCurrentView('list');
    setEditingProduct(null);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// 🗑️ Delete
export const handleDeleteProduct = async (productId, products, setProducts) => {
  try {
    await api.delete(`/products/${productId}`);
    setProducts(prev => prev.filter(p => p._id !== productId));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// 🧠 Set item in edit mode
export const handleEditProduct = (product, setEditingProduct, setCurrentView) => {
  setEditingProduct(product);
  setCurrentView('edit');
};
