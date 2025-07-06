// src/hooks/useProductsManager.js
import { useState, useEffect, useCallback } from 'react';
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById
} from '../services/productService'; // Adjust path if needed

const useProductsManager = (isAuthenticated) => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [productsError, setProductsError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const fetchProducts = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProducts();
        }
    }, [isAuthenticated, fetchProducts]);

    const handleCreateProduct = async (productData) => {
        setProductsError(null);
        try {
            const newProduct = await createProduct(productData);
            console.log('Product created:', newProduct);
            fetchProducts(); // Refresh the product list
            return newProduct; // Return the created product if needed
        } catch (err) {
            console.error('Error creating product:', err);
            setProductsError(err.message || 'Failed to create product.');
            throw err; // Re-throw to allow parent to handle submission status
        }
    };

    const handleUpdateProduct = async (productId, productData) => {
        setProductsError(null);
        try {
            const updatedProduct = await updateProduct(productId, productData);
            console.log('Product updated:', updatedProduct);
            fetchProducts(); // Refresh the product list
            return updatedProduct; // Return the updated product if needed
        } catch (err) {
            console.error('Error updating product:', err);
            setProductsError(err.message || 'Failed to update product.');
            throw err;
        }
    };

    const handleDeleteWithAnimation = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            return;
        }
        setProductsError(null);
        setDeletingId(productId);
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for animation

        try {
            await deleteProduct(productId);
            console.log('Product deleted:', productId);
            setProducts(prevProducts => prevProducts.filter(p => p._id !== productId));
        } catch (err) {
            console.error('Error deleting product:', err);
            setProductsError(err.message || 'Failed to delete product.');
        } finally {
            setDeletingId(null);
        }
    };

    const getProductForEdit = async (productId) => {
        setProductsError(null);
        try {
            const productToEdit = products.find(p => p._id === productId) || await getProductById(productId);
            if (!productToEdit) {
                setProductsError('Product not found for editing.');
                return null;
            }
            return productToEdit;
        } catch (err) {
            console.error('Error fetching product for edit:', err);
            setProductsError(err.message || 'Failed to load product for editing.');
            return null;
        }
    };

    return {
        products,
        loadingProducts,
        productsError,
        deletingId,
        fetchProducts,
        handleCreateProduct,
        handleUpdateProduct,
        handleDeleteWithAnimation,
        getProductForEdit
    };
};

export default useProductsManager;