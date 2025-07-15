// frontend/src/components/storepage/shopHeader.js
import React from "react";
import { Search, ShoppingCart } from "lucide-react";

function ShopHeader({ searchQuery, onSearchChange, cartCount }) {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-gray-900">Shop Now</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Cart ({cartCount})</span>
              <ShoppingCart className="text-gray-600" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopHeader;
