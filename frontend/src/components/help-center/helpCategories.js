import React from 'react';

const HelpCategories = ({ helpCategories, expandedSection, toggleSection, AnimatedP, ChevronRightIcon, ChevronDownIcon }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 font-jetbrain">Help Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {helpCategories.map((category, index) => {
          const IconComponent = category.icon;
          const isExpanded = expandedSection === category.id;
          
          return (
            <AnimatedP
              key={category.id}
              className={`${category.bgColor} rounded-xl p-6 transition-all duration-300 hover:shadow-lg`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection(category.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-white ${category.color}`}>
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 font-jetbrain">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-roboto">
                      {category.description}
                    </p>
                  </div>
                </div>
                {isExpanded ? 
                  <ChevronDownIcon size={20} className="text-gray-600" /> : 
                  <ChevronRightIcon size={20} className="text-gray-600" />
                }
              </div>
              
              {isExpanded && (
                <div className="mt-4 space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <a
                      key={articleIndex}
                      href={article.url}
                      className="flex items-center justify-between p-3 text-gray-700 hover:text-blue-600 hover:bg-white rounded-lg transition-colors font-roboto"
                    >
                      <span className="flex items-center gap-2">
                        {article.title}
                        {article.popular && (
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </span>
                      <ChevronRightIcon size={16} className="text-gray-400" />
                    </a>
                  ))}
                </div>
              )}
            </AnimatedP>
          );
        })}
      </div>
    </div>
  );
};

export default HelpCategories;