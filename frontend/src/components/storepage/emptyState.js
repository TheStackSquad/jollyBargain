// frontend/src/components/storepage/emptyState.js
import React from "react";
import { Search, RefreshCw } from "lucide-react";

function EmptyState({ onClearFilters, hasFilters }) {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <Search size={48} className="mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No products found
      </h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {hasFilters
          ? "We couldn't find any products matching your current filters. Try adjusting your search criteria or clearing some filters."
          : "We couldn't find any products. Please try again later or contact support if the problem persists."}
      </p>

      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <RefreshCw size={16} />
          Clear all filters
        </button>
      )}
    </div>
  );
}

export default EmptyState;
