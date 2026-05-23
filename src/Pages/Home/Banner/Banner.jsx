import { useState } from "react";

import { BiMaleFemale } from "react-icons/bi";

import { FaChildren, FaStar } from "react-icons/fa6";

import { FaArrowRight } from "react-icons/fa";

import banner1 from "../../../assets/Hotel.jpg";

import DatePickerSection from "./DatePickerSection";
const Banner = () => {
  // ==========================================
  // Guest States
  // ==========================================
  const [adult, setAdult] = useState(2);

  const [child, setChild] = useState(0);

  return (
    <div
      className="
        relative
        w-full
        overflow-visible
        rounded-[30px]
      "
    >
      {/* ==========================================
          Background Image
      ========================================== */}
      <img
        src={banner1}
        alt="Luxury Hotel"
        className="
          w-full
          h-[95vh]
          object-cover
          rounded-[30px]
        "
      />

      {/* ==========================================
          Overlay
      ========================================== */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/85
          via-black/55
          to-black/25
          rounded-[30px]
          flex
          items-center
        "
      >
        {/* ==========================================
            Main Content Wrapper
        ========================================== */}
        <div
          className="
            w-full
            px-4
            sm:px-6
            lg:px-10
          "
        >
          <div
            className="
              max-w-7xl
              mx-auto
            "
          >
            {/* ==========================================
                Hero Text Section
            ========================================== */}
            <div className="max-w-4xl">
              {/* Luxury Badge */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  rounded-full
                  border
                  border-white/20
                  bg-white/10
                  backdrop-blur-xl
                  shadow-xl
                  text-white
                  mb-6
                "
              >
                <FaStar className="text-yellow-400" />

                <span className="font-medium tracking-wide">
                  Luxury Hotel & Resort
                </span>
              </div>

              {/* Heading */}
              <h1
                className="
                  text-white
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                  font-black
                  leading-[1.05]
                  tracking-tight
                "
              >
                EXPERIENCE
                <br />
                TIMELESS
                <span className="text-[#c49b63]"> LUXURY</span>
              </h1>

              {/* Subtitle */}
              <p
                className="
                  text-gray-300
                  text-base
                  sm:text-lg
                  leading-8
                  max-w-2xl
                  mt-6
                "
              >
                Discover premium comfort, unforgettable hospitality, world-class
                suites and exceptional experiences crafted for your perfect
                luxury stay.
              </p>
            </div>

            {/* ==========================================
                Booking Card
            ========================================== */}
            <div
              className="
                relative
                z-50
                mt-10
                bg-white/10
                backdrop-blur-2xl
                border
                border-white/20
                rounded-[30px]
                shadow-2xl
                p-5
                lg:p-6
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  lg:grid-cols-12
                  gap-4
                  items-center
                "
              >
                {/* ==========================================
                    Date Picker
                ========================================== */}
                <div className="lg:col-span-5 relative">
                  <DatePickerSection />
                </div>

                {/* ==========================================
                    Adults
                ========================================== */}
                <div className="lg:col-span-2">
                  <div
                    className="
                      h-full
                      min-h-[88px]
                      bg-white
                      rounded-2xl
                      shadow-lg
                      px-4
                      py-4
                      flex
                      items-center
                      gap-4
                      transition-all
                      duration-300
                      hover:shadow-xl
                    "
                  >
                    {/* Icon */}
                    <div
                      className="
                        h-12
                        w-12
                        rounded-xl
                        bg-[#c49b63]/10
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <BiMaleFemale className="text-[#c49b63] text-2xl" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p
                        className="
                          text-xs
                          uppercase
                          tracking-wide
                          text-gray-400
                        "
                      >
                        Adults
                      </p>

                      <input
                        type="number"
                        min="1"
                        value={adult}
                        onChange={(e) => setAdult(e.target.value)}
                        className="
                          w-full
                          bg-transparent
                          outline-none
                          text-black
                          font-bold
                          text-2xl
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* ==========================================
                    Children
                ========================================== */}
                <div className="lg:col-span-2">
                  <div
                    className="
                      h-full
                      min-h-[88px]
                      bg-white
                      rounded-2xl
                      shadow-lg
                      px-4
                      py-4
                      flex
                      items-center
                      gap-4
                      transition-all
                      duration-300
                      hover:shadow-xl
                    "
                  >
                    {/* Icon */}
                    <div
                      className="
                        h-12
                        w-12
                        rounded-xl
                        bg-[#c49b63]/10
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <FaChildren className="text-[#c49b63] text-xl" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p
                        className="
                          text-xs
                          uppercase
                          tracking-wide
                          text-gray-400
                        "
                      >
                        Children
                      </p>

                      <input
                        type="number"
                        min="0"
                        value={child}
                        onChange={(e) => setChild(e.target.value)}
                        className="
                          w-full
                          bg-transparent
                          outline-none
                          text-black
                          font-bold
                          text-2xl
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* ==========================================
                    Button
                ========================================== */}
                <div className="lg:col-span-3">
                  <button
                    className="
                      w-full
                      min-h-[88px]
                      rounded-2xl
                      bg-[#c49b63]
                      hover:bg-[#aa8453]
                      text-white
                      font-bold
                      tracking-wide
                      transition-all
                      duration-300
                      shadow-2xl
                      flex
                      items-center
                      justify-center
                      gap-3
                      text-lg
                      hover:scale-[1.02]
                    "
                  >
                    CHECK AVAILABILITY
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>

            {/* ==========================================
                Floating Stats
            ========================================== */}
            <div
              className="
                mt-8
                flex
                flex-wrap
                gap-5
              "
            >
              {/* Card */}
              <div
                className="
                  px-6
                  py-5
                  rounded-2xl
                  border
                  border-white/20
                  bg-white/10
                  backdrop-blur-xl
                  text-white
                  min-w-[180px]
                "
              >
                <h3 className="text-3xl font-black">120+</h3>

                <p className="text-sm text-gray-300 mt-1">Luxury Rooms</p>
              </div>

              {/* Card */}
              <div
                className="
                  px-6
                  py-5
                  rounded-2xl
                  border
                  border-white/20
                  bg-white/10
                  backdrop-blur-xl
                  text-white
                  min-w-[180px]
                "
              >
                <h3 className="text-3xl font-black">10K+</h3>

                <p className="text-sm text-gray-300 mt-1">Happy Guests</p>
              </div>

              {/* Card */}
              <div
                className="
                  px-6
                  py-5
                  rounded-2xl
                  border
                  border-white/20
                  bg-white/10
                  backdrop-blur-xl
                  text-white
                  min-w-[180px]
                "
              >
                <h3 className="text-3xl font-black">5★</h3>

                <p className="text-sm text-gray-300 mt-1">Premium Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
