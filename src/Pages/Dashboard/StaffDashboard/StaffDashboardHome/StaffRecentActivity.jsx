import React from "react";
import { FaClock } from "react-icons/fa";

const StaffRecentActivity = () => {
  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="font-bold text-gray-800">Recent Activity</h2>

        <p className="mt-1 text-xs text-gray-500">
          Your recent hotel activities
        </p>
      </div>

      <div className="flex min-h-[150px] items-center justify-center px-5 py-8 text-center">
        <div>
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <FaClock />
          </div>

          <p className="font-medium text-gray-600">No recent activity</p>

          <p className="mt-1 text-sm text-gray-400">
            Your recent activities will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffRecentActivity;
