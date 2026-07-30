import React from "react";

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold">Booking Details</h3>

          <button className="btn btn-sm btn-circle" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Information */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Booking ID</p>
            <p className="font-semibold break-all">{booking._id}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Transaction ID</p>
            <p className="font-semibold break-all">
              {booking.transactionId || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Customer Name</p>
            <p className="font-semibold">{booking.customerName || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Customer Email</p>
            <p className="font-semibold">{booking.customerEmail}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Room Number</p>
            <p className="font-semibold">{booking.roomNumber}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Room Type</p>
            <p className="font-semibold">{booking.type}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Check-In</p>
            <p className="font-semibold">{formatDate(booking.checkIn)}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Check-Out</p>
            <p className="font-semibold">{formatDate(booking.checkOut)}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Nights</p>
            <p className="font-semibold">{booking.nights}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Price</p>
            <p className="font-semibold">£{booking.totalPrice?.toFixed(2)}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Payment Status</p>
            <p className="font-semibold capitalize">{booking.paymentStatus}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Booking Status</p>
            <p className="font-semibold capitalize">{booking.bookingStatus}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="font-semibold">{formatDate(booking.createdAt)}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Paid At</p>
            <p className="font-semibold">
              {booking.paidAt ? formatDate(booking.paidAt) : "-"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-action">
          <button className="btn btn-neutral" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default BookingDetailsModal;
