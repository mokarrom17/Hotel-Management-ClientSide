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
    <div>
      <div className="carousel w-full rounded-lg">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={banner1} className="w-full m-6" />
          <div className="absolute h-full flex items-end  w-full text-center bg-gradient-to-r from-[#151515] to-[#00000000] ">
            <div className="mx-auto pb-20">
              <h2 className="text-white text-6xl font-extrabold  ">
                SPEND YOUR BEAUTIFUL <br /> MOMENT
              </h2>
              <div className=" mx-auto p-2 max-w-6xl rounded-lg border mt-5">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-center relative h-[100px] text-black">
                  <div className="flex p-4 gap-2 bg-white">
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

                  <div className=" flex gap-3 p-4 cursor-pointer border bg-white">
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
                  <div className=" flex gap-3 p-4 cursor-pointer border bg-white">
                    <FaChildren className="text-2xl" />
                    <input
                      className=" bg-white"
                      min="0"
                      type="number"
                      placeholder="Total Child"
                    />
                  </div>
                  <input
                    className="p-4 bg-[#aa8453] text-white"
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
