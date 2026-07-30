import { FaClipboardList, FaEye } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";

const BookingTable = ({
  bookings = [],
  isLoading,
  onView,
  onConfirm,
  onCancel,
}) => {
  const getBookingStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="badge badge-warning text-black font-medium">
            Pending
          </span>
        );

      case "confirmed":
        return (
          <span className="badge badge-info text-white font-medium">
            Confirmed
          </span>
        );

      case "checked-in":
        return (
          <span className="badge badge-success text-white font-medium">
            Checked In
          </span>
        );

      case "checked-out":
        return (
          <span className="badge badge-neutral text-white font-medium">
            Checked Out
          </span>
        );

      case "cancelled":
        return (
          <span className="badge badge-error text-white font-medium">
            Cancelled
          </span>
        );

      default:
        return <span className="badge badge-ghost">Unknown</span>;
    }
  };
  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <span className="badge badge-success text-white font-medium">
            Paid
          </span>
        );

      case "pending":
        return (
          <span className="badge badge-warning text-black font-medium">
            Pending
          </span>
        );

      case "failed":
        return (
          <span className="badge badge-error text-white font-medium">
            Failed
          </span>
        );

      default:
        return <span className="badge badge-ghost">Unknown</span>;
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
                  <button
                    className="btn btn-sm btn-info text-white"
                    title="View Booking"
                    onClick={() => onView(booking)}
                  >
                    <FaEye />
                  </button>

                  <button
                    className="btn btn-sm btn-success text-white"
                    title="Confirm Booking"
                    onClick={() => onConfirm(booking)}
                    disabled={
                      booking.bookingStatus === "confirmed" ||
                      booking.bookingStatus === "checked-in" ||
                      booking.bookingStatus === "checked-out" ||
                      booking.bookingStatus === "cancelled"
                    }
                  >
                    <BsCheckCircleFill />
                  </button>

                  <button
                    className="btn btn-sm btn-error text-white"
                    title="Cancel Booking"
                    onClick={() => onCancel(booking)}
                    disabled={
                      booking.bookingStatus === "cancelled" ||
                      booking.bookingStatus === "checked-in" ||
                      booking.bookingStatus === "checked-out"
                    }
                  >
                    <MdCancel />
                  </button>
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
