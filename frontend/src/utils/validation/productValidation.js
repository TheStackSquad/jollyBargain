// frontend/src/utils/validation/productValidation.js

export const validateProduct = (product) => {
  const errors = {};

  if (!product.title || product.title.trim().length === 0) {
    errors.title = "Title is required";
  }

  if (!product.description || product.description.trim().length < 10) {
    errors.description = "Description should be at least 10 characters";
  }

  if (
    product.price === undefined ||
    product.price === null ||
    Number.isNaN(product.price) // Changed isNaN to Number.isNaN
  ) {
    errors.price = "Price must be a number";
  } else if (product.price < 0) {
    errors.price = "Price cannot be negative";
  }

  if (!product.category || product.category.trim().length === 0) {
    errors.category = "Category is required";
  }

  if (!product.image || product.image.trim().length === 0) {
    errors.image = "Product image is required";
  }

  if (
    product.stock !== undefined &&
    (Number.isNaN(product.stock) || product.stock < 0) // Changed isNaN to Number.isNaN
  ) {
    errors.stock = "Stock must be a non-negative number";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
