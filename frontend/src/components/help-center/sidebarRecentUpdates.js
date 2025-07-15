import React from "react";

function SidebarRecentUpdates() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 font-jetbrain">
        Recent Updates
      </h3>
      <div className="space-y-3">
        <div className="text-sm">
          <p className="text-gray-700 font-roboto font-medium">
            New return policy
          </p>
          <p className="text-gray-500 font-roboto">Updated 2 days ago</p>
        </div>
        <div className="text-sm">
          <p className="text-gray-700 font-roboto font-medium">
            Mobile app improvements
          </p>
          <p className="text-gray-500 font-roboto">Updated 1 week ago</p>
        </div>
      </div>
    </div>
  );
}

export default SidebarRecentUpdates;
