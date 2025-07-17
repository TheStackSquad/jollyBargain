// frontend/src/components/storepage/productGrid.js
import React from "react";
import ProductCard from "./productCard";

function ProductGrid({
  viewMode,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  products, // This prop should be used
  isLoading, // This prop should be used
}) {
  // Use the isLoading prop passed from the parent
  if (isLoading && products.length === 0) {
    // console.log(
    //   "Displaying ProductCardSkeletons: isLoading is true and products array is empty.",
    // );
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <ProductCardSkeleton key={`product-skeleton-${index}`} />
        ))}
      </div>
    );
  }

  // console.log("Products successfully loaded. Displaying ProductGrid.");
  return (
    <div
      className={`grid gap-6 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      }`}
    >
      {products.map(
        (
          product, // Use the products prop here
        ) => (
          <ProductCard
            key={product._id}
            product={product}
            viewMode={viewMode}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isInWishlist={wishlist.includes(product._id)}
          />
        ),
      )}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300" />
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2" />
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-2" />
        <div className="h-3 bg-gray-300 rounded w-1/3 mb-3" />
        <div className="h-10 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export default ProductGrid;
