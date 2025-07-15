import React from "react";

function SidebarSystemStatus({ CheckCircleIcon }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 font-jetbrain">
        System Status
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <CheckCircleIcon className="text-green-500" size={20} />
          <div>
            <p className="text-gray-700 font-roboto font-medium">
              All systems operational
            </p>
            <p className="text-sm text-gray-500 font-roboto">
              Last updated: Just now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarSystemStatus;
