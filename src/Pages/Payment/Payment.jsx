import { Link, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import PaymentForm from "./PaymentForm";

// Created once at module scope — must NOT be recreated on every render,
// otherwise Stripe.js reloads unnecessarily on each re-render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const { bookingId } = useParams();

  const axiosSecure = useAxiosSecure();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],

    enabled: !!bookingId,

    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${bookingId}`);

      return res.data;
    },
  });

  // ==========================================
  // Loading
  // ==========================================
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#c49b63]"></span>
      </div>
    );
  }

  // ==========================================
  // Error / Not Found
  // ==========================================
  if (error || !booking) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <h2 className="text-red-500 text-xl font-bold">Booking not found!</h2>

        <Link to="/myBookings" className="text-[#c49b63] underline">
          Back to My Bookings
        </Link>
      </div>
    );
  }

  // ==========================================
  // Already Paid — don't allow paying twice
  // ==========================================
  if (booking.paymentStatus === "paid") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold text-green-600">
          This booking is already paid ✅
        </h2>

        <Link to="/myBookings" className="text-[#c49b63] underline">
          Back to My Bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#faf7f2] min-h-screen py-16 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-[35px] shadow-lg p-8 md:p-10">
        <h1 className="text-3xl font-black text-black mb-6">
          Complete Payment
        </h1>

        {/* Booking Summary */}
        <div className="bg-[#faf7f2] rounded-3xl p-5 space-y-2 mb-8">
          <div className="flex justify-between">
            <span>Room</span>
            <span className="font-semibold">{booking.type}</span>
          </div>

          <div className="flex justify-between">
            <span>Check In</span>
            <span>{booking.checkIn}</span>
          </div>

          <div className="flex justify-between">
            <span>Check Out</span>
            <span>{booking.checkOut}</span>
          </div>

          <div className="flex justify-between">
            <span>Rooms</span>
            <span>{booking.roomNumber}</span>
          </div>

          <div className="border-t pt-3 flex justify-between font-black text-lg">
            <span>Total</span>
            <span>${booking.totalPrice?.toFixed(2)}</span>
          </div>
        </div>

        {/* Stripe Card Form */}
        <Elements stripe={stripePromise}>
          <PaymentForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
