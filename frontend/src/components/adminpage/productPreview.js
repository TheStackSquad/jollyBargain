// frontend/src/components/adminpage/ProductPreview.js
import React from "react";
import { Image as ImageIcon, Tag } from "lucide-react";

function ProductPreview({ product }) {
  // Use a default empty product if none is provided to avoid errors
  const defaultProduct = {
    title: "Product Title",
    price: 0.0,
    category: "N/A",
    stock: 0,
    status: "draft",
    description: "Product description will appear here.",
    images: [],
    tags: "",
    sku: "",
  };

  const displayProduct = product || defaultProduct;

  // Handle price display - convert string to number if needed
  const formatPrice = (price) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return Number.isNaN(numPrice) ? 0 : numPrice; // Fix: Use Number.isNaN
  };

  // Handle stock display - convert string to number if needed
  const formatStock = (stock) => {
    const numStock = typeof stock === "string" ? parseInt(stock, 10) : stock;
    return Number.isNaN(numStock) ? 0 : numStock; // Fix: Use Number.isNaN
  };

  // Parse tags from string or array
  const parseTags = (tags) => {
    if (typeof tags === "string") {
      return tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
    }
    return Array.isArray(tags) ? tags : [];
  };

  // Check if we have actual content vs placeholder
  const hasContent =
    displayProduct.title && displayProduct.title !== "Product Title";

  // Fix for no-nested-ternary
  let statusClassName;

  if (displayProduct.status === "active") {
    statusClassName = "bg-green-100 text-green-800";
  } else if (displayProduct.status === "draft") {
    statusClassName = "bg-yellow-100 text-yellow-800";
  } else {
    // Default case for any other status
    statusClassName = "bg-gray-100 text-gray-800";
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {hasContent ? "Live Preview" : "Preview"}
      </h3>

      <div className="space-y-4">
        {/* Image Preview */}
        {displayProduct.images &&
        displayProduct.images.length > 0 &&
        displayProduct.images[0]?.url ? (
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={displayProduct.images[0].url}
              alt={displayProduct.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <ImageIcon className="h-16 w-16 text-gray-400" />
            <span className="ml-2 text-gray-500 text-sm">
              No image uploaded
            </span>
          </div>
        )}

        {/* Product Title and Price */}
        <div>
          <h4
            className={`font-medium text-lg ${
              hasContent ? "text-gray-900" : "text-gray-500" // Fix: max-len
            }`}
          >
            {displayProduct.title || "Product Title"}
          </h4>
          <p className="text-2xl font-bold text-green-600">
            ₦{formatPrice(displayProduct.price).toFixed(2)}
          </p>
        </div>

        {/* Product Details */}
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <span className="font-medium">Category:</span>
            <span
              className={
                displayProduct.category ? "text-gray-900" : "text-gray-500"
              }
            >
              {displayProduct.category || "No category selected"}
            </span>
          </p>

          <p>
            <span className="font-medium">Stock:</span>
            <span
              className={`ml-1 ${formatStock(displayProduct.stock) > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {formatStock(displayProduct.stock)} units
            </span>
          </p>

          {displayProduct.sku && (
            <p>
              <span className="font-medium">SKU:</span>
              <span className="text-gray-900 ml-1">{displayProduct.sku}</span>
            </p>
          )}

          <p>
            <span className="font-medium">Status:</span>
            <span
              className={`ml-1 px-2 py-1 rounded-full text-xs ${statusClassName}`}
            >
              {displayProduct.status}
            </span>
          </p>
        </div>

        {/* Description */}
        <div>
          <h5 className="font-medium text-gray-900 mb-2">Description</h5>
          <p
            className={`text-sm ${
              displayProduct.description &&
              displayProduct.description !==
                "Product description will appear here."
                ? "text-gray-700"
                : "text-gray-500" // Fix: max-len
            }`}
          >
            {displayProduct.description ||
              "Product description will appear here."}
          </p>
        </div>

        {/* Tags */}
        {displayProduct.tags && (
          <div>
            <h5 className="font-medium text-gray-900 mb-2 flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              Tags
            </h5>
            <div className="flex flex-wrap gap-1">
              {parseTags(displayProduct.tags).length > 0 ? (
                parseTags(displayProduct.tags).map(
                  (
                    tag, // Fix: use tag as key
                  ) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ),
                )
              ) : (
                <span className="text-gray-500 text-sm">No tags added</span>
              )}
            </div>
          </div>
        )}

        {/* Live Update Indicator */}
        {hasContent && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center text-xs text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Live preview updating...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPreview;
