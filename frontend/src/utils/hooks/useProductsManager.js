// src/hooks/useProductsManager.js
import { useState, useEffect, useCallback } from "react";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
} from "../../services/productService";

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
      // console.error("Error fetching products:", err); // Commented out
      setProductsError(err.message || "Failed to load products.");
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
      // console.log("Product created:", newProduct); // Commented out
      fetchProducts(); // Refresh the product list
      return newProduct; // Return the created product if needed
    } catch (err) {
      // console.error("Error creating product:", err); // Commented out
      setProductsError(err.message || "Failed to create product.");
      throw err; // Re-throw to allow parent to handle submission status
    }
  };

  const handleUpdateProduct = async (productId, productData) => {
    setProductsError(null);
    try {
      const updatedProduct = await updateProduct(productId, productData);
      // console.log("Product updated:", updatedProduct); // Commented out
      fetchProducts(); // Refresh the product list
      return updatedProduct; // Return the updated product if needed
    } catch (err) {
      // console.error("Error updating product:", err); // Commented out
      setProductsError(err.message || "Failed to update product.");
      throw err;
    }
  };

  // Modified to take a confirmation function
  const handleDeleteWithAnimation = async (productId, confirmDelete) => {
    // confirmDelete will be a function passed from the component (e.g., a modal)
    const isConfirmed = await confirmDelete();
    if (!isConfirmed) {
      return;
    }

    setProductsError(null);
    setDeletingId(productId);
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for animation

    try {
      await deleteProduct(productId);
      // console.log("Product deleted:", productId); // Commented out
      setProducts((prevProducts) =>
        // eslint-disable-next-line no-underscore-dangle
        prevProducts.filter((p) => p._id !== productId),
      );
    } catch (err) {
      // console.error("Error deleting product:", err); // Commented out
      setProductsError(err.message || "Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  const getProductForEdit = async (productId) => {
    setProductsError(null);
    try {
      // eslint-disable-next-line no-underscore-dangle
      const productToEdit =
        products.find((p) => p._id === productId) ||
        (await getProductById(productId));
      if (!productToEdit) {
        setProductsError("Product not found for editing.");
        return null;
      }
      return productToEdit;
    } catch (err) {
      // console.error("Error fetching product for edit:", err); // Commented out
      setProductsError(err.message || "Failed to load product for editing.");
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
    getProductForEdit,
  };
};

export default useProductsManager;
