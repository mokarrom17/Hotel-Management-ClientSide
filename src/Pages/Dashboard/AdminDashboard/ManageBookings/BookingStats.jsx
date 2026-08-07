import { FaClipboardList } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const BookingStats = ({ bookings }) => {
  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.bookingStatus === "pending",
  ).length;
  const paidBookings = bookings.filter(
    (booking) => booking.paymentStatus === "paid",
  ).length;
  const cancelledBookings = bookings.filter(
    (booking) => booking.bookingStatus === "cancelled",
  ).length;

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: <FaClipboardList size={28} />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: pendingBookings,
      icon: <MdPendingActions size={28} />,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: "Paid",
      value: paidBookings,
      icon: <FaMoneyCheckDollar size={28} />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Cancelled",
      value: cancelledBookings,
      icon: <IoCloseCircle size={28} />,
      bg: "bg-red-100",
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm">{item.title}</h3>

              <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
            </div>

            <div className={`rounded-full p-4 ${item.bg} ${item.color}`}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingStats;
