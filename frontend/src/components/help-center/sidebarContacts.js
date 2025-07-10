import React from 'react';

const SidebarContact = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-2 font-jetbrain">Still Need Help?</h3>
      <p className="text-blue-100 mb-4 font-roboto">
        Can't find what you're looking for? Our support team is here to help.
      </p>
      <a
        href="/contact"
        className="inline-block w-full text-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-roboto font-medium"
      >
        Contact Support
      </a>
    </div>
  );
};

export default SidebarContact;