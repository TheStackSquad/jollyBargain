import React from "react";
import { ArrowLeft } from "lucide-react";

function HelpHeader({ onBackClick }) {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            type="submit"
            onClick={onBackClick}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800
            transition-colors font-roboto"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          <div className="hidden md:block text-gray-400">|</div>
          <h1 className="hidden md:block text-lg font-semibold text-gray-800 font-jetbrain">
            Help Center
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HelpHeader;
