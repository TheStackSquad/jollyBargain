// frontend/src/pages/admin.js

import React, { useState, useEffect } from 'react';
import { Plus, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageMountAnim } from '../animation/adminAnimate';

// Import authentication services
import { isAuthenticated as checkAuthStatus } from '../services/authServices';

import {
  handleAdminAuthenticate,
  handleSignOut,
  fetchProducts,
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteWithAnimation,
  handleEditProduct
} from '../utils/handlers/adminHandlers';

// Import modular components
import ProductForm from '../components/adminpage/productForm';
import ProductPreview from '../components/adminpage/productPreview';
import ProductList from '../components/adminpage/productList';
import AdminLoginForm from '../components/adminpage/adminLoginForm';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthStatus());
  const [authError, setAuthError] = useState('');
  const [products, setProducts] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    stock: '',
    images: [],
    specifications: {},
    tags: '',
    sku: '',
    status: 'active'
  });

  const categories = [
    'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books',
    'Health & Beauty', 'Toys', 'Automotive', 'Food & Beverage'
  ];

  useEffect(() => {
    if (currentView === 'create') {
      setFormData({
        title: '',
        price: '',
        category: '',
        description: '',
        stock: '',
        images: [],
        specifications: {},
        tags: '',
        sku: '',
        status: 'active'
      });
    } else if (currentView === 'edit' && editingProduct) {
      setFormData({
        title: editingProduct.title || '',
        price: editingProduct.price || '',
        category: editingProduct.category || '',
        description: editingProduct.description || '',
        stock: editingProduct.stock || '',
        images: editingProduct.images || [],
        specifications: editingProduct.specifications || {},
        tags: editingProduct.tags?.join(', ') || '',
        sku: editingProduct.sku || '',
        status: editingProduct.status || 'active'
      });
    }
  }, [currentView, editingProduct]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts(setProducts, setProductsError, setLoadingProducts);
    }
  }, [isAuthenticated]);

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  if (!isAuthenticated) {
    return (
      <motion.div initial="hidden" animate="visible" variants={pageMountAnim}>
        <AdminLoginForm onAuthenticate={(id, pw) => handleAdminAuthenticate(id, pw, setIsAuthenticated, setAuthError)} error={authError} />
      </motion.div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={pageMountAnim} className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            <div className="flex items-center gap-4">
              {currentView === 'list' && (
                <button onClick={() => setCurrentView('create')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Product
                </button>
              )}
              {(currentView === 'create' || currentView === 'edit') && (
                <button onClick={() => { setCurrentView('list'); setEditingProduct(null); }} className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                  ← Back to Products
                </button>
              )}
              <button
                onClick={() =>
                  handleSignOut([
                    [setIsAuthenticated, false],
                    [setAuthError, ''],
                    [setProducts, []],
                    [setCurrentView, 'list'],
                    [setEditingProduct, null],
                    [setSearchTerm, ''],
                    [setFilterCategory, ''],
                    [setDeletingId, null],
                    [setFormData, {
                      title: '', price: '', category: '', description: '', stock: '',
                      images: [], specifications: {}, tags: '', sku: '', status: 'active'
                    }]
                  ])
                }
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {productsError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {productsError}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {currentView === 'list' && (
            <motion.div key="product-list-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <ProductList
                products={products}
                categories={categories}
                onEditProduct={(id) => handleEditProduct(id, products, setEditingProduct, setCurrentView, setProductsError)}
                onDeleteProduct={(id) => handleDeleteWithAnimation(id, setProducts, setDeletingId, setProductsError)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                deletingId={deletingId}
                loading={loadingProducts}
              />
            </motion.div>
          )}

          {(currentView === 'create' || (currentView === 'edit' && editingProduct)) && (
            <motion.div key={`product-${currentView}-view`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    {currentView === 'create' ? 'Create New Product' : 'Edit Product'}
                  </h2>
                  <ProductForm
                    product={editingProduct}
                    onSubmit={(data) =>
                      currentView === 'create'
                        ? handleCreateProduct(data, () => fetchProducts(setProducts, setProductsError, setLoadingProducts), setCurrentView, setProductsError)
                        : handleUpdateProduct(editingProduct._id, data, () => fetchProducts(setProducts, setProductsError, setLoadingProducts), setCurrentView, setEditingProduct, setProductsError)
                    }
                    formData={formData}
                    onFormDataChange={handleFormDataChange}
                    onCancel={() => {
                      setCurrentView('list');
                      setEditingProduct(null);
                    }}
                  />
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ProductPreview product={formData} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AdminPage;
