import React from "react";
import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaClipboardCheck,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const StaffStats = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stats = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/dashboard-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl bg-gray-200"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
        Failed to load dashboard statistics.
      </div>
    );
  }

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* Total Bookings */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Bookings</p>

            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              {stats.totalBookings || 0}
            </h2>

            <p className="mt-1 text-xs text-gray-400">All bookings</p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#aa8453]/10 text-[#aa8453]">
            <FaCalendarCheck className="text-xl" />
          </div>
        </div>
      </div>

      {/* Pending */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pending Bookings</p>

            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              {stats.pendingBookings || 0}
            </h2>

            <p className="mt-1 text-xs text-gray-400">Awaiting action</p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
            <FaClock className="text-xl" />
          </div>
        </div>
      </div>

      {/* Confirmed */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Confirmed Bookings</p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {stats.confirmedBookings || 0}
            </h2>

            <p className="mt-1 text-xs text-gray-400">Confirmed reservations</p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <FaCheckCircle className="text-xl" />
          </div>
        </div>
      </div>

      {/* Completed */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Completed Bookings</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {stats.completedBookings || 0}
            </h2>

            <p className="mt-1 text-xs text-gray-400">Completed stays</p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FaClipboardCheck className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffStats;
