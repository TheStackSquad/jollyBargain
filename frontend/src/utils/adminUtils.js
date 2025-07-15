// frontend/src/utils/adminUtils.js

import api from "./adminApi";

// Local admin password logic (temporary)
export const handleAuthentication = (
  passwordAttempt,
  setIsAuthenticated,
  setAuthError,
  AUTH_KEY,
) => {
  const ADMIN_PASSWORD = "adminpassword123"; // Change in production

  if (passwordAttempt === ADMIN_PASSWORD) {
    setIsAuthenticated(true);
    sessionStorage.setItem(AUTH_KEY, "true");
    setAuthError("");
  } else {
    setAuthError("Incorrect password. Please try again.");
    setIsAuthenticated(false);
    sessionStorage.setItem(AUTH_KEY, "false");
  }
};

// Fetch all products
export const fetchAllProducts = async (setProducts) => {
  // Removed unnecessary try/catch wrapper as error is not handled differently
  const res = await api.get("/products");
  setProducts(res.data);
};

// Create
export const handleCreateProduct = async (
  productData,
  setProducts,
  setCurrentView,
) => {
  // Removed unnecessary try/catch wrapper
  const response = await api.post("/products", productData);
  setProducts((prev) => [...prev, response.data]);
  setCurrentView("list");
  return response.data;
};

// Update
export const handleUpdateProduct = async (
  productData,
  editingProduct,
  setProducts,
  setCurrentView,
  setEditingProduct,
) => {
  // eslint-disable-next-line no-underscore-dangle
  const response = await api.put(
    `/products/${editingProduct._id}`,
    productData,
  );
  setProducts((prev) =>
    prev.map((p) =>
      // eslint-disable-next-line no-underscore-dangle
      p._id === editingProduct._id ? response.data : p,
    ),
  );
  setCurrentView("list");
  setEditingProduct(null);
  return response.data;
};

// Delete
export const handleDeleteProduct = async (productId, products, setProducts) => {
  // Removed unnecessary try/catch wrapper
  await api.delete(`/products/${productId}`);
  setProducts((prev) =>
    // eslint-disable-next-line no-underscore-dangle
    prev.filter((p) => p._id !== productId),
  );
};

// Set item in edit mode
export const handleEditProduct = (
  product,
  setEditingProduct,
  setCurrentView,
) => {
  setEditingProduct(product);
  setCurrentView("edit");
};
