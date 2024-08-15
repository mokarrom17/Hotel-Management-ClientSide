import { useState } from "react";
import { BiMaleFemale } from "react-icons/bi";
import banner1 from "../../../assets/Hotel.jpg";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { FaChildren } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
const Banner = () => {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleChange = (ranges) => {
    setDate(ranges.selection);
  };

  const handleClick = () => {
    setOpenDate((prev) => !prev);
  };
  return (
    <div className="relative w-full rounded-lg">
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src={banner1}
            className="w-full h-[500px] object-cover rounded-lg"
          />
          <div className="absolute h-full flex items-end  w-full text-center bg-gradient-to-r from-[#151515] to-[#00000000] ">
            <div className="mx-auto p-4 sm:p-8 md:p-10 lg:p-20 text-center">
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold  ">
                SPEND YOUR BEAUTIFUL <br /> MOMENT
              </h2>
              <div className=" mx-auto max-w-6xl mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border  rounded-lg bg-[#212121A6] p-4 gap-4 items-center relative text-black">
                  <div className="flex p-4 rounded-md shadow-sm bg-white">
                    <FaRegCalendarAlt className="text-2xl" />
                    <span onClick={handleClick} className=" cursor-pointer ">
                      {`${format(date.startDate, "MMM,dd,yyyy")} to ${format(
                        date.endDate,
                        "MMM,dd,yyyy"
                      )}`}
                    </span>
                    {openDate && (
                      <DateRangePicker
                        className="absolute top-24"
                        ranges={[date]}
                        onChange={handleChange}
                        minDate={new Date()}
                        months={1}
                      />
                    )}
                  </div>

                  <div className=" flex items-center gap-3 p-4 cursor-pointer rounded-md shadow-sm border bg-white">
                    <BiMaleFemale className="text-2xl" />
                    <input
                      className="bg-white"
                      min="0"
                      type="number"
                      placeholder="Total Adult"
                      name="Adult"
                      id=""
                    />
                  </div>
                  <div className=" flex items-center rounded-md shadow-sm gap-3 p-4 cursor-pointer border bg-white">
                    <FaChildren className="text-2xl" />
                    <input
                      className=" bg-white"
                      min="0"
                      type="number"
                      placeholder="Total Child"
                    />
                  </div>
                  <input
                    className="p-4 bg-[#aa8453] text-white font-semibold cursor-pointer rounded-md hover:bg-[#8f6b41] transition"
                    type="submit"
                    value="CHECK AVAILABLE"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
