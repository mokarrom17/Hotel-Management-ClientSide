import React, { useMemo, useState } from "react";
import {
  FaCalendarCheck,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { MdEmail, MdMeetingRoom } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import BookingDetailsModal from "../../Component/BookingDetailsModal/BookingDetailsModal";

const MyBookingHistory = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const itemsPerPage = 8;

  // ==========================================
  // Get Staff Booking History
  // ==========================================
  const {
    data: histories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff-booking-history"],

    queryFn: async () => {
      const res = await axiosSecure.get("/staff/booking-history");

      return res.data;
    },
  });

  // ==========================================
  // Search
  // ==========================================
  const filteredHistories = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return histories;
    }

    return histories.filter((booking) => {
      return (
        booking.customerName?.toLowerCase().includes(value) ||
        booking.customerEmail?.toLowerCase().includes(value) ||
        booking.roomNumber?.toLowerCase().includes(value) ||
        booking.roomType?.toLowerCase().includes(value) ||
        booking.bookingId?.toLowerCase().includes(value)
      );
    });
  }, [histories, search]);

  // ==========================================
  // Pagination
  // ==========================================
  const totalPages = Math.ceil(filteredHistories.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentHistories = filteredHistories.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // ==========================================
  // Search Handler
  // ==========================================
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // ==========================================
  // Format Date
  // ==========================================
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // Loading
  // ==========================================
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-11 w-11 animate-pulse rounded-xl bg-gray-200" />

          <div>
            <div className="h-5 w-44 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-3 w-56 animate-pulse rounded bg-gray-100" />
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
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
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <p className="font-semibold text-red-600">
          Failed to load your booking history.
        </p>

        <p className="mt-1 text-sm text-red-500">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ======================================
          Header
      ====================================== */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c49b63]/10 text-[#c49b63]">
              <FaCalendarCheck className="text-lg" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800">
                My Booking History
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                View the completed bookings handled by you.
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="rounded-xl bg-[#c49b63]/10 px-4 py-3 text-center">
            <p className="text-xs font-medium text-gray-500">My Completed</p>

            <p className="text-xl font-bold text-[#c49b63]">
              {histories.length}
            </p>
          </div>
        </div>
      </div>

      {/* ======================================
          Search
      ====================================== */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search guest, email, room..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#c49b63] focus:bg-white"
            />
          </div>

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredHistories.length}
            </span>{" "}
            booking
            {filteredHistories.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* ======================================
          Empty State
      ====================================== */}
      {currentHistories.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <FaCalendarCheck className="text-xl" />
          </div>

          <h3 className="font-semibold text-gray-700">
            {search
              ? "No matching booking history"
              : "No completed bookings yet"}
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            {search
              ? "Try searching with a different keyword."
              : "Your completed bookings will appear here."}
          </p>
        </div>
      ) : (
        <>
          {/* ======================================
                Desktop Table
                ====================================== */}
          <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                {/* ==================================
          Table Header
      ================================== */}
                <thead>
                  <tr className="border-b border-gray-200 bg-[#faf8f4]">
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Guest
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Room
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Stay
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Total
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Check-In
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Check-Out
                    </th>

                    <th className="px-5 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-5 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                {/* ==================================
          Table Body
      ================================== */}
                <tbody className="divide-y divide-gray-100">
                  {currentHistories.map((booking) => (
                    <tr
                      key={booking.bookingId}
                      className="group transition-all duration-200 hover:bg-[#fcfaf7]"
                    >
                      {/* ==================================
                Guest
            ================================== */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c49b63]/10 text-[#b58b55]">
                            <FaUser className="text-sm" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-gray-800">
                              {booking.customerName || "Unknown Guest"}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                              <MdEmail className="shrink-0" />

                              <span className="max-w-[190px] truncate">
                                {booking.customerEmail || "No email"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* ==================================
                Room
            ================================== */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#c49b63]/10 text-[#b58b55]">
                            <MdMeetingRoom className="text-base" />
                          </div>

                          <div>
                            <p className="text-sm font-bold text-gray-800">
                              {booking.roomNumber || "N/A"}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              {booking.roomType || "Room"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* ==================================
                Stay
            ================================== */}
                      <td className="px-5 py-5">
                        <div className="min-w-[145px]">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-semibold text-gray-700">
                              {formatDate(booking.checkIn)}
                            </span>

                            <span className="text-gray-300">→</span>

                            <span className="font-semibold text-gray-700">
                              {formatDate(booking.checkOut)}
                            </span>
                          </div>

                          <div className="mt-1.5">
                            <span className="rounded-md bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-500">
                              {booking.nights || 0} night
                              {booking.nights !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* ==================================
                Total
            ================================== */}
                      <td className="px-5 py-5">
                        <div>
                          <p className="text-sm font-bold text-gray-800">
                            ${Number(booking.totalPrice || 0).toFixed(2)}
                          </p>

                          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                            Paid
                          </span>
                        </div>
                      </td>

                      {/* ==================================
                Check-In
            ================================== */}
                      <td className="px-5 py-5">
                        <div className="min-w-[150px]">
                          <p className="max-w-[150px] truncate text-xs font-semibold text-gray-700">
                            {booking.checkedInBy || "N/A"}
                          </p>

                          <p className="mt-1 text-[11px] text-gray-400">
                            {formatDate(booking.checkedInAt)}
                          </p>
                        </div>
                      </td>

                      {/* ==================================
                Check-Out
            ================================== */}
                      <td className="px-5 py-5">
                        <div className="min-w-[150px]">
                          <p className="max-w-[150px] truncate text-xs font-semibold text-gray-700">
                            {booking.checkedOutBy || "N/A"}
                          </p>

                          <p className="mt-1 text-[11px] text-gray-400">
                            {formatDate(booking.checkedOutAt)}
                          </p>
                        </div>
                      </td>

                      {/* ==================================
                Status
            ================================== */}
                      <td className="px-5 py-5 text-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-bold text-green-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                          Completed
                        </span>
                      </td>
                      {/* ==================================
                Action
            ================================== */}
                      <td className="px-5 py-5 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedBooking(booking)}
                          className="rounded-lg border border-[#c49b63]/30 bg-[#c49b63]/5 px-3 py-2 text-xs font-semibold text-[#b58b55] transition hover:bg-[#c49b63] hover:text-white"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ======================================
              Mobile Cards
          ====================================== */}
          <div className="space-y-3 lg:hidden">
            {currentHistories.map((booking) => (
              <div
                key={booking.bookingId}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c49b63]/10 text-[#c49b63]">
                      <FaUser />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-gray-800">
                        {booking.customerName || "Unknown Guest"}
                      </h3>

                      <p className="truncate text-xs text-gray-500">
                        {booking.customerEmail || "No email"}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-semibold text-green-700">
                    Completed
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-3 text-xs">
                  <div>
                    <p className="text-gray-400">Room</p>

                    <p className="mt-1 font-semibold text-gray-700">
                      {booking.roomNumber || "N/A"}
                    </p>

                    <p className="text-gray-400">
                      {booking.roomType || "Room"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Total</p>

                    <p className="mt-1 font-bold text-gray-800">
                      ${Number(booking.totalPrice || 0).toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Check-in</p>

                    <p className="mt-1 font-medium text-gray-700">
                      {formatDate(booking.checkIn)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Check-out</p>

                    <p className="mt-1 font-medium text-gray-700">
                      {formatDate(booking.checkOut)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-400">Handled By</p>

                  <p className="mt-1 truncate text-xs font-medium text-gray-700">
                    Check-in: {booking.checkedInBy || "N/A"}
                  </p>

                  <p className="mt-1 truncate text-xs font-medium text-gray-700">
                    Check-out: {booking.checkedOutBy || "N/A"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBooking(booking)}
                  className="mt-3 w-full rounded-xl border border-[#c49b63]/30 bg-[#c49b63]/5 py-2.5 text-xs font-bold text-[#b58b55] transition hover:bg-[#c49b63] hover:text-white"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* ======================================
              Pagination
          ====================================== */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs text-gray-500">
                Page{" "}
                <span className="font-semibold text-gray-700">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                  {totalPages}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaChevronLeft className="text-xs" />
                </button>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        formatDate={formatDate}
      />
    </div>
  );
};

export default MyBookingHistory;
