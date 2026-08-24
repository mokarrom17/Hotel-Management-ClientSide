import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const BookingDetailsModal = ({ booking, onClose, formatDate }) => {
  if (!booking) return null;

  const formatDateTime = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ======================================
            Header
        ====================================== */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Booking Details</h2>

            <p className="mt-1 text-xs text-gray-400">
              Booking ID: {booking.bookingId}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-500 transition hover:bg-gray-200"
          >
            ×
          </button>
        </div>

        {/* ======================================
            Body
        ====================================== */}
        <div className="space-y-6 p-6">
          {/* Guest Information */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-800">
              Guest Information
            </h3>

            <div className="rounded-2xl bg-[#faf8f4] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c49b63]/10 text-[#b58b55]">
                  <FaUser />
                </div>

                <div>
                  <p className="font-bold text-gray-800">
                    {booking.customerName || "Unknown Guest"}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                    <MdEmail />
                    {booking.customerEmail || "No email"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Room Information */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-800">
              Room Information
            </h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Room Number</p>

                <p className="mt-1 font-bold text-gray-800">
                  {booking.roomNumber || "N/A"}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Room Type</p>

                <p className="mt-1 font-bold text-gray-800">
                  {booking.roomType || "N/A"}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Room ID</p>

                <p className="mt-1 truncate text-xs font-semibold text-gray-700">
                  {booking.roomId || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Stay Information */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-800">
              Stay Information
            </h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Check-in</p>

                <p className="mt-1 font-semibold text-gray-800">
                  {formatDate(booking.checkIn)}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Check-out</p>

                <p className="mt-1 font-semibold text-gray-800">
                  {formatDate(booking.checkOut)}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Nights</p>

                <p className="mt-1 font-semibold text-gray-800">
                  {booking.nights || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-800">
              Payment Information
            </h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Price / Night</p>

                <p className="mt-1 font-semibold text-gray-800">
                  ${Number(booking.pricePerNight || 0).toFixed(2)}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Service Fee</p>

                <p className="mt-1 font-semibold text-gray-800">
                  ${Number(booking.serviceFee || 0).toFixed(2)}
                </p>
              </div>

              <div className="rounded-xl bg-[#c49b63]/10 p-4">
                <p className="text-xs text-gray-500">Total Amount</p>

                <p className="mt-1 font-bold text-[#b58b55]">
                  ${Number(booking.totalPrice || 0).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-3">
              <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold capitalize text-green-600">
                Payment: {booking.paymentStatus || "N/A"}
              </span>

              {booking.transactionId && (
                <span className="max-w-full truncate rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-500">
                  Transaction: {booking.transactionId}
                </span>
              )}
            </div>
          </div>

          {/* Staff Activity */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-800">
              Staff Activity
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Check-In */}
              <div className="rounded-2xl border border-gray-100 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />

                  <p className="text-sm font-bold text-gray-800">Check-In</p>
                </div>

                <p className="text-xs text-gray-400">Staff</p>

                <p className="mt-1 break-all text-sm font-semibold text-gray-700">
                  {booking.checkedInBy || "N/A"}
                </p>

                <p className="mt-3 text-xs text-gray-400">Date & Time</p>

                <p className="mt-1 text-sm font-medium text-gray-700">
                  {formatDateTime(booking.checkedInAt)}
                </p>
              </div>

              {/* Check-Out */}
              <div className="rounded-2xl border border-gray-100 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />

                  <p className="text-sm font-bold text-gray-800">Check-Out</p>
                </div>

                <p className="text-xs text-gray-400">Staff</p>

                <p className="mt-1 break-all text-sm font-semibold text-gray-700">
                  {booking.checkedOutBy || "N/A"}
                </p>

                <p className="mt-3 text-xs text-gray-400">Date & Time</p>

                <p className="mt-1 text-sm font-medium text-gray-700">
                  {formatDateTime(booking.checkedOutAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Timeline */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-800">
              Booking Timeline
            </h3>

            <div className="space-y-3 rounded-2xl bg-gray-50 p-4">
              {booking.confirmedAt && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-gray-500">Confirmed</span>

                  <span className="text-xs font-medium text-gray-700">
                    {formatDateTime(booking.confirmedAt)}
                  </span>
                </div>
              )}

              {booking.checkedInAt && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-gray-500">Checked In</span>

                  <span className="text-xs font-medium text-gray-700">
                    {formatDateTime(booking.checkedInAt)}
                  </span>
                </div>
              )}

              {booking.checkedOutAt && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-gray-500">Checked Out</span>

                  <span className="text-xs font-medium text-gray-700">
                    {formatDateTime(booking.checkedOutAt)}
                  </span>
                </div>
              )}

              {booking.completedAt && (
                <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-3">
                  <span className="text-xs font-semibold text-gray-600">
                    Completed
                  </span>

                  <span className="text-xs font-bold text-green-600">
                    {formatDateTime(booking.completedAt)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ======================================
            Footer
        ====================================== */}
        <div className="flex justify-end border-t border-gray-100 bg-gray-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#c49b63] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b58b55]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
