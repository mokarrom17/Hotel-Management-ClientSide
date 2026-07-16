import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#000",
      "::placeholder": {
        color: "#9ca3af",
      },
    },
    invalid: {
      color: "#ef4444",
    },
  },
};

const PaymentForm = ({ booking }) => {
  const stripe = useStripe();

  const elements = useElements();

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);

  const [cardError, setCardError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Stripe.js hasn't finished loading yet, or the card field isn't ready
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) return;

    setProcessing(true);
    setCardError("");

    try {
      // 1. Ask backend to create a PaymentIntent for this booking's amount
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price: booking.totalPrice,
      });

      // 2. Confirm the card payment with Stripe directly
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Guest",
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setCardError(result.error.message);
        setProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // 3. Tell backend to mark this booking as paid
        await axiosSecure.patch(`/bookings/${booking._id}/pay`, {
          transactionId: result.paymentIntent.id,
        });

        toast.success("Payment successful!");

        // Refresh any cached bookings data so MyBookings/Profile
        // immediately reflect the new "paid" status
        queryClient.invalidateQueries({ queryKey: ["bookings"] });

        setTimeout(() => navigate("/myBookings"), 1200);
      }
    } catch (error) {
      setCardError("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border border-gray-200 rounded-2xl p-4">
        <CardElement options={cardElementOptions} />
      </div>

      {cardError && (
        <p className="text-red-500 text-sm font-medium">{cardError}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full h-16 rounded-2xl bg-[#c49b63] hover:bg-[#aa8453] text-white font-bold tracking-wide text-lg shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing
          ? "Processing..."
          : `Pay $${booking.totalPrice?.toFixed(2)}`}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Test mode — card 4242 4242 4242 4242, any future date, any CVC.
      </p>
    </form>
  );
};

export default PaymentForm;
