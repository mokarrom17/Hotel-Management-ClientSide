import { useLoaderData } from "react-router-dom";
import hotelBg from "../../assets/HotelBg2.jpg";
import { BsDoorClosed, BsDoorOpen } from "react-icons/bs";
import { RiCheckDoubleFill } from "react-icons/ri";
import {
  FiDroplet,
  FiMonitor,
  FiRefreshCw,
  FiWifi,
  FiWind,
} from "react-icons/fi";
import { FaSwimmingPool } from "react-icons/fa";
import { FaAccessibleIcon } from "react-icons/fa6";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RoomDetails = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const features = useLoaderData();
  const {
    type,
    image,
    adults,
    child,
    price,
    description,
    checkInTime,
    checkOutTime,
    cancellationPolicy,
    amenities,
    beds,
  } = features;

  //Function to Determine Which icon to display for each amenity
  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi":
      case "free wifi":
        return <FiWifi className="text-blue-500" />;
      case "TV":
        return <FiMonitor className="text-green-500" />;
      case "AC":
      case "air conditioning":
        return <FiWind className="text-purple-500" />;
      case "whirlpool tub":
        return <FiDroplet className="text-teal-500" />;
      case "connecting rooms":
        return <BsDoorOpen className="text-orange-500" />;
      case "POOL":
      case "swimming pool":
        return <FaSwimmingPool className="text-blue-400" />;
      case "Washing Machine":
        return <FiRefreshCw className="text-gray-500" />;
      case "accessible bathroom":
        return <FaAccessibleIcon className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div
        className="hero min-h-48"
        style={{
          backgroundImage: ` url(${hotelBg})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl text-white font-bold">{type}</h1>
          </div>
        </div>
      </div>
      <div className="flex bg-white">
        <div className="w-2/3 ">
          <div className="flex justify-center relative -mb-12 ">
            <div className="card w-[700px] mt-10 bg-white shadow-xl">
              <div className="card-body s">
                <div className="flex justify-between">
                  <div>
                    <h2 className="card-title text-2xl font-bold text-black">
                      {type}
                    </h2>
                    <div className="flex text-black gap-4">
                      <span>Adults:{adults}</span>
                      <span>Child:{child}</span>
                    </div>
                  </div>
                  <div className="">
                    <div className="text-3xl text-[#aa8453] font-bold">
                      ${price}.00
                    </div>
                    <div className="text-sm text-black">
                      +10.00% Tax /
                      <span className="text-[#aa8453]"> Night</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-center">
            <img
              className="w-[800px] h-[400px] border rounded-xl"
              src={image}
              alt=""
            />
          </div>
          <div className="flex justify-center mt-6 shadow-md">
            <div className="card bg-white w-[800px] shadow-xl">
              <div className="card-body text-black divide-y-2">
                <h2 className="card-title">Description</h2>
                <p>{description}</p>
              </div>
            </div>
          </div>
          {/*  Check-In Time & Checkout Time*/}
          <div className="flex justify-center mt-6 shadow-md">
            <div className="card bg-white w-[800px] shadow-xl">
              <div className="card-body text-black divide-y-2">
                <h2 className="card-title">Check-In Time & Checkout Time</h2>
                <div className="flex">
                  <p className="flex gap-2">
                    <BsDoorClosed className="text-xl"></BsDoorClosed> Check-In
                    Time:{checkInTime}
                  </p>
                  <p className="flex gap-2">
                    <BsDoorOpen className="text-xl"></BsDoorOpen> Checkout Time:
                    {checkOutTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Cancellation Policy */}
          <div className="flex justify-center mt-6 shadow-md">
            <div className="card bg-white w-[800px] shadow-xl">
              <div className="card-body text-black divide-y-2">
                <h2 className="card-title">Cancellation Policy</h2>
                <p className="text-xl font-medium flex gap-2">
                  <RiCheckDoubleFill className="text-2xl"></RiCheckDoubleFill>{" "}
                  {cancellationPolicy}
                </p>
              </div>
            </div>
          </div>
          {/* Amenities */}
          <div className="flex justify-center mt-6 shadow-md">
            <div className="card bg-white w-[800px] shadow-xl">
              <div className="card-body text-black divide-y-2">
                <h2 className="card-title">Amenities</h2>
                <div className="flex flex-wrap gap-3">
                  {amenities.map((amenity, index) => (
                    <div className="flex items-center gap-2  px-3 py-1">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Beds */}
          <div className="flex justify-center mt-6 shadow-md">
            <div className="card bg-white w-[800px] shadow-xl">
              <div className="card-body text-black divide-y-2">
                <h2 className="card-title ">Beds</h2>
                <p className="text-xl font-medium flex gap-2">
                  <RiCheckDoubleFill className="text-2xl"></RiCheckDoubleFill>{" "}
                  {beds}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 mt-16 mx-auto">
          <div className="border-2 p-10 rounded-lg shadow-md mx-10">
            <div className="mb-4 flex flex-col text-black font-medium">
              <label>Check In</label>
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
                className="input input-bordered w-full focus:border-[#aa8453] focus:ring-0 text-black bg-white"
                required
                minDate={new Date()}
              />
            </div>
            <div className="mb-4 flex flex-col text-black font-medium">
              <label>Check Out</label>
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
                className="input input-bordered focus:border-[#aa8453] focus:ring-0 w-full text-black bg-white"
                required
                minDate={
                  checkInDate
                    ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
                    : new Date()
                }
              />
            </div>
            <div className="flex flex-col space-y-2 mb-6">
              <label className="font-medium text-black">Rooms</label>
              <input
                type="number"
                id="rooms"
                name="rooms"
                placeholder="Number of Rooms"
                min="1"
                className=" block input-bordered w-full px-5 py-3 text-black bg-white input rounded-md "
              />
            </div>
            <button className="btn btn-wide hover:bg-[#aa8453] border-white bg-white text-black">
              SEND BOOKING REQUEST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
