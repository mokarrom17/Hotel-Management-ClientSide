import { FaEye } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const BookingTable = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/bookings");
      return res.data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
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
            <tr key={booking.id}>
              <th>{index + 1}</th>

              <td>{booking.roomId.slice(0, 8)}</td>

              <td>
                <div>
                  <p className="font-semibold">Room {booking.roomNumber}</p>

                  <p className="text-xs text-gray-500">{booking.roomType}</p>
                </div>
              </td>

              <td>{booking.customerName || "N/A"}</td>

              <td>{booking.checkIn}</td>

              <td>{booking.checkOut}</td>

              <td>{booking.nights}</td>

              <td>£{booking.totalPrice}</td>

              <td>
                <span
                  className={`badge rounded p-4 font-semibold ${
                    booking.paymentStatus === "Paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {booking.paymentStatus}
                </span>
              </td>

              <td>
                <span
                  className={`badge rounded p-4 font-semibold ${
                    booking.bookingStatus === "Confirmed"
                      ? "badge-info"
                      : "badge-warning"
                  }`}
                >
                  {booking.bookingStatus}
                </span>
              </td>

              <td>
                <div className="flex justify-center gap-2">
                  <button
                    className="btn btn-sm btn-info text-white"
                    title="View"
                  >
                    <FaEye />
                  </button>

                  <button
                    className="btn btn-sm btn-success text-white"
                    title="Confirm"
                  >
                    <BsCheckCircleFill />
                  </button>

                  <button
                    className="btn btn-sm btn-error text-white"
                    title="Cancel"
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
