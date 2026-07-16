import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],

    isLoading,

    error,
  } = useQuery({
    queryKey: ["bookings", user?.email],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);

      return res.data;
    },
  });

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-red-500 text-xl font-bold">
          Something went wrong!
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Title */}

      <h2 className="text-3xl font-bold mb-8 text-black">
        My Bookings ({bookings.length})
      </h2>

      {/* Empty Booking */}

      {bookings.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">No Booking Found</h2>
        </div>
      )}

      {/* Table */}

      {bookings.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="table w-full text-xl">
            <thead>
              <tr className="text-lg font-semibold">
                <th>Room</th>

                <th>Check In</th>

                <th>Check Out</th>

                <th>Room No</th>

                <th>Price</th>

                <th>Payment</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  {/* Room Type */}

                  <td className="font-semibold">{booking.type}</td>

                  {/* Check In */}

                  <td>{booking.checkIn}</td>

                  {/* Check Out */}

                  <td>{booking.checkOut}</td>

                  {/* Room Number */}

                  <td>{booking.roomNumber}</td>

                  {/* Price */}

                  <td className="font-semibold">
                    {booking.totalPrice
                      ? `$${booking.totalPrice.toFixed(2)}`
                      : "Not Available"}
                  </td>

                  {/* Payment */}

                  <td>
                    {booking.paymentStatus === "paid" ? (
                      <span className="text-green-600 font-bold">Paid</span>
                    ) : (
                      <Link
                        to={`/payment/${booking._id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Pay Now
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
