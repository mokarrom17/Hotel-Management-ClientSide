import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaPaperPlane, FaStar, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ReviewModal = ({ booking, onClose }) => {
  if (!booking) return null;
  const axiosSecure = useAxiosSecure();

  const queryClient = useQueryClient();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const reviewMutation = useMutation({
    mutationFn: async () => {
      const reviewData = {
        bookingId: booking._id,
        rating,
        comment: comment.trim(),
      };

      const res = await axiosSecure.post("/reviews", reviewData);

      return res.data;
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Review Submitted!",
        text: "Thank you for sharing your experience.",
        confirmButtonColor: "#aa8453",
      });

      // Review status refresh
      queryClient.invalidateQueries({
        queryKey: ["booking-review", booking._id],
      });

      // Booking list refresh
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      setRating(0);
      setHoverRating(0);
      setComment("");

      onClose();
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Review Submission Failed",
        text: error?.response?.data?.message || "Failed to submit review.",
        confirmButtonColor: "#aa8453",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (reviewMutation.isPending) return;

    if (!rating) {
      Swal.fire({
        icon: "warning",
        title: "Rating Required",
        text: "Please select a rating.",
        confirmButtonColor: "#aa8453",
      });

      return;
    }

    if (!comment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Review Required",
        text: "Please write a review.",
        confirmButtonColor: "#aa8453",
      });

      return;
    }

    if (comment.trim().length < 10) {
      Swal.fire({
        icon: "warning",
        title: "Review Too Short",
        text: "Please write at least 10 characters.",
        confirmButtonColor: "#aa8453",
      });

      return;
    }

    reviewMutation.mutate();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Write a Review</h2>

            <p className="mt-1 text-sm text-gray-500">
              Share your experience with us
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-800"
          >
            <FaTimes />
          </button>
        </div>
        {/* Booking Summary */}
        <div className="mx-6 mt-5 rounded-2xl bg-[#faf7f2] p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Room
              </p>

              <h3 className="mt-1 font-bold text-gray-800">
                {booking.roomNumber || "N/A"}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {booking.type || booking.roomType || "Room"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Stay
              </p>

              <p className="mt-1 text-sm font-medium text-gray-700">
                {booking.checkIn || "N/A"}
              </p>

              <p className="text-sm text-gray-500">
                to {booking.checkOut || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Rating */}
          <div className="px-6 pt-6 pb-3">
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              How was your stay?
            </label>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const activeRating = hoverRating || rating;

                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="text-3xl transition-transform hover:scale-110"
                    aria-label={`${star} star rating`}
                  >
                    <FaStar
                      className={
                        star <= activeRating
                          ? "text-[#c49b63]"
                          : "text-gray-200"
                      }
                    />
                  </button>
                );
              })}
            </div>

            <p className="mt-2 text-xs text-gray-400">
              {rating === 0 ? "Select a rating" : `${rating} out of 5 stars`}
            </p>
          </div>
          {/* Comment */}
          <div className="px-6 pt-3 pb-6">
            <label
              htmlFor="review-comment"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Your Review
            </label>

            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              maxLength={500}
              placeholder="Tell us about your stay..."
              className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#c49b63] focus:ring-2 focus:ring-[#c49b63]/10"
            />

            <div className="mt-1 flex justify-end">
              <span className="text-xs text-gray-400">
                {comment.length}/500
              </span>
            </div>
          </div>
          <div className="flex flex-col-reverse gap-3 px-6 pb-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={reviewMutation.isPending}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#aa8453] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {reviewMutation.isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Submit Review
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
