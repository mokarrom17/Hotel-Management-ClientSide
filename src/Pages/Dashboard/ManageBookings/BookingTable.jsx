import { FaClipboardList, FaEye } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";

const BookingTable = ({
  bookings = [],
  isLoading,
  onView,
  onConfirm,
  onCancel,
  onCheckIn,
  onCheckOut,
}) => {
  const getBookingStatusBadge = (status) => {
    const baseClass =
      "inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-semibold whitespace-nowrap";

    switch (status) {
      case "pending":
        return (
          <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>
            Pending
          </span>
        );

      case "confirmed":
        return (
          <span className={`${baseClass} bg-blue-100 text-blue-800`}>
            Confirmed
          </span>
        );

      case "checked-in":
        return (
          <span className={`${baseClass} bg-green-100 text-green-800`}>
            Checked-In
          </span>
        );

      case "checked-out":
        return (
          <span className={`${baseClass} bg-slate-200 text-slate-800`}>
            Checked-Out
          </span>
        );

      case "cancelled":
        return (
          <span className={`${baseClass} bg-red-100 text-red-700`}>
            Cancelled
          </span>
        );

      default:
        return (
          <span className={`${baseClass} bg-gray-100 text-gray-700`}>
            Unknown
          </span>
        );
    }
  };
  const getPaymentStatusBadge = (status) => {
    const baseClass =
      "inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-semibold whitespace-nowrap";

    switch (status) {
      case "paid":
        return (
          <span className={`${baseClass} bg-green-100 text-green-800`}>
            Paid
          </span>
        );

      case "pending":
        return (
          <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>
            Pending
          </span>
        );

      case "failed":
        return (
          <span className={`${baseClass} bg-red-100 text-red-700`}>Failed</span>
        );

      default:
        return (
          <span className={`${baseClass} bg-gray-100 text-gray-700`}>
            Unknown
          </span>
        );
    }
  };
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">
        <FaClipboardList className="mx-auto text-5xl text-gray-300" />

        <h3 className="mt-4 text-xl font-semibold text-gray-700">
          No bookings found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          There are no bookings matching your current search or filters.
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="table">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Booking ID</th>
            <th>Room</th>
            <th>Customer</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Nights</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id}>
              <th>{index + 1}</th>

              <td>
                <span
                  className="cursor-pointer font-medium"
                  title={booking._id}
                >
                  {booking._id.slice(0, 8)}...
                </span>
              </td>

              <td>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    {booking.roomNumber}
                  </span>

                  <span className="text-xs text-gray-500">{booking.type}</span>
                </div>
              </td>

              <td>{booking.customerName || "N/A"}</td>

              <td>{formatDate(booking.checkIn)}</td>

              <td>{formatDate(booking.checkOut)}</td>

              <td>{booking.nights}</td>

              <td>£{booking.totalPrice.toFixed(2)}</td>

              <td>{getPaymentStatusBadge(booking.paymentStatus)}</td>

              <td>{getBookingStatusBadge(booking.bookingStatus)}</td>

              <td>
                <div className="flex justify-center gap-2">
                  {/* View Button */}
                  <button
                    className="btn btn-sm btn-info text-white"
                    title="View Booking"
                    onClick={() => onView(booking)}
                  >
                    <FaEye />
                  </button>

                  {/* Pending → Confirm */}
                  {booking.bookingStatus === "pending" && (
                    <button
                      className="btn btn-sm btn-success text-white"
                      title="Confirm Booking"
                      onClick={() => onConfirm(booking)}
                    >
                      <BsCheckCircleFill />
                    </button>
                  )}

                  {/* Confirmed → Check-In */}
                  {booking.bookingStatus === "confirmed" && (
                    <button
                      className="btn btn-sm btn-primary text-white"
                      title="Check-In"
                      onClick={() => onCheckIn(booking)}
                    >
                      Check-In
                    </button>
                  )}

                  {/* Checked-In → Check-Out */}
                  {booking.bookingStatus === "checked-in" && (
                    <button
                      className="btn btn-sm btn-secondary text-white"
                      title="Check-Out"
                      onClick={() => onCheckOut(booking)}
                    >
                      Check-Out
                    </button>
                  )}

                  {/* Pending বা Confirmed → Cancel */}
                  {(booking.bookingStatus === "pending" ||
                    booking.bookingStatus === "confirmed") && (
                    <button
                      className="btn btn-sm btn-error text-white"
                      title="Cancel Booking"
                      onClick={() => onCancel(booking)}
                    >
                      <MdCancel />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
