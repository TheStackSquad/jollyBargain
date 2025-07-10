import React from 'react';

const QuickLinks = ({ quickLinks }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 font-jetbrain">Quick Links</h3>
      <div className="space-y-3">
        {quickLinks.map((link, index) => {
          const IconComponent = link.icon;
          return (
            <a
              key={index}
              href={link.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors font-roboto"
            >
              <IconComponent size={18} className={link.color} />
              <span className="text-gray-700">{link.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinks;