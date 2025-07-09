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

// NEW: Import the DeleteConfirmationModal
import DeleteConfirmationModal from '../utils/modal/deleteConfirmationModal';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthStatus());
  const [authError, setAuthError] = useState('');
  const [products, setProducts] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [deletingId, setDeletingId] = useState(null); // The ID of the product being considered for deletion
  const [productToDelete, setProductToDelete] = useState(null); // The actual product object for the modal
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false); // Controls modal visibility
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

  // Effect to reset form data based on view
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
        // Ensure images are correctly formatted for ProductForm if they are objects {public_id, url}
        images: editingProduct.images?.map(img => ({
          id: img.public_id, // Use public_id as id for existing images
          url: img.url,
          public_id: img.public_id,
          // original_filename is not stored in backend images, can derive or leave empty
          original_filename: img.url.substring(img.url.lastIndexOf('/') + 1)
        })) || [],
        specifications: editingProduct.specifications || {},
        tags: editingProduct.tags?.join(', ') || '',
        sku: editingProduct.sku || '',
        status: editingProduct.status || 'active'
      });
    }
  }, [currentView, editingProduct]);

  // Effect to fetch products on authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts(setProducts, setProductsError, setLoadingProducts);
    }
  }, [isAuthenticated]);

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  // --- NEW: Delete Confirmation Handlers ---
  const handleDeleteClick = (productId) => {
    console.log(`AdminPage: Delete button clicked for product ID: ${productId}`);
    // Find the product to display its details in the modal
    const product = products.find(p => p._id === productId);
    setProductToDelete(product); // Store the full product object
    setDeletingId(productId); // Store the ID
    setShowDeleteConfirmModal(true); // Show the modal
  };

  const handleConfirmDelete = async () => {
    console.log(`AdminPage: User confirmed deletion for product ID: ${deletingId}`);
    if (deletingId) {
      // Call your actual delete handler here
      await handleDeleteWithAnimation(
        deletingId,
        setProducts,
        setDeletingId, // This handler already sets deletingId back to null on success or error
        setProductsError
      );
      // Reset modal state
      setShowDeleteConfirmModal(false);
      setProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    console.log('AdminPage: User cancelled deletion.');
    setDeletingId(null); // Clear the deleting ID
    setShowDeleteConfirmModal(false); // Hide the modal
    setProductToDelete(null); // Clear the product details
  };
  // --- END NEW: Delete Confirmation Handlers ---


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
                onDeleteProduct={handleDeleteClick}
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

      {/* NEW: Place the DeleteConfirmationModal outside of currentView conditional blocks */}
      {/* It needs to be available at all times, especially when currentView is 'list' */}
      <DeleteConfirmationModal
        isOpen={showDeleteConfirmModal}
        productToDelete={productToDelete} // Pass the full product object
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </motion.div>
  );
};

export default AdminPage;