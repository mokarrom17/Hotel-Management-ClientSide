import { useState } from "react";
import { BiMaleFemale } from "react-icons/bi";
import { FaChildren, FaStar } from "react-icons/fa6";
import { FaArrowRight, FaMinus, FaPlus } from "react-icons/fa";
import banner1 from "../../../assets/Hotel.jpg";
import DatePickerSection from "./DatePickerSection";

const Banner = () => {
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);

  return (
    /* ─────────────────────────────────────────────────
       Outer wrapper — image IS the background via CSS,
       so overlay + content can grow freely.
    ───────────────────────────────────────────────── */
    <div
      className="relative w-full rounded-b-[40px] overflow-hidden"
      style={{
        backgroundImage: `url(${banner1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ── Gradient Overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 pointer-events-none" />

      {/* ── All Content (sits above overlay) ── */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 lg:pt-40 pb-14 sm:pb-18 lg:pb-20">
        <div className="max-w-7xl mx-auto">
          {/* ── Hero Text ── */}
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl text-white mb-6 text-sm">
              <FaStar className="text-[#e0b97a] text-xs" />
              <span className="font-medium tracking-wide">
                Luxury Hotel & Resort
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight drop-shadow-[0_5px_20px_rgba(0,0,0,0.9)]">
              EXPERIENCE
              <br />
              TIMELESS
              <span className="text-[#e0b97a]"> LUXURY</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mt-6 font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Discover premium comfort, unforgettable hospitality, world-class
              suites and exceptional experiences crafted for your perfect luxury
              stay.
            </p>
          </div>

          {/* ── Booking Card ── */}
          <div className="mt-10 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[28px] shadow-2xl p-4 sm:p-5 lg:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-stretch">
              {/* Date Picker */}
              <div className="sm:col-span-2 lg:col-span-5">
                <DatePickerSection />
              </div>

              {/* Adults */}
              <div className="lg:col-span-2">
                <div className="h-full min-h-[90px] bg-white rounded-2xl shadow-lg px-4 py-4 flex items-center gap-3 hover:shadow-xl transition duration-300">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-[#c49b63]/10 flex items-center justify-center">
                    <BiMaleFemale className="text-[#c49b63] text-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                      Adults
                    </p>
                    <div className="flex items-center justify-between mt-1.5">
                      <button
                        onClick={() => setAdult(Math.max(1, adult - 1))}
                        className="w-7 h-7 rounded-full bg-[#c49b63]/10 flex items-center justify-center text-[#c49b63] hover:bg-[#c49b63]/20 transition"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="text-black text-3xl font-black leading-none">
                        {adult}
                      </span>
                      <button
                        onClick={() => setAdult(adult + 1)}
                        className="w-7 h-7 rounded-full bg-[#c49b63]/10 flex items-center justify-center text-[#c49b63] hover:bg-[#c49b63]/20 transition"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Children */}
              <div className="lg:col-span-2">
                <div className="h-full min-h-[90px] bg-white rounded-2xl shadow-lg px-4 py-4 flex items-center gap-3 hover:shadow-xl transition duration-300">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-[#c49b63]/10 flex items-center justify-center">
                    <FaChildren className="text-[#c49b63] text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                      Children
                    </p>
                    <div className="flex items-center justify-between mt-1.5">
                      <button
                        onClick={() => setChild(Math.max(0, child - 1))}
                        className="w-7 h-7 rounded-full bg-[#c49b63]/10 flex items-center justify-center text-[#c49b63] hover:bg-[#c49b63]/20 transition"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="text-black text-3xl font-black leading-none">
                        {child}
                      </span>
                      <button
                        onClick={() => setChild(child + 1)}
                        className="w-7 h-7 rounded-full bg-[#c49b63]/10 flex items-center justify-center text-[#c49b63] hover:bg-[#c49b63]/20 transition"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Check Availability Button */}
              <div className="sm:col-span-2 lg:col-span-3">
                <button className="w-full h-full min-h-[90px] rounded-2xl bg-[#c49b63] hover:bg-[#aa8453] active:scale-[0.98] text-white font-black tracking-wide transition-all duration-300 shadow-xl flex items-center justify-center gap-3 text-sm sm:text-base hover:shadow-2xl">
                  CHECK AVAILABILITY
                  <FaArrowRight className="text-base shrink-0" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
            {[
              { value: "120+", label: "Luxury Rooms" },
              { value: "10K+", label: "Happy Guests" },
              { value: "5★", label: "Premium Service" },
              { value: "24/7", label: "Concierge Support" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-5 py-5 rounded-[24px] border border-white/10 bg-white/10 backdrop-blur-2xl text-white hover:bg-white/15 transition duration-300"
              >
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black">
                  {stat.value}
                </h3>
                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
