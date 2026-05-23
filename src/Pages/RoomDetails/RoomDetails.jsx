import { useContext, useState } from "react";

import { useLoaderData } from "react-router-dom";

import hotelBg from "../../assets/HotelBg2.jpg";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { BsDoorOpen } from "react-icons/bs";

import { RiCheckDoubleFill } from "react-icons/ri";

import {
  FiDroplet,
  FiMonitor,
  FiRefreshCw,
  FiWifi,
  FiWind,
} from "react-icons/fi";

import { FaSwimmingPool, FaArrowRight, FaStar } from "react-icons/fa";

import { FaAccessibleIcon } from "react-icons/fa6";

import { AuthContext } from "../../Providers/AuthProvider";

const RoomDetails = () => {
  // ==========================================
  // Context
  // ==========================================
  const { user } = useContext(AuthContext);

  // ==========================================
  // Loader Data
  // ==========================================
  const room = useLoaderData() || {};

  // ==========================================
  // Loading State
  // ==========================================
  if (!room?._id) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-[#c49b63]"></span>
      </div>
    );
  }

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
    amenities = [],
    beds,
    gallery = [],
    rating,
    reviews = [],
    totalReviews,
    tags = [],
    size,
    floor,
    view,
    isAvailable,
    discount,
  } = room;

  // ==========================================
  // States
  // ==========================================
  const [mainImage, setMainImage] = useState(image || "");

  const [checkInDate, setCheckInDate] = useState(null);

  const [checkOutDate, setCheckOutDate] = useState(null);

  // ==========================================
  // Gallery Images
  // ==========================================
  const fixedGallery =
    gallery?.map((img) => img.replace("i.ibb.co.com", "i.ibb.co")) || [];

  const smallImages = fixedGallery?.slice(0, 4) || [];

  // ==========================================
  // Handle Booking
  // ==========================================
  const handleBooking = (event) => {
    event.preventDefault();

    const form = event.target;

    const booking = {
      customerName: form.name.value,

      customerEmail: user?.email,

      customerPhone: form.phone.value,

      checkIn: form.checkIn.value,

      checkOut: form.checkOut.value,

      roomNumber: form.rooms.value,

      type,

      createdAt: new Date(),
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Booking Successful!");

          form.reset();

          setCheckInDate(null);

          setCheckOutDate(null);
        }
      })
      .catch(() => {
        toast.error("Booking Failed!");
      });
  };

  // ==========================================
  // Amenity Icons
  // ==========================================
  const getAmenityIcon = (amenity) => {
    switch (amenity?.toLowerCase()) {
      case "wifi":
      case "free wifi":
        return <FiWifi className="text-blue-500 text-xl" />;

      case "tv":
        return <FiMonitor className="text-green-500 text-xl" />;

      case "ac":
      case "air conditioning":
        return <FiWind className="text-purple-500 text-xl" />;

      case "whirlpool tub":
        return <FiDroplet className="text-teal-500 text-xl" />;

      case "connecting rooms":
        return <BsDoorOpen className="text-orange-500 text-xl" />;

      case "pool":
      case "swimming pool":
        return <FaSwimmingPool className="text-blue-400 text-xl" />;

      case "washing machine":
        return <FiRefreshCw className="text-gray-500 text-xl" />;

      case "accessible bathroom":
        return <FaAccessibleIcon className="text-blue-500 text-xl" />;

      default:
        return <RiCheckDoubleFill className="text-[#c49b63]" />;
    }
  };

  return (
    <div className="bg-[#faf7f2] min-h-screen">
      <ToastContainer />

      {/* ==========================================
          Hero Section
      ========================================== */}
      <div
        className="
          hero
          min-h-[50vh]
          relative
        "
        style={{
          backgroundImage: `url(${hotelBg})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65"></div>

        {/* Content */}
        <div
          className="
            hero-content
            relative
            z-10
            text-center
            text-white
          "
        >
          <div>
            {/* Tags */}
            <div className="flex justify-center flex-wrap gap-3 mb-6">
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className=" px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-sm uppercase tracking-[2px] font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className=" text-4xl md:text-6xl font-black leading-tight">
              {type}
            </h1>

            {/* Rating */}
            <div className=" flex items-center justify-center gap-2 mt-5 ">
              <FaStar className="text-yellow-400" />

              <span className="font-semibold text-lg">{rating || 4.8}</span>

              <span className="text-gray-300">
                ({totalReviews || 0} Reviews)
              </span>
            </div>

            {/* Availability */}
            <div className="flex justify-center mt-5">
              <span
                className={`
                  px-5 py-2 rounded-full text-sm font-bold tracking-wide
                  ${
                    isAvailable
                      ? "bg-green-500/20 text-green-300 border border-green-400/30"
                      : "bg-red-500/20 text-red-300 border border-red-400/30"
                  }
                `}
              >
                {isAvailable ? "AVAILABLE NOW" : "FULLY BOOKED"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Main Layout
      ========================================== */}
      <div className=" max-w-7xl mx-auto px-4 lg:px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ==========================================
            Left Content
        ========================================== */}
        <div className="lg:col-span-8">
          {/* Main Image */}
          <div className=" overflow-hidden rounded-[35px] shadow-2xl ">
            <img
              src={mainImage || image}
              alt=""
              className=" w-full h-[550px] object-cover hover:scale-105 transition-all duration-700"
            />
          </div>

          {/* Gallery */}
          <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 ">
            {smallImages?.map((smallImage, index) => (
              <img
                key={index}
                src={smallImage}
                alt=""
                onClick={() => setMainImage(smallImage)}
                className=" h-28 w-full object-cover rounded-2xl cursor-pointer border-4 border-transparent hover:border-[#c49b63] transition-all duration-300"
              />
            ))}
          </div>

          {/* Room Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <p className="text-gray-400 text-sm">Room Size</p>

              <h3 className="text-2xl font-black mt-2 text-black">
                {size} sqft
              </h3>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <p className="text-gray-400 text-sm">Floor</p>

              <h3 className="text-2xl font-black mt-2 text-black">{floor}th</h3>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <p className="text-gray-400 text-sm">View</p>

              <h3 className="text-2xl font-black mt-2 text-black">{view}</h3>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <p className="text-gray-400 text-sm">Beds</p>

              <h3 className="text-2xl font-black mt-2 text-black">{beds}</h3>
            </div>
          </div>

          {/* Info Cards */}
          <div className="space-y-6 mt-10">
            {/* Description */}
            <div className="bg-white rounded-[35px] shadow-lg p-8">
              <h2 className="text-3xl font-black mb-6 text-black">
                Description
              </h2>

              <p className=" text-gray-600 leading-9 text-[17px] font-medium ">
                {description}
              </p>
            </div>

            {/* Room Information */}
            <div className="bg-white rounded-[35px] shadow-lg p-8">
              <h2 className="text-3xl font-black mb-6 text-black">
                Room Information
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div>
                  <p className="text-gray-400">Adults</p>

                  <h3 className="font-bold text-xl text-black">{adults}</h3>
                </div>

                <div>
                  <p className="text-gray-400">Child</p>

                  <h3 className="font-bold text-xl text-black">{child}</h3>
                </div>

                <div>
                  <p className="text-gray-400">Check In</p>

                  <h3 className="font-bold text-xl text-black">
                    {checkInTime}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400">Check Out</p>

                  <h3 className="font-bold text-xl text-black">
                    {checkOutTime}
                  </h3>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-[35px] shadow-lg p-8">
              <h2 className="text-3xl font-black mb-6 text-black">Amenities</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {amenities?.map((amenity, index) => (
                  <div
                    key={index}
                    className=" flex items-center gap-4 bg-[#faf7f2] p-5 rounded-2xl"
                  >
                    {getAmenityIcon(amenity)}

                    <span className="font-medium text-black">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-[35px] shadow-lg p-8">
              <h2 className="text-3xl font-black mb-8 text-black">
                Guest Reviews
              </h2>

              <div className="space-y-6">
                {reviews?.map((review, index) => (
                  <div
                    key={index}
                    className=" border border-gray-100 rounded-3xl p-6"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-black">
                        {review.name}
                      </h3>

                      <div className="flex items-center gap-1 text-yellow-500">
                        <FaStar />

                        <span>{review.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-8">{review.comment}</p>

                    <p className="text-sm text-gray-400 mt-4">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-[35px] shadow-lg p-8">
              <h2 className="text-3xl font-black mb-5 text-black">
                Cancellation Policy
              </h2>

              <div className=" flex items-center gap-3 text-lg font-medium text-black">
                <RiCheckDoubleFill className="text-[#c49b63] text-2xl" />

                {cancellationPolicy}
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            Booking Card
        ========================================== */}
        <div className="lg:col-span-4">
          <div className=" sticky top-28 bg-white rounded-[35px] shadow-2xl p-8 border border-gray-100">
            {/* Price */}
            <div className="mb-8">
              <p className="text-gray-400">Price Per Night</p>

              <div className="flex items-end gap-2 mt-2">
                <h2 className="text-5xl font-black text-[#c49b63]">${price}</h2>

                <span className="text-gray-400 mb-2">/ night</span>
              </div>

              {discount > 0 && (
                <div className="mt-4">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {discount}% OFF TODAY
                  </span>
                </div>
              )}
            </div>

            {/* Booking Summary */}
            <div className="bg-[#faf7f2] rounded-3xl p-5 space-y-3 mb-8">
              <div className="flex justify-between">
                <span>1 Night</span>

                <span>${price}</span>
              </div>

              <div className="flex justify-between">
                <span>Service Fee</span>

                <span>$20</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-black text-lg">
                <span>Total</span>

                <span>${price + 20}</span>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBooking} className="space-y-5">
              {/* Check In */}
              <div>
                <label className="text-black font-semibold mb-2 block">
                  Check In
                </label>

                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Date"
                  name="checkIn"
                  className=" input input-bordered w-full bg-white text-black rounded-2xl h-14 "
                  required
                  minDate={new Date()}
                />
              </div>

              {/* Check Out */}
              <div>
                <label className="text-black font-semibold mb-2 block">
                  Check Out
                </label>

                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Date"
                  name="checkOut"
                  className=" input input-bordered w-full bg-white text-black rounded-2xl h-14"
                  required
                  minDate={
                    checkInDate
                      ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
                      : new Date()
                  }
                />
              </div>

              {/* Name */}
              <div>
                <label className="text-black font-semibold mb-2 block">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName}
                  placeholder="Enter your name"
                  className=" input input-bordered w-full bg-white text-black rounded-2xl h-14  "
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-black font-semibold mb-2 block">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  className=" input input-bordered w-full bg-gray-100 text-black rounded-2xl h-14 "
                  readOnly
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-black font-semibold mb-2 block">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  className=" input input-bordered w-full bg-white text-black rounded-2xl h-14"
                />
              </div>

              {/* Rooms */}
              <div>
                <label className="text-black font-semibold mb-2 block">
                  Number Of Rooms
                </label>

                <input
                  type="number"
                  name="rooms"
                  min="1"
                  placeholder="Rooms"
                  className=" input input-bordered w-full bg-white text-black rounded-2xl h-14"
                />
              </div>

              {/* Button */}
              <button className=" w-full h-16 rounded-2xl bg-[#c49b63] hover:bg-[#aa8453] text-white font-bold tracking-wide text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
                BOOK NOW
                <FaArrowRight />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
