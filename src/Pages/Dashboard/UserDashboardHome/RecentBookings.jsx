import { FaBed, FaCalendarAlt, FaEye } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useState } from "react";
import BookingDetailsModal from "./BookingDetailsModal";

const RecentBookings = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedBooking, setSelectedBooking] = useState(null);

  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-recent-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/recent-bookings");
      return res.data;
    },
  });

  const getStatusStyle = (status) => {
    if (status === "confirmed") {
      return "bg-blue-50 text-blue-600";
    }

    if (status === "completed") {
      return "bg-green-50 text-green-600";
    }

    if (status === "cancelled") {
      return "bg-red-50 text-red-600";
    }

    return "bg-gray-50 text-gray-600";
  };

  const getPaymentStyle = (payment) => {
    if (payment === "paid") {
      return "bg-green-50 text-green-600";
    }

    return "bg-yellow-50 text-yellow-600";
  };

  // Loading
  if (isLoading) {
    return (
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />

        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
        Failed to load recent bookings.
      </div>
    );
  }

  // Empty
  if (!bookings.length) {
    return (
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <FaCalendarAlt className="mx-auto text-3xl text-gray-300" />

        <h2 className="mt-3 text-lg font-bold text-gray-800">
          No Recent Bookings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          You don't have any bookings yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Recent Bookings</h2>

          <p className="mt-1 text-sm text-gray-500">
            Your latest hotel bookings
          </p>
        </div>

        <button className="text-sm font-semibold text-[#c49b63] transition hover:opacity-80">
          View All
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 text-left text-sm text-gray-500">
              <th className="px-6 py-4 font-medium">Booking</th>
              <th className="px-6 py-4 font-medium">Room</th>
              <th className="px-6 py-4 font-medium">Stay</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Payment</th>
              <th className="px-6 py-4 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b border-gray-50 transition hover:bg-gray-50"
              >
                {/* Booking */}
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-800">
                    {booking._id.slice(0, 8)}...
                  </p>
                </td>

                {/* Room */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#c49b63]/10 text-[#c49b63]">
                      <FaBed />
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {booking.type}
                      </p>

                      <p className="text-xs text-gray-500">
                        Room {booking.roomNumber}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Stay */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm">
                    <FaCalendarAlt className="text-[#c49b63]" />

                    <div>
                      <p className="text-gray-700">{booking.checkIn}</p>

                      <p className="text-xs text-gray-400">
                        to {booking.checkOut}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                      booking.bookingStatus,
                    )}`}
                  >
                    {booking.bookingStatus || "pending"}
                  </span>
                </td>

                {/* Payment */}
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getPaymentStyle(
                      booking.paymentStatus,
                    )}`}
                  >
                    {booking.paymentStatus || "pending"}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#c49b63] hover:text-[#c49b63]"
                    title="View Booking"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 p-4 md:hidden">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="rounded-lg border border-gray-100 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-gray-800">
                  {booking._id.slice(0, 8)}...
                </p>

                <p className="mt-1 font-medium text-gray-700">{booking.type}</p>

                <p className="text-xs text-gray-500">
                  Room {booking.roomNumber}
                </p>
              </div>

              <Link to="/dashboard/my-bookings">
                {" "}
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500"
                  title="View Booking"
                >
                  <FaEye />
                </button>
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-400">Check In</p>
                <p className="mt-1 text-gray-700">{booking.checkIn}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Check Out</p>
                <p className="mt-1 text-gray-700">{booking.checkOut}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                  booking.bookingStatus,
                )}`}
              >
                {booking.bookingStatus || "pending"}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getPaymentStyle(
                  booking.paymentStatus,
                )}`}
              >
                {booking.paymentStatus || "pending"}
              </span>
            </div>
          </div>
        ))}
      </div>
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default RecentBookings;
