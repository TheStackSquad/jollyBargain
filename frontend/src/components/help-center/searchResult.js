import React from "react";

function SearchResults({
  searchResults,
  isSearching,
  toggleSection,
  BookIcon,
  AlertCircleIcon,
  ChevronRightIcon,
}) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 font-jetbrain">
        {isSearching
          ? "Searching..."
          : `Search Results (${searchResults.length})`}
      </h2>
      {searchResults.length > 0 ? (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="space-y-4">
            {searchResults.map((result) => (
              <div
                key={result.id || `${result.title}-${result.type}`}
                className="flex items-start gap-4 p-4 rounded-lg
                hover:bg-gray-50 transition-colors"
              >
                {result.type === "category" ? (
                  <>
                    <div
                      className={`p-2 rounded-lg bg-gray-100 ${result.color}`}
                    >
                      <result.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 font-jetbrain">
                        {result.title}
                      </h3>
                      <p className="text-gray-600 font-roboto">
                        {result.description}
                      </p>
                      <button
                        // FIX: Added explicit type="button"
                        type="button"
                        onClick={() => toggleSection(result.id)}
                        className="text-blue-600 hover:text-blue-700 font-roboto mt-2"
                      >
                        Browse articles in this category
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                      <BookIcon size={20} />
                    </div>
                    <div className="flex-1">
                      <a
                        href={result.url}
                        className="text-lg font-semibold text-gray-800
                        hover:text-blue-600 font-jetbrain"
                      >
                        {result.title}
                        {result.popular && (
                          <span
                            className="ml-2 text-xs bg-orange-100
                          text-orange-600 px-2 py-1 rounded-full"
                          >
                            Popular
                          </span>
                        )}
                      </a>
                      <p className="text-gray-600 font-roboto">
                        in {result.category}
                      </p>
                    </div>
                    <ChevronRightIcon
                      size={16}
                      className="text-gray-400 mt-1"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        !isSearching && (
          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <AlertCircleIcon className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2 font-jetbrain">
              No results found
            </h3>
            <p className="text-gray-600 font-roboto">
              Try searching with different keywords or browse our help
              categories below.
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default SearchResults;
