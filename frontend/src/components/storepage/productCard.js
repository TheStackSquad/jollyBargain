// frontend/src/components/storepage/productCard.js

import React from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../reduxStore/cart/cartSlice";

// --- StarRating Component ---
function StarRating({ rating, size = 16 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const renderStars = () => {
    const starsArray = [];

    // Add full stars
    for (let i = 0; i < fullStars; i += 1) {
      starsArray.push(
        <Star
          key={`full-${i}`}
          size={size}
          fill="currentColor"
          className="text-yellow-400"
        />,
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      starsArray.push(
        <Star
          key="half"
          size={size}
          fill="currentColor"
          className="text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />,
      );
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i += 1) {
      starsArray.push(
        <Star
          key={`empty-${i}`}
          size={size}
          fill="none"
          className="text-gray-300"
        />,
      );
    }

    return starsArray;
  };

  return <div className="flex items-center">{renderStars()}</div>;
} // Closing brace for StarRating component

function ProductCard({ product, viewMode = "grid" }) {
  const dispatch = useDispatch();

  const {
    _id,
    title,
    images,
    price,
    originalPrice,
    rating,
    brand = "Unknown Brand",
    reviews = 0,
    discount,
  } = product;

  const mainImageUrl =
    images && images.length > 0
      ? images[0].url
      : "https://placehold.co/100x100/E0E7FF/4F46E5?text=No+Image";

  let badge = null;
  if (discount && discount > 0) {
    badge = "Sale";
  }

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
    console.log(`Dispatched: Added "${title}" to cart.`);
  };

  const handleToggleWishlist = () => {
    console.log(
      `Wishlist toggle for product ID: ${_id} (functionality coming soon via Redux)`,
    );
  };

  const displayRating = parseFloat(rating) || 0;

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="flex">
          <div className="w-48 h-48 flex-shrink-0 relative overflow-hidden">
            <img
              src={mainImageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            {badge && (
              <span
                className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
                  badge === "Sale"
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {badge}
              </span>
            )}
          </div>

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {title}
                </h3>
                <p className="text-gray-500 mb-2">{brand}</p>
                <div className="flex items-center mb-2">
                  <StarRating rating={displayRating} size={16} />
                  <span className="text-sm text-gray-500 ml-1">
                    ({reviews})
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleWishlist}
                className={`p-2 rounded-full transition-colors ${
                  false // Replace with actual isInWishlist from Redux state later
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart size={20} fill={false ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${price}
                </span>
                {originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${originalPrice}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={mainImageUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {badge && (
          <span
            className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
              badge === "Sale"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {badge}
          </span>
        )}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
            false // Replace with actual isInWishlist from Redux state later
              ? "bg-red-500 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Heart size={16} fill={false ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{brand}</p>

        <div className="flex items-center mb-2">
          <StarRating rating={displayRating} size={12} />
          <span className="text-sm text-gray-500 ml-1">({reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">${price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
