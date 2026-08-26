import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookingReviewAction = ({ booking, onWriteReview }) => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["booking-review", booking._id],

    enabled: booking.bookingStatus === "completed",

    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/booking/${booking._id}`);

      return res.data;
    },
  });

  // Only completed bookings can be reviewed
  if (booking.bookingStatus !== "completed") {
    return <span className="text-gray-400 text-sm">Not Available</span>;
  }

  if (isLoading) {
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  if (data?.reviewed) {
    return <span className="font-semibold text-green-600">✓ Reviewed</span>;
  }

  return (
    <button
      type="button"
      onClick={() => onWriteReview(booking)}
      className="btn btn-sm border-none bg-[#aa8453] text-white hover:bg-black"
    >
      Write Review
    </button>
  );
};

export default BookingReviewAction;
