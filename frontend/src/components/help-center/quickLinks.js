// frontend/src/components/help-center/quickLinks.js

import React from "react";

function QuickLinks({ quickLinks }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 font-jetbrain">
        Quick Links
      </h3>
      <div className="space-y-3">
        {quickLinks.map((link) => {
          // It's best to have a unique ID for each link object.
          // If not available, you might generate one or use a combination of properties
          // that are guaranteed to be unique for each link.
          // For now, let's assume 'link.href' or 'link.title' could be unique enough if no actual ID exists.
          // Ideally, 'link.id' should be provided from your data source.
          const uniqueKey = link.href || link.title; // Fallback if no specific ID

          const IconComponent = link.icon;
          return (
            <a
              key={uniqueKey} // Use a unique and stable property as the key
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
}

export default QuickLinks;
