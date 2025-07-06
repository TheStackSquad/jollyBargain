// frontend/src/components/adminpage/useProductForm.js

import { useState, useEffect } from 'react';

// Custom hook for product form management
const useProductForm = (initialProduct = null) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    images: [],
    stock: '',
    sku: '',
    tags: '',
    status: 'active'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        ...initialProduct,
        tags: initialProduct.tags?.join(', ') || ''
      });
    }
  }, [initialProduct]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.price || isNaN(formData.price) || formData.price <= 0)
      newErrors.price = 'Valid price is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    if (!formData.stock || isNaN(formData.stock) || formData.stock < 0)
      newErrors.stock = 'Valid stock quantity is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      category: '',
      description: '',
      images: [],
      stock: '',
      sku: '',
      tags: '',
      status: 'active'
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    validateForm,
    updateField,
    resetForm,
    setFormData // Exposed for direct updates like images
  };
};

export default useProductForm;