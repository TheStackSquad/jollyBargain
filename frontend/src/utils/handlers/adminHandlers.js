// frontend/src/handlers/adminHandlers.js

import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
} from "../../services/productService";

import {
  adminLogin,
  logout as performLogout,
} from "../../services/authServices";

export const handleAdminAuthenticate = async (
  identifier,
  password,
  setAuthError,
  setIsAuthenticated,
) => {
  setAuthError("");
  try {
    await adminLogin(identifier, password);
    setIsAuthenticated(true);
  } catch (err) {
    setAuthError(
      err.message || "Authentication failed. Please check your credentials.",
    );
    setIsAuthenticated(false);
  }
};

export const handleSignOut = (setStateSetters) => {
  performLogout();
  // Using forEach instead of for...of to avoid no-restricted-syntax
  setStateSetters.forEach(([setter, value]) => {
    setter(value);
  });
};

export const handleCreateProduct = async (
  productData,
  fetchProductsCallback, // Renamed to avoid shadowing issues
  setCurrentView,
  setProductsError,
) => {
  setProductsError(null);
  try {
    // console.log(
    //    "Product data received by handleCreateProduct (before createProduct call):",
    //    productData,
    // );
    // console.log(
    //    "Images array content received by handleCreateProduct:",
    //    productData.images,
    // );

    await createProduct(productData); // Removed unused newProduct assignment
    // console.log("Product created successfully.");
    fetchProductsCallback(); // Use the passed callback
    setCurrentView("list");
  } catch (err) {
    // console.error("Error creating product:", err);
    setProductsError(err.message || "Failed to create product.");
    // console.log("Product data being sent (on error):", productData);
    // console.log("Images array content (on error):", productData.images);
  }
};

export const handleFetchProducts = async (
  setProducts,
  setProductsError,
  setLoading = null,
) => {
  setProductsError(null);
  if (setLoading) setLoading(true);

  try {
    const products = await getProducts();
    setProducts(products);
  } catch (err) {
    setProductsError(err.message || "Failed to fetch products.");
  } finally {
    if (setLoading) setLoading(false);
  }
};

// You can also create an alias for backward compatibility
export const fetchProducts = handleFetchProducts;

export const handleUpdateProduct = async (
  editingProductId,
  productData,
  fetchProductsCallback, // Renamed to avoid shadowing issues
  setCurrentView,
  setEditingProduct,
  setProductsError,
) => {
  setProductsError(null);
  try {
    await updateProduct(editingProductId, productData); // Removed unused updatedProduct assignment
    // console.log("Product updated successfully.");
    fetchProductsCallback(); // Use the passed callback
    setCurrentView("list");
    setEditingProduct(null);
  } catch (err) {
    // console.error("Error updating product:", err);
    setProductsError(err.message || "Failed to update product.");
  }
};

export const handleDeleteWithAnimation = async (
  productId,
  setProducts,
  setDeletingId,
  setProductsError,
  confirmDeleteCallback, // New parameter for confirmation
) => {
  const isConfirmed = await confirmDeleteCallback();
  if (!isConfirmed) {
    return;
  }

  setProductsError(null);
  setDeletingId(productId);
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // Ensure resolve is called without arguments

  try {
    await deleteProduct(productId);
    setProducts((prev) =>
      // eslint-disable-next-line no-underscore-dangle
      prev.filter((p) => p._id !== productId),
    );
  } catch (err) {
    // console.error("Error deleting product:", err);
    setProductsError(err.message || "Failed to delete product.");
  } finally {
    setDeletingId(null);
  }
};

export const handleEditProduct = async (
  productId,
  products,
  setEditingProduct,
  setCurrentView,
  setProductsError,
) => {
  setProductsError(null);
  try {
    // eslint-disable-next-line no-underscore-dangle
    const productToEdit =
      products.find((p) => p._id === productId) ||
      (await getProductById(productId));
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setCurrentView("edit");
    } else {
      setProductsError("Product not found.");
    }
  } catch (err) {
    // console.error("Error editing product:", err);
    setProductsError(err.message || "Failed to load product.");
  }
};
