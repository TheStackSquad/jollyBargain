import React from "react";

function PopularArticles({ popularArticles, AnimatedP, ChevronRightIcon }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 font-jetbrain">
        Popular Articles
      </h2>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="space-y-3">
          {popularArticles.map(
            (
              article, // Removed index from map if not used
            ) => (
              <AnimatedP
                key={article.id || article._id || article.title} // Use a unique ID if available, otherwise a stable property
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50
              transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: popularArticles.indexOf(article) * 0.1,
                }} // Use indexOf for delay if index is not passed
              >
                <div>
                  <a
                    href={article.url}
                    className="text-gray-800 hover:text-blue-600 font-roboto font-medium"
                  >
                    {article.title}
                  </a>
                  <p className="text-sm text-gray-500 font-roboto">
                    in {article.category}
                  </p>
                </div>
                <ChevronRightIcon size={16} className="text-gray-400" />
              </AnimatedP>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default PopularArticles;
