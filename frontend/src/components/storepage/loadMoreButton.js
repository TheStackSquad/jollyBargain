// frontend/src/components/storepage/loadMoreButton.js
import React from "react";
import { Loader2 } from "lucide-react";

function LoadMoreButton({ onLoadMore, hasMore, isLoading }) {
  if (!hasMore) {
    return (
      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          You&apos;ve reached the end of the products
        </p>
      </div>
    );
  }

  return (
    <div className="text-center mt-8">
      <button
        type="submit"
        onClick={onLoadMore}
        disabled={isLoading}
        className="inline-flex items-center gap-2 bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Loading...
          </>
        ) : (
          "Load More Products"
        )}
      </button>
    </div>
  );
}

export default LoadMoreButton;
