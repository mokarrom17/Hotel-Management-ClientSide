import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePickerSection = () => {
  const [openDate, setOpenDate] = useState(false);
  const modalRef = useRef(null);

  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleChange = (ranges) => {
    setDate(ranges.selection);
  };

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenDate(false);
      }
    };
    if (openDate) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openDate]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = openDate ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openDate]);

  return (
    <>
      {/* ── Trigger Button ── */}
      <button
        type="button"
        onClick={() => setOpenDate(true)}
        className="w-full h-full min-h-[90px] flex items-center gap-4 px-4 py-4 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
      >
        <div className="h-11 w-11 shrink-0 rounded-xl bg-[#c49b63]/10 flex items-center justify-center">
          <FaRegCalendarAlt className="text-[#c49b63] text-xl" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
            Check In — Check Out
          </span>
          <span className="font-bold text-black text-sm lg:text-base mt-1">
            {`${format(date.startDate, "dd MMM yyyy")} — ${format(
              date.endDate,
              "dd MMM yyyy",
            )}`}
          </span>
        </div>
      </button>

      {/* ── Modal Portal ── */}
      {openDate &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal Box */}
            <div
              ref={modalRef}
              className="relative bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn"
              style={{ maxWidth: "min(760px, 96vw)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div>
                  <p className="font-bold text-gray-800 text-base">
                    Select Dates
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Pick your check-in and check-out dates
                  </p>
                </div>
                <button
                  onClick={() => setOpenDate(false)}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                >
                  <FaTimes className="text-gray-500 text-sm" />
                </button>
              </div>

              {/* Calendar */}
              <div className="overflow-auto max-h-[70vh]">
                <DateRangePicker
                  ranges={[date]}
                  onChange={handleChange}
                  minDate={new Date()}
                  months={window.innerWidth < 640 ? 1 : 2}
                  direction={
                    window.innerWidth < 640 ? "vertical" : "horizontal"
                  }
                  rangeColors={["#c49b63"]}
                  showMonthAndYearPickers={true}
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-800">
                    {format(date.startDate, "dd MMM yyyy")}
                  </span>
                  {" → "}
                  <span className="font-semibold text-gray-800">
                    {format(date.endDate, "dd MMM yyyy")}
                  </span>
                </p>
                <button
                  onClick={() => setOpenDate(false)}
                  className="px-6 py-2.5 bg-[#c49b63] hover:bg-[#aa8453] text-white font-bold rounded-xl transition-all duration-200 text-sm shadow-md"
                >
                  Confirm Dates
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default DatePickerSection;
