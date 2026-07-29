import { useState } from "react";

import { useLoaderData, Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import hotelBg from "../../assets/HotelBg2.jpg";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { BsDoorOpen } from "react-icons/bs";

import { RiCheckDoubleFill } from "react-icons/ri";

import {
  FiDroplet,
  FiMonitor,
  FiRefreshCw,
  FiWifi,
  FiWind,
} from "react-icons/fi";

import {
  FaSwimmingPool,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
  FaLayerGroup,
  FaEye,
  FaPhoneAlt,
} from "react-icons/fa";

import { FaAccessibleIcon } from "react-icons/fa6";

const RoomDetails = () => {
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
    _id,
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
  } = room;

  // ==========================================
  // States
  // ==========================================
  const [mainImage, setMainImage] = useState(image || "");

  // ==========================================
  // Availability Summary — how many rooms of this
  // type are free right now, and on which floors/views
  // ==========================================
  const { data: availability = {} } = useQuery({
    queryKey: ["roomAvailability", type],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/rooms/availability?roomType=${encodeURIComponent(type)}`,
      );
      return res.json();
    },
    enabled: !!type,
  });

  // ==========================================
  // Gallery Images
  // ==========================================
  const fixedGallery =
    gallery?.map((img) => img.replace("i.ibb.co.com", "i.ibb.co")) || [];

  const smallImages = fixedGallery?.slice(0, 4) || [];

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
        className="hero min-h-[50vh] relative"
        style={{
          backgroundImage: `url(${hotelBg})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65"></div>

        {/* Content */}
        <div className="hero-content relative z-10 text-center text-white">
          <div>
            {/* Tags */}
            <div className="flex justify-center flex-wrap gap-3 mb-6">
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-sm uppercase tracking-[2px] font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              {type}
            </h1>

            {/* Rating */}
            <div className="flex items-center justify-center gap-2 mt-5">
              <FaStar className="text-yellow-400" />

              <span className="font-semibold text-lg">{rating || 4.8}</span>

              <span className="text-gray-300">
                ({totalReviews || 0} Reviews)
              </span>
            </div>

            {/* Availability */}
            <div className="flex justify-center mt-5">
              <span
                className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide ${
                  isAvailable
                    ? "bg-green-500/20 text-green-300 border border-green-400/30"
                    : "bg-red-500/20 text-red-300 border border-red-400/30"
                }`}
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
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ==========================================
            Left Content
        ========================================== */}
        <div className="lg:col-span-8">
          {/* Main Image */}
          <div className="overflow-hidden rounded-[35px] shadow-2xl">
            <img
              src={mainImage || image}
              alt={type}
              className="w-full h-[550px] object-cover hover:scale-105 transition-all duration-700"
            />
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            {smallImages?.map((smallImage, index) => (
              <img
                key={index}
                src={smallImage}
                alt={`${type} preview ${index + 1}`}
                onClick={() => setMainImage(smallImage)}
                className="h-28 w-full object-cover rounded-2xl cursor-pointer border-4 border-transparent hover:border-[#c49b63] transition-all duration-300"
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

              <p className="text-gray-600 leading-9 text-[17px] font-medium">
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
                    className="flex items-center gap-4 bg-[#faf7f2] p-5 rounded-2xl"
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
                {reviews?.length > 0 ? (
                  reviews.map((review, index) => (
                    <div
                      key={index}
                      className="border border-gray-100 rounded-3xl p-6"
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

                      <p className="text-gray-600 leading-8">
                        {review.comment}
                      </p>

                      <p className="text-sm text-gray-400 mt-4">
                        {review.date}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No reviews yet.</p>
                )}
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-[35px] shadow-lg p-8">
              <h2 className="text-3xl font-black mb-5 text-black">
                Cancellation Policy
              </h2>

              <div className="flex items-center gap-3 text-lg font-medium text-black">
                <RiCheckDoubleFill className="text-[#c49b63] text-2xl" />

                {cancellationPolicy}
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            Book Now Panel
        ========================================== */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-[35px] shadow-2xl p-8 border border-gray-100">
            {/* Price */}
            <div className="mb-8">
              <p className="text-gray-400">Starting From</p>

              <div className="flex items-end gap-2 mt-2">
                <h2 className="text-5xl font-black text-[#c49b63]">${price}</h2>

                <span className="text-gray-400 mb-2">/ Night</span>
              </div>

              {room.discount > 0 && (
                <div className="mt-4">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {room.discount}% OFF TODAY
                  </span>
                </div>
              )}
            </div>

            {/* Room Info */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Guests</span>
                <span className="font-semibold text-black">
                  {adults} Adults • {child} Child
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Beds</span>
                <span className="font-semibold text-black">{beds}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Floor</span>
                <span className="font-semibold text-black">{floor}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">View</span>
                <span className="font-semibold text-black">{view}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span
                  className={`font-bold ${
                    isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>

            {/* Availability Summary — live from the rooms collection */}
            {isAvailable && (
              <div className="mt-6 rounded-2xl border border-[#c49b63]/30 bg-[#faf7f2] p-5">
                <div className="flex items-center gap-2 font-bold text-black">
                  <FaCheckCircle className="text-green-600" />
                  {availability.availableCount ?? "—"} Room
                  {availability.availableCount !== 1 ? "s" : ""} Available Right
                  Now
                </div>

                {availability.floors?.length > 0 && (
                  <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                    <FaLayerGroup className="mt-0.5 text-[#c49b63]" />
                    <span>
                      Floors:{" "}
                      {availability.floors
                        .map(
                          (f) =>
                            `${f}${f === 1 ? "st" : f === 2 ? "nd" : f === 3 ? "rd" : "th"}`,
                        )
                        .join(", ")}
                    </span>
                  </div>
                )}

                {availability.views?.length > 0 && (
                  <div className="mt-2 flex items-start gap-2 text-sm text-gray-600">
                    <FaEye className="mt-0.5 text-[#c49b63]" />
                    <span>Views: {availability.views.join(", ")}</span>
                  </div>
                )}
              </div>
            )}

            {/* Book Now — takes the guest to the standalone booking form */}
            {isAvailable ? (
              <Link to={`/booking/${_id}`}>
                <button className="mt-8 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#c49b63] font-bold tracking-wide text-white transition hover:bg-[#aa8453]">
                  BOOK NOW
                  <FaArrowRight />
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="mt-8 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#c49b63] font-bold tracking-wide text-white opacity-50 cursor-not-allowed"
              >
                CURRENTLY UNAVAILABLE
              </button>
            )}

            {/* Need Help */}
            <div className="mt-8 rounded-2xl bg-[#faf7f2] p-5">
              <h3 className="font-bold text-black">Need Help?</h3>

              <p className="mt-2 text-sm text-gray-500">
                Contact our reservation team for booking assistance.
              </p>

              <p className="mt-4 flex items-center gap-2 font-bold text-[#c49b63]">
                <FaPhoneAlt />
                +1 800 555 0199
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
