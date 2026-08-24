import React from "react";
import {
  FaCheck,
  FaClock,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const StaffRecentActivity = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: activities = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff-recent-activity"],

    queryFn: async () => {
      const res = await axiosSecure.get("/staff/recent-activity");

      return res.data;
    },
  });

  // ==========================================
  // Format Relative Time
  // ==========================================
  const getRelativeTime = (timestamp) => {
    if (!timestamp) return "";

    const now = new Date();
    const activityTime = new Date(timestamp);

    const diffInSeconds = Math.floor((now - activityTime) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  };

  // ==========================================
  // Loading
  // ==========================================
  if (isLoading) {
    return (
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-11 w-11 animate-pulse rounded-xl bg-gray-200" />

          <div>
            <div className="h-5 w-36 animate-pulse rounded bg-gray-200" />

            <div className="mt-2 h-3 w-48 animate-pulse rounded bg-gray-100" />
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================
  if (isError) {
    return (
      <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-6">
        <p className="font-semibold text-red-600">
          Failed to load recent activity.
        </p>

        <p className="mt-1 text-sm text-red-500">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* ======================================
          Header
      ====================================== */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div>
          <h2 className="font-bold text-gray-800">Recent Activity</h2>

          <p className="mt-1 text-xs text-gray-500">
            Your recent hotel activities
          </p>
        </div>

        {activities.length > 0 && (
          <div className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#aa8453]/10 px-2 text-sm font-bold text-[#aa8453]">
            {activities.length}
          </div>
        )}
      </div>

      {/* ======================================
          Empty State
      ====================================== */}
      {activities.length === 0 ? (
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
      ) : (
        /* ======================================
           Activity List
        ====================================== */
        <div className="divide-y divide-gray-100">
          {activities.map((activity) => {
            const isCheckIn = activity.type === "check-in";

            return (
              <div
                key={activity.id}
                className="flex items-center gap-4 px-5 py-4 transition hover:bg-gray-50"
              >
                {/* Activity Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    isCheckIn
                      ? "bg-blue-50 text-blue-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {isCheckIn ? <FaSignInAlt /> : <FaSignOutAlt />}
                </div>

                {/* Activity Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <FaCheck
                      className={
                        isCheckIn
                          ? "text-[10px] text-blue-500"
                          : "text-[10px] text-green-500"
                      }
                    />

                    <p className="text-sm font-semibold text-gray-800">
                      {isCheckIn ? "Checked in" : "Checked out"}{" "}
                      <span className="font-bold">
                        {activity.customerName || "Unknown Guest"}
                      </span>
                    </p>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaUser className="text-[10px]" />
                      Room{" "}
                      <strong className="text-gray-700">
                        {activity.roomNumber || "N/A"}
                      </strong>
                    </span>

                    <span>•</span>

                    <span>{getRelativeTime(activity.timestamp)}</span>
                  </div>
                </div>

                {/* Activity Status */}
                <span
                  className={`hidden rounded-full px-3 py-1.5 text-[10px] font-bold sm:inline-flex ${
                    isCheckIn
                      ? "bg-blue-50 text-blue-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {isCheckIn ? "CHECK-IN" : "CHECK-OUT"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StaffRecentActivity;
