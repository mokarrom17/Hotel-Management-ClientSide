import { FaBed, FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UpcomingStay = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: booking,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-upcoming-booking"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/upcoming-booking");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
        Failed to load upcoming booking.
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Upcoming Stay</h2>

          <p className="mt-1 text-sm text-gray-500">Your next hotel stay</p>
        </div>

        <span className="rounded-full bg-[#c49b63]/10 px-3 py-1 text-xs font-semibold text-[#c49b63]">
          Confirmed
        </span>
      </div>

      {/* Booking Information */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Room */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#c49b63]/10 text-[#c49b63]">
            <FaBed />
          </div>

          <div>
            <p className="text-xs text-gray-500">Room</p>

            <h3 className="mt-1 font-semibold text-gray-800">
              {booking.roomType}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Room {booking.roomNumber}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#c49b63]/10 text-[#c49b63]">
            <FaMapMarkerAlt />
          </div>

          <div>
            <p className="text-xs text-gray-500">Location</p>

            <h3 className="mt-1 font-semibold text-gray-800">
              {booking.location}
            </h3>
          </div>
        </div>

        {/* Check In */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#c49b63]/10 text-[#c49b63]">
            <FaCalendarAlt />
          </div>

          <div>
            <p className="text-xs text-gray-500">Check In</p>

            <h3 className="mt-1 font-semibold text-gray-800">
              {booking.checkIn}
            </h3>
          </div>
        </div>

        {/* Check Out */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#c49b63]/10 text-[#c49b63]">
            <FaClock />
          </div>

          <div>
            <p className="text-xs text-gray-500">Check Out</p>

            <h3 className="mt-1 font-semibold text-gray-800">
              {booking.checkOut}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {booking.nights} nights
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          Get ready for your upcoming stay.
        </p>

        <button className="rounded-lg bg-[#c49b63] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
          View Booking
        </button>
      </div>
    </div>
  );
};

export default UpcomingStay;
