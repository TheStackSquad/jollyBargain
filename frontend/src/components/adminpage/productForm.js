// frontend/src/components/adminpage/ProductForm.js

import React, { useState } from "react";
import { Check } from "lucide-react";
import ImageUploader from "./imageUploader";

function ProductForm({
  product,
  onSubmit,
  onCancel,
  formData,
  onFormDataChange,
}) {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Health & Beauty",
    "Toys",
    "Automotive",
    "Food & Beverage",
  ];

  // Update field and trigger live preview
  const updateField = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    onFormDataChange(newFormData);

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        tags:
          formData.tags
            ?.split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag) || [],
      };

      // Create FormData object
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append("title", submitData.title);
      formDataToSend.append("price", submitData.price);
      formDataToSend.append("category", submitData.category);
      formDataToSend.append("description", submitData.description);
      formDataToSend.append("stock", submitData.stock);
      formDataToSend.append("sku", submitData.sku || "");
      formDataToSend.append("status", submitData.status || "active");
      formDataToSend.append(
        "specifications",
        JSON.stringify(submitData.specifications || {}),
      );
      formDataToSend.append("tags", JSON.stringify(submitData.tags));

      // Append image files concurrently
      await Promise.all(
        submitData.images.map(async (image) => {
          if (image.url.startsWith("data:")) {
            const blob = await fetch(image.url).then((res) => res.blob());
            formDataToSend.append(
              "images",
              blob,
              image.original_filename || "image.jpg",
            );
          }
        }),
      );

      // // Log the FormData content (for debugging, won't show full file data)
      // for (const pair of formDataToSend.entries()) {
      //   // console.log(`${pair[0]}, ${pair[1]}`);
      // }

      await onSubmit(formDataToSend);
      // console.log("Submission successful!");
    } catch (error) {
      // console.error("Submit failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="productTitle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Product Title *
          </label>
          <input
            id="productTitle"
            type="text"
            value={formData.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              // max-len fix
              errors.title ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter product title"
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Price *
          </label>
          <input
            id="productPrice"
            type="number"
            step="0.01"
            value={formData.price || ""}
            onChange={(e) => updateField("price", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              // max-len fix
              errors.price ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="text-sm text-red-600 mt-1">{errors.price}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="productCategory"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category *
          </label>
          <select
            id="productCategory"
            value={formData.category || ""}
            onChange={(e) => updateField("category", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              // max-len fix
              errors.category ? "border-red-300" : "border-gray-300"
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-sm text-red-600 mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="productStock"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Stock Quantity *
          </label>
          <input
            id="productStock"
            type="number"
            value={formData.stock || ""}
            onChange={(e) => updateField("stock", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              // max-len fix
              errors.stock ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="0"
          />
          {errors.stock && (
            <p className="text-sm text-red-600 mt-1">{errors.stock}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="productSku"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            SKU
          </label>
          <input
            id="productSku"
            type="text"
            value={formData.sku || ""}
            onChange={(e) => updateField("sku", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" // max-len fix
            placeholder="Product SKU"
          />
        </div>

        <div>
          <label
            htmlFor="productStatus"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status
          </label>
          <select
            id="productStatus"
            value={formData.status || "active"}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" // max-len fix
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="productDescription"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description *
        </label>
        <textarea
          id="productDescription"
          value={formData.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            // max-len fix
            errors.description ? "border-red-300" : "border-gray-300"
          }`}
          placeholder="Enter product description"
        />
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="productTags"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Tags
        </label>
        <input
          id="productTags"
          type="text"
          value={formData.tags || ""}
          onChange={(e) => updateField("tags", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" // max-len fix
          placeholder="Enter tags separated by commas"
        />
      </div>

      <div>
        <label
          htmlFor="productImages"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Product Images *
        </label>
        <ImageUploader
          // You might need to pass an id to ImageUploader if it exposes an input internally
          // and you want this specific label to link to it. Otherwise, this label
          // serves as a heading for the ImageUploader section.
          images={formData.images || []}
          onImagesChange={(newImages) => updateField("images", newImages)}
          error={errors.images}
        />
        {errors.images && (
          <p className="mt-1 text-sm text-red-600">{errors.images}</p>
        )}
      </div>

      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" // max-len fix
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              {product ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              {product ? "Update Product" : "Create Product"}
            </>
          )}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50" // max-len fix
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
