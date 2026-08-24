import React from "react";
import {
  FaCalendarCheck,
  FaCheck,
  FaClock,
  FaSignInAlt,
  FaUser,
} from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const TodayCheckIns = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ==========================================
  // Get Staff Bookings
  // ==========================================
  const {
    data: todayActivity = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff-today-activity"],

    queryFn: async () => {
      const res = await axiosSecure.get("/staff/today-activity");

      return res.data;
    },
  });

  const todayCheckIns = todayActivity.checkIns || [];

  // ==========================================
  // Check-In Mutation
  // ==========================================
  const checkInMutation = useMutation({
    mutationFn: async (bookingId) => {
      const res = await axiosSecure.patch(
        `/admin/bookings/${bookingId}/check-in`,
      );

      return res.data;
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Guest Checked In",
        text: "The guest has been checked in successfully.",
        confirmButtonColor: "#aa8453",
      });

      queryClient.invalidateQueries({
        queryKey: ["staff-today-activity"],
      });
      queryClient.invalidateQueries({
        queryKey: ["staff-recent-activity"],
      });
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Check-In Failed",
        text: error?.response?.data?.message || "Failed to check in the guest.",
        confirmButtonColor: "#aa8453",
      });
    },
  });

  // ==========================================
  // Get Today's Date
  // ==========================================
  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ==========================================
  // Handle Check-In
  // ==========================================
  const handleCheckIn = (booking) => {
    Swal.fire({
      title: "Check In Guest?",
      html: `
        <div style="text-align: left;">
          <p><strong>Guest:</strong> ${booking.customerName || "N/A"}</p>

          <p><strong>Room:</strong> ${booking.roomNumber || "N/A"}</p>

          <p><strong>Room Type:</strong> ${booking.type || "N/A"}</p>

          <p><strong>Check-in:</strong> ${booking.checkIn || "N/A"}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Check In",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#aa8453",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        checkInMutation.mutate(booking._id);
      }
    });
  };

  // ==========================================
  // Loading
  // ==========================================
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-11 w-11 animate-pulse rounded-xl bg-gray-200"></div>

          <div>
            <div className="h-5 w-36 animate-pulse rounded bg-gray-200"></div>

            <div className="mt-2 h-3 w-48 animate-pulse rounded bg-gray-100"></div>
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-20 animate-pulse rounded-xl bg-gray-100"
            ></div>
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
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <p className="font-semibold text-red-600">
          Failed to load today's check-ins.
        </p>

        <p className="mt-1 text-sm text-red-500">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* ======================================
          Header
      ====================================== */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#aa8453]/10 text-[#aa8453]">
            <FaCalendarCheck />
          </div>

          <div>
            <h2 className="font-bold text-gray-800">Today's Check-Ins</h2>

            <p className="mt-1 text-xs text-gray-500">
              Guests scheduled to arrive today.
            </p>
          </div>
        </div>

        {/* Count */}
        <div className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#aa8453]/10 px-2 text-sm font-bold text-[#aa8453]">
          {todayCheckIns.length}
        </div>
      </div>

      {/* ======================================
          Content
      ====================================== */}
      <div className="p-5">
        {todayCheckIns.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 px-5 py-10 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm">
              <FaCalendarCheck />
            </div>

            <p className="font-medium text-gray-600">No check-ins today</p>

            <p className="mt-1 text-xs text-gray-400">
              There are no confirmed guest arrivals scheduled for today.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayCheckIns.map((booking) => (
              <div
                key={booking._id}
                className="rounded-xl border border-gray-100 bg-gray-50 p-4 transition hover:border-[#aa8453]/30 hover:bg-white hover:shadow-sm"
              >
                {/* Guest Information */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#aa8453]/10 text-[#aa8453]">
                      <FaUser />
                    </div>

                    {/* Details */}
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-gray-800">
                        {booking.customerName || "Unknown Guest"}
                      </h3>

                      <p className="truncate text-xs text-gray-500">
                        {booking.customerEmail || "No email"}
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span>
                          Room{" "}
                          <strong className="text-gray-700">
                            {booking.roomNumber || "N/A"}
                          </strong>
                        </span>

                        <span>•</span>

                        <span>{booking.type || "Room"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-2">
                    {booking.bookingStatus === "confirmed" && (
                      <button
                        type="button"
                        onClick={() => handleCheckIn(booking)}
                        disabled={checkInMutation.isPending}
                        className="btn btn-sm border-none bg-[#aa8453] text-white shadow-sm hover:bg-black"
                      >
                        <FaSignInAlt />

                        {checkInMutation.isPending ? "Checking..." : "Check In"}
                      </button>
                    )}

                    {booking.bookingStatus === "checked-in" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
                        <FaCheck className="text-[10px]" />
                        Checked In
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayCheckIns;
