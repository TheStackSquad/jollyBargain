// frontend/src/components/storepage/shopFilters.js
import React, { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';

const ShopFilters = ({ 
  filters, 
  onFilterChange, 
  showFilters, 
  onHideFilters, 
  products 
}) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Calculate categories and brands from products
  useEffect(() => {
    if (products.length > 0) {
      const categoryMap = new Map();
      const brandSet = new Set();

      products.forEach(product => {
        // Count categories
        if (categoryMap.has(product.category)) {
          categoryMap.set(product.category, categoryMap.get(product.category) + 1);
        } else {
          categoryMap.set(product.category, 1);
        }

        // Collect brands
        if (product.brand) {
          brandSet.add(product.brand);
        }
      });

      const categoriesArray = [
        { id: 'all', name: 'All Products', count: products.length },
        ...Array.from(categoryMap.entries()).map(([category, count]) => ({
          id: category,
          name: category.charAt(0).toUpperCase() + category.slice(1),
          count
        }))
      ];

      setCategories(categoriesArray);
      setBrands(Array.from(brandSet).sort());
    }
  }, [products]);

  const handlePriceRangeChange = (value, index) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(value);
    onFilterChange('priceRange', newRange);
  };

  const handleBrandToggle = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange('brands', newBrands);
  };

  return (
    <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-64 flex-shrink-0`}>
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={onHideFilters}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category.id} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={filters.category === category.id}
                  onChange={(e) => onFilterChange('category', e.target.value)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {category.name} ({category.count})
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Min Price: ${filters.priceRange[0]}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(e.target.value, 0)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Max Price: ${filters.priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(e.target.value, 1)}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Brands */}
        {brands.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map(brand => (
                <label key={brand} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Rating Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating}
                  onChange={(e) => onFilterChange('rating', parseInt(e.target.value))}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <div className="ml-2 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">& up</span>
                </div>
              </label>
            ))}
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={0}
                checked={filters.rating === 0}
                onChange={(e) => onFilterChange('rating', parseInt(e.target.value))}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">All ratings</span>
            </label>
          </div>
        </div>

        {/* In Stock Filter */}
        <div>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onFilterChange('inStock', e.target.checked)}
              className="text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">In stock only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShopFilters;