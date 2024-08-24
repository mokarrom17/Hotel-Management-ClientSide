import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
const ClientReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("clientsReviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  });
  return (
    <div className="mx-4 md:mx-8 lg:mx-20 mb-12 bg-white">
      <div className="text-center mb-8 text-black">
        <h2 className="text-3xls md:text-4xl lg:text-center mb-4 font-bold">
          Happy Client's Review
        </h2>
        <p className="lg:text-lg md:text-base text-sm">
          Maecenas nec odio et ante tincidunt tempus. Donec vitae apitlibero
          venenatis faucibus. Nullam quis ante. Etiam sit amet orci
        </p>
      </div>
      <Swiper
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
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
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay]}
        className=""
      >
        {reviews.map((review) => (
          <SwiperSlide className="px-2" key={review._id}>
            <div className="border-2 border-stone-900 mb-3 p-4 w-full h-full lg:h-[300px] rounded-lg">
              <div className="text-center">
                <div className="avatar">
                  <div className="lg:w-24 lg:h-24 w-20 h-20 mx-auto overflow-hidden rounded-full">
                    <img src={review.image} />
                  </div>
                </div>
                <h1 className="text-black font-bold text-lg lg:text-xl">
                  {review.name}
                </h1>
                <h1 className="text-black font-medium text-sm lg:text-base">
                  {review.occupation}
                </h1>
              </div>
              <div className=" text-sm lg:text-base text-black font-medium ">
                <p className="line-clamp-4">{review.review}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ClientReviews;
