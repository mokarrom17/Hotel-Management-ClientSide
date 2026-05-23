import { useEffect, useRef, useState } from "react";

import { DateRangePicker } from "react-date-range";

import { format } from "date-fns";

import { FaRegCalendarAlt } from "react-icons/fa";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePickerSection = () => {
  const [openDate, setOpenDate] = useState(false);

  const dateRef = useRef(null);

  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // ==========================================
  // Date Change
  // ==========================================
  const handleChange = (ranges) => {
    setDate(ranges.selection);
  };

  // ==========================================
  // Outside Click Close
  // ==========================================
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dateRef.current && !dateRef.current.contains(e.target)) {
        setOpenDate(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dateRef} className="relative w-full">
      {/* ==========================================
          Trigger Button
      ========================================== */}
      <button
        type="button"
        onClick={() => setOpenDate(!openDate)}
        className="
          w-full
          flex
          items-center
          gap-4
          p-4
          rounded-2xl
          bg-white
          shadow-md
          hover:shadow-lg
          transition-all
          duration-300
          border
          border-gray-200
        "
      >
        {/* Icon */}
        <div
          className="
            h-12
            w-12
            rounded-xl
            bg-[#aa8453]/10
            flex
            items-center
            justify-center
          "
        >
          <FaRegCalendarAlt className="text-[#aa8453] text-xl" />
        </div>

        {/* Text */}
        <div className="flex flex-col text-left">
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            Check In — Check Out
          </span>

          <span className="font-semibold text-black text-sm lg:text-base">
            {`${format(date.startDate, "dd MMM yyyy")} — ${format(
              date.endDate,
              "dd MMM yyyy",
            )}`}
          </span>
        </div>
      </button>

      {/* ==========================================
          Calendar Popup
      ========================================== */}
      {openDate && (
        <div
          className="
            absolute
            top-24
            left-0
            z-50
            rounded-3xl
            overflow-hidden
            shadow-2xl
            border
            border-gray-200
            bg-white
            animate-fadeIn
          "
        >
          <DateRangePicker
            ranges={[date]}
            onChange={handleChange}
            minDate={new Date()}
            months={window.innerWidth < 768 ? 1 : 2}
            direction={window.innerWidth < 768 ? "vertical" : "horizontal"}
            rangeColors={["#aa8453"]}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerSection;
