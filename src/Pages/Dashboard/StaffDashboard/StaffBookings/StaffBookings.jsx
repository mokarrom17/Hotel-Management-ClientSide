import React from "react";
import {
  FaCalendarCheck,
  FaCheck,
  FaClock,
  FaEye,
  FaHotel,
  FaMoneyBillWave,
  FaUser,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const StaffBookings = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff-bookings"],

    queryFn: async () => {
      const res = await axiosSecure.get("/staff/bookings");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[500px] bg-gray-50 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 h-20 animate-pulse rounded-2xl bg-gray-200" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>

          <div className="mt-6 h-96 animate-pulse rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-gray-50 p-6">
        <div className="rounded-2xl border border-red-100 bg-red-50 px-8 py-6 text-center">
          <p className="font-semibold text-red-600">Failed to load bookings.</p>

          <p className="mt-1 text-sm text-red-500">Please try again later.</p>
        </div>
      </div>
    );
  }

  const pendingBookings = bookings.filter(
    (booking) => booking.bookingStatus === "pending",
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.bookingStatus === "confirmed",
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#aa8453] text-white shadow-sm">
              <FaCalendarCheck className="text-xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                Manage Bookings
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                View and manage active hotel bookings.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Bookings</p>

                <h2 className="mt-1 text-3xl font-bold text-gray-800">
                  {bookings.length}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#aa8453]/10 text-[#aa8453]">
                <FaHotel />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>

                <h2 className="mt-1 text-3xl font-bold text-yellow-600">
                  {pendingBookings}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <FaClock />
              </div>
            </div>
          </div>

          {/* Confirmed */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Confirmed</p>

                <h2 className="mt-1 text-3xl font-bold text-green-600">
                  {confirmedBookings}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FaCheck />
              </div>
            </div>
          </div>
        </div>

        {/* Booking Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Table Header */}
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="font-semibold text-gray-800">Active Bookings</h2>

            <p className="mt-1 text-xs text-gray-500">
              Manage current customer reservations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-50 text-gray-600">
                  <th>#</th>
                  <th>Customer</th>
                  <th>Room</th>
                  <th>Stay</th>
                  <th>Booking Status</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                          <FaCalendarCheck className="text-xl" />
                        </div>

                        <p className="font-medium text-gray-600">
                          No active bookings found.
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          There are currently no pending or confirmed bookings.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking, index) => (
                    <tr
                      key={booking._id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Number */}
                      <td className="font-medium text-gray-500">{index + 1}</td>

                      {/* Customer */}
                      <td>
                        <div className="flex min-w-[180px] items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#aa8453]/10 text-[#aa8453]">
                            <FaUser />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {booking.customerName || "N/A"}
                            </p>

                            <p className="text-xs text-gray-500">
                              {booking.customerEmail || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Room */}
                      <td>
                        <div className="min-w-[150px]">
                          <p className="font-semibold text-gray-800">
                            {booking.roomNumber || "N/A"}
                          </p>

                          <p className="text-xs text-gray-500">
                            {booking.type || "Room"}
                          </p>
                        </div>
                      </td>

                      {/* Stay */}
                      <td>
                        <div className="min-w-[150px]">
                          <p className="text-sm font-medium text-gray-700">
                            {booking.checkIn || "N/A"}
                          </p>

                          <p className="text-xs text-gray-400">to</p>

                          <p className="text-sm font-medium text-gray-700">
                            {booking.checkOut || "N/A"}
                          </p>
                        </div>
                      </td>

                      {/* Booking Status */}
                      <td>
                        {booking.bookingStatus === "pending" && (
                          <span className="badge badge-warning  gap-1 rounded-full px-3 py-3 font-medium">
                            <FaClock />
                            Pending
                          </span>
                        )}

                        {booking.bookingStatus === "confirmed" && (
                          <span className="badge badge-success gap-1 rounded-full px-3 py-3 font-medium">
                            <FaCheck />
                            Confirmed
                          </span>
                        )}

                        {booking.bookingStatus !== "pending" &&
                          booking.bookingStatus !== "confirmed" && (
                            <span className="badge rounded p-2">
                              {booking.bookingStatus || "Unknown"}
                            </span>
                          )}
                      </td>

                      {/* Payment */}
                      <td>
                        {booking.paymentStatus === "paid" ? (
                          <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                            <FaMoneyBillWave />
                            Paid
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-yellow-600">
                            {booking.paymentStatus || "Pending"}
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm border-none bg-[#aa8453] text-white shadow-sm hover:bg-black"
                        >
                          <FaEye />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffBookings;
