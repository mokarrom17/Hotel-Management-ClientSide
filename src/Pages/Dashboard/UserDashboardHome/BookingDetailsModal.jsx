import {
  FaTimes,
  FaBed,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaHashtag,
  FaUser,
  FaClock,
} from "react-icons/fa";

const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const getBookingStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-blue-50 text-blue-600";

      case "completed":
      case "checked-out":
        return "bg-green-50 text-green-600";

      case "checked-in":
        return "bg-purple-50 text-purple-600";

      case "cancelled":
        return "bg-red-50 text-red-600";

      default:
        return "bg-yellow-50 text-yellow-600";
    }
  };

  const getPaymentStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-50 text-green-600";

      case "pending":
        return "bg-yellow-50 text-yellow-600";

      case "failed":
        return "bg-red-50 text-red-600";

      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Booking Details</h2>

            <p className="mt-1 text-sm text-gray-500">
              Complete information about your booking
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            title="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Booking ID + Status */}
          <div className="flex flex-col gap-4 rounded-xl bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Booking ID
              </p>

              <div className="mt-1 flex items-center gap-2">
                <FaHashtag className="text-sm text-[#c49b63]" />

                <p className="font-semibold text-gray-800">
                  {booking._id || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getBookingStatusStyle(
                  booking.bookingStatus,
                )}`}
              >
                {booking.bookingStatus || "Pending"}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getPaymentStatusStyle(
                  booking.paymentStatus,
                )}`}
              >
                {booking.paymentStatus || "Pending"}
              </span>
            </div>
          </div>

          {/* Room Information */}
          <div className="mt-6">
            <h3 className="mb-4 text-base font-bold text-gray-800">
              Room Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#c49b63]/10 text-[#c49b63]">
                  <FaBed />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Room Type</p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {booking.type || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#c49b63]/10 text-[#c49b63]">
                  <FaHashtag />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Room Number</p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {booking.roomNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stay Information */}
          <div className="mt-6">
            <h3 className="mb-4 text-base font-bold text-gray-800">
              Stay Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-[#c49b63]" />

                  <p className="text-xs text-gray-500">Check In</p>
                </div>

                <p className="mt-3 font-semibold text-gray-800">
                  {formatDate(booking.checkIn)}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-[#c49b63]" />

                  <p className="text-xs text-gray-500">Check Out</p>
                </div>

                <p className="mt-3 font-semibold text-gray-800">
                  {formatDate(booking.checkOut)}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <FaClock className="text-[#c49b63]" />

                  <p className="text-xs text-gray-500">Nights</p>
                </div>

                <p className="mt-3 font-semibold text-gray-800">
                  {booking.nights || 0} nights
                </p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mt-6">
            <h3 className="mb-4 text-base font-bold text-gray-800">
              Customer Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#c49b63]/10 text-[#c49b63]">
                  <FaUser />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Customer Name</p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {booking.customerName || "N/A"}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-xs text-gray-500">Email</p>

                <p className="mt-1 break-all font-semibold text-gray-800">
                  {booking.customerEmail || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mt-6">
            <h3 className="mb-4 text-base font-bold text-gray-800">
              Payment Information
            </h3>

            <div className="rounded-xl border border-gray-100 p-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaMoneyBillWave className="text-[#c49b63]" />

                    <span className="text-sm text-gray-500">
                      Price Per Night
                    </span>
                  </div>

                  <span className="font-semibold text-gray-800">
                    ${booking.pricePerNight || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Service Fee</span>

                  <span className="font-semibold text-gray-800">
                    ${booking.serviceFee || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="font-semibold text-gray-700">
                    Total Price
                  </span>

                  <span className="text-lg font-bold text-[#c49b63]">
                    ${booking.totalPrice || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-3">
                    <FaCreditCard className="text-[#c49b63]" />

                    <span className="text-sm text-gray-500">
                      Payment Status
                    </span>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getPaymentStatusStyle(
                      booking.paymentStatus,
                    )}`}
                  >
                    {booking.paymentStatus || "Pending"}
                  </span>
                </div>
              </div>

              {/* Transaction ID */}
              {booking.transactionId && (
                <div className="mt-5 border-t border-gray-100 pt-5">
                  <p className="text-xs text-gray-500">Transaction ID</p>

                  <p className="mt-1 break-all text-sm font-medium text-gray-700">
                    {booking.transactionId}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Booking Created</p>

              <p className="mt-1 font-medium text-gray-700">
                {formatDate(booking.createdAt)}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Paid At</p>

              <p className="mt-1 font-medium text-gray-700">
                {formatDate(booking.paidAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-gray-100 bg-white px-6 py-4 sm:flex-row sm:justify-end">
          {" "}
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-[#c49b63] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto sm:min-w-32"
          >
            Close
          </button>
          {(booking.bookingStatus === "pending" ||
            booking.bookingStatus === "confirmed") && (
            <button className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600">
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
