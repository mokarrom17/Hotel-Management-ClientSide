import React from "react";
import { FaClipboardList } from "react-icons/fa";

const StaffResponsibilities = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div>
          <h2 className="font-bold text-gray-800">Today's Responsibilities</h2>

          <p className="mt-1 text-xs text-gray-500">
            Your assigned tasks for today
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#aa8453]/10 text-[#aa8453]">
          <FaClipboardList />
        </div>
      </div>

      <div className="p-5">
        <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <FaClipboardList className="text-xl" />
          </div>

          <h3 className="font-semibold text-gray-700">No tasks assigned yet</h3>

          <p className="mt-1 max-w-sm text-sm text-gray-400">
            Your assigned bookings and tasks will appear here when they are
            available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffResponsibilities;
