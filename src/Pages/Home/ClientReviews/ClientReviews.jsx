import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { FaRegStar, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ClientReviews = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["public-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  // ==========================================
  // Loading State
  // ==========================================
  if (isLoading) {
    return (
      <section className="mx-4 mb-12 bg-white md:mx-8 lg:mx-20">
        <div className="flex min-h-[300px] items-center justify-center">
          <span className="loading loading-spinner loading-lg text-[#aa8453]"></span>
        </div>
      </section>
    );
  }

  // ==========================================
  // Error State
  // ==========================================
  if (isError) {
    return (
      <section className="mx-4 mb-12 bg-white md:mx-8 lg:mx-20">
        <div className="py-16 text-center">
          <p className="text-sm text-red-500">Failed to load guest reviews.</p>
        </div>
      </section>
    );
  }

  // ==========================================
  // Empty State
  // ==========================================
  if (!reviews.length) {
    return (
      <section className="mx-4 mb-12 bg-white md:mx-8 lg:mx-20">
        <div className="mb-8 text-center text-black">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-[#aa8453]">
            Guest Reviews
          </p>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            What Our Guests Say
          </h2>

          <p className="text-sm text-gray-500 md:text-base">
            No guest reviews available yet.
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // Average Rating
  // ==========================================
  const averageRating = (
    reviews.reduce((sum, review) => sum + Number(review.rating), 0) /
    reviews.length
  ).toFixed(1);

  return (
    <section className="mx-4 mb-12 bg-white md:mx-8 lg:mx-20">
      {/* ==========================================
          Section Header
      ========================================== */}
      <div className="mb-8 text-center text-black">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-[#aa8453]">
          Guest Reviews
        </p>

        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          What Our Guests Say
        </h2>

        <p className="mx-auto max-w-2xl text-sm text-gray-500 md:text-base lg:text-lg">
          Discover what our guests experienced during their stay with us.
        </p>
      </div>

      {/* ==========================================
          Rating Summary
      ========================================== */}
      <div className="mx-auto mb-10 flex w-fit items-center gap-5 rounded-2xl bg-[#faf7f2] px-6 py-4">
        {/* Average Rating */}
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-800">{averageRating}</p>

          <div className="mt-1 flex justify-center gap-1 text-[#c49b63]">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar key={star} size={14} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-12 w-px bg-gray-200"></div>

        {/* Total Reviews */}
        <div>
          <p className="text-xl font-bold text-gray-800">{reviews.length}</p>

          <p className="text-xs text-gray-500">
            {reviews.length === 1 ? "Guest Review" : "Guest Reviews"}
          </p>
        </div>
      </div>

      {/* ==========================================
          Reviews Slider
      ========================================== */}
      <Swiper
        loop={reviews.length > 3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },

          640: {
            slidesPerView: 1,
            spaceBetween: 15,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        modules={[Autoplay, Pagination]}
        className="pb-12"
      >
        {reviews.map((review) => (
          <SwiperSlide className="h-auto px-2" key={review._id}>
            <div className="flex h-full min-h-[310px] flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              {/* ==========================================
                  Rating
              ========================================== */}
              <div className="mb-5 flex gap-1 text-[#c49b63]">
                {[1, 2, 3, 4, 5].map((star) =>
                  star <= Number(review.rating) ? (
                    <FaStar key={star} />
                  ) : (
                    <FaRegStar key={star} className="text-gray-300" />
                  ),
                )}
              </div>

              {/* ==========================================
                  Review Comment
              ========================================== */}
              <div className="flex-1">
                <p className="line-clamp-5 text-sm leading-7 text-gray-600 md:text-base">
                  "{review.comment}"
                </p>
              </div>

              {/* ==========================================
                  Customer Information
              ========================================== */}
              <div className="mt-6 border-t border-gray-100 pt-5">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#faf7f2]">
                    {review.image ? (
                      <img
                        src={review.image}
                        alt={review.customerName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-[#aa8453]">
                        {review.customerName?.charAt(0)?.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Customer Name & Room */}
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-gray-800">
                      {review.customerName}
                    </h3>

                    <p className="truncate text-xs text-[#aa8453]">
                      {review.roomType}
                    </p>
                  </div>
                </div>

                {/* Room + Date */}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-xs text-gray-400">
                    Room {review.roomNumber}
                  </p>

                  <p className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ClientReviews;
