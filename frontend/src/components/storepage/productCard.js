// frontend/src/components/storepage/productCard.js
import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';

const ProductCard = ({ 
  product, 
  viewMode = 'grid', 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist 
}) => {
  // Destructure product properties for easier access and clarity
  const { 
    _id, // Use _id from the API response
    title, // This is the product name
    images, // Array of image objects
    price,
    originalPrice, // This exists in your data
    rating,
    // Assuming 'brand' is available, if not, you'll need to add it to your product schema or derive it.
    // For now, let's assume it might be on the product object or you can add a placeholder.
    // For demonstration, let's use a placeholder if brand isn't coming from API
    brand = 'Unknown Brand', 
    // reviews count is not in your log data.
    // If you need it, your backend should provide it or you can derive it from a separate reviews array.
    // For now, let's use a placeholder or remove it if not relevant.
    reviews = 0, // Placeholder
    discount // Use discount to determine badge if needed
  } = product;

  // Determine the main image URL
  const mainImageUrl = images && images.length > 0 ? images[0].url : 'path/to/placeholder-image.jpg'; 
  // Make sure you have a default placeholder image path

  // Determine badge based on discount or other criteria
  let badge = null;
  if (discount && discount > 0) {
    badge = 'Sale';
  } 
  // You can add more conditions for 'New', 'Featured', etc. if your API provides flags for them.

  const handleAddToCart = () => {
    // Pass the entire product object or just its _id
    onAddToCart(product); 
  };

  const handleToggleWishlist = () => {
    // Use _id for wishlist operations
    onToggleWishlist(_id); 
  };

  // Convert rating to a number to ensure Math.floor works correctly
  const displayRating = parseFloat(rating) || 0;


  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="flex">
          <div className="w-48 h-48 flex-shrink-0 relative overflow-hidden">
            <img 
              src={mainImageUrl} 
              alt={title} // Use title here
              className="w-full h-full object-cover"
            />
            {badge && ( // Use the dynamically determined badge
              <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
                badge === 'Sale' ? 'bg-red-500 text-white' : 'bg-green-500 text-white' // Adjust colors based on badge type
              }`}>
                {badge}
              </span>
            )}
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3> {/* Use title */}
                <p className="text-gray-500 mb-2">{brand}</p> {/* Use brand */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < Math.floor(displayRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({reviews})</span> {/* Use reviews */}
                </div>
              </div>
              
              <button
                onClick={handleToggleWishlist}
                className={`p-2 rounded-full transition-colors ${
                  isInWishlist 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">${price}</span> {/* Use price */}
                {originalPrice && ( // Use originalPrice
                  <span className="text-lg text-gray-500 line-through">${originalPrice}</span>
                )}
              </div>
              
              <button
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
          alt={title} // Use title
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {badge && ( // Use dynamically determined badge
          <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
            badge === 'Sale' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}>
            {badge}
          </span>
        )}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
            isInWishlist 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3> {/* Use title */}
        <p className="text-sm text-gray-500 mb-2">{brand}</p> {/* Use brand */}
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < Math.floor(displayRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">({reviews})</span> {/* Use reviews */}
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">${price}</span> {/* Use price */}
            {originalPrice && ( // Use originalPrice
              <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
            )}
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;