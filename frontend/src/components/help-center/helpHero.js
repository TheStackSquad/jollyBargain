import React from 'react';

const HelpHero = ({ searchQuery, setSearchQuery, AnimatedP, SearchIcon }) => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedP
          className="text-4xl md:text-5xl font-bold mb-6 font-jetbrain"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How can we help you?
        </AnimatedP>
        <AnimatedP
          className="text-xl mb-8 text-blue-100 font-roboto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Search for answers or browse our help categories below
        </AnimatedP>
        
        <AnimatedP
          className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for help articles, topics, or questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 font-roboto"
          />
        </AnimatedP>
      </div>
    </section>
  );
};

export default HelpHero;