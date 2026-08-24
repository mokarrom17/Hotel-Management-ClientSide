import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft, FaStar, FaUserFriends, FaBed } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import BookingSummary from "../BookingSummary/BookingSummary";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const BookingPage = () => {
  // ===============================
  // Loader Data
  // ===============================
  const room = useLoaderData();

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { image, type, price, adults, child, beds, rating, totalReviews } =
    room;

  // ===============================
  // States
  // ===============================
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [floor, setFloor] = useState("");
  const [view, setView] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24),
        )
      : 0;

  const serviceFee = 20;

  const { data: filterOptions = { floors: [], views: [] } } = useQuery({
    queryKey: ["roomFilters", type],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rooms/filters?roomType=${encodeURIComponent(type)}`,
      );
      return res.data;
    },
  });

  const { data: availableRooms = [], isLoading: loadingRooms } = useQuery({
    queryKey: ["availableRooms", type, checkIn, checkOut, floor, view],
    queryFn: async () => {
      const params = new URLSearchParams({
        roomType: type,
        checkIn,
        checkOut,
      });

      if (floor) params.append("floor", floor);
      if (view) params.append("view", view);

      const res = await axiosSecure.get(
        `/rooms/available?${params.toString()}`,
      );
      return res.data;
    },
    enabled: !!checkIn && !!checkOut,
  });

  if (!room?._id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#c49b63]"></span>
      </div>
    );
  }

  const handleContinue = async () => {
    if (!selectedRoom) return;

    const bookingData = {
      customerName: user.displayName,
      customerEmail: user.email,
      type,
      roomId: selectedRoom._id,
      roomNumber: selectedRoom.roomNumber,
      checkIn,
      checkOut,
      nights,
      pricePerNight: price,
      serviceFee,
      totalPrice: nights * price + serviceFee,
      paymentStatus: "pending",
      bookingStatus: "pending",
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingData);
      navigate(`/payment/${res.data.result.insertedId}`);
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error(
          error.response.data.message ||
            "This room was just booked. Please pick another.",
        );
        setSelectedRoom(null);
        queryClient.invalidateQueries({
          queryKey: ["availableRooms", type, checkIn, checkOut],
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <Link
          to={`/roomDetails/${room._id}`}
          className="inline-flex items-center gap-2 text-[#c49b63] font-semibold hover:underline mb-8"
        >
          <FaArrowLeft />
          Back to Room Details
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ================================= */}
          {/* Left Side */}
          {/* ================================= */}

          <div className="lg:col-span-8 space-y-8">
            {/* Room Card */}

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <img
                src={image}
                alt={type}
                className="w-full h-[420px] object-cover"
              />

              <div className="p-8">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <h1 className="text-4xl font-black text-black">{type}</h1>

                    <div className="flex items-center gap-2 mt-3">
                      <FaStar className="text-yellow-400" />

                      <span className="font-semibold">{rating || 4.8}</span>

                      <span className="text-gray-500">
                        ({totalReviews || 0} Reviews)
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-500">Price Per Night</p>

                    <h2 className="text-5xl font-black text-[#c49b63]">
                      £{price}
                    </h2>
                  </div>
                </div>

                {/* Quick Info */}

                <div className="grid grid-cols-3 gap-5 mt-10">
                  <div className="bg-[#faf7f2] rounded-2xl p-5 text-center">
                    <FaUserFriends className="mx-auto text-3xl text-[#c49b63]" />

                    <h3 className="font-bold mt-3">{adults} Adults</h3>
                  </div>

                  <div className="bg-[#faf7f2] rounded-2xl p-5 text-center">
                    <FaUserFriends className="mx-auto text-3xl text-[#c49b63]" />

                    <h3 className="font-bold mt-3">{child} Child</h3>
                  </div>

                  <div className="bg-[#faf7f2] rounded-2xl p-5 text-center">
                    <FaBed className="mx-auto text-3xl text-[#c49b63]" />

                    <h3 className="font-bold mt-3">{beds}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* ================================= */}
            {/* Booking Form */}
            {/* ================================= */}

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-3xl font-black mb-8">Booking Information</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-semibold">Check In</label>

                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => {
                      (setCheckIn(e.target.value), setSelectedRoom(null));

                      // Check-out reset if invalid
                      if (checkOut && e.target.value >= checkOut) {
                        setCheckOut("");
                      }
                    }}
                    className="input input-bordered w-full mt-2"
                  />
                </div>

                <div>
                  <label className="font-semibold">Check Out</label>
                  <input
                    type="date"
                    min={checkIn || today}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    disabled={!checkIn}
                    className="input input-bordered w-full mt-2 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>
            {/* ================================= */}
            {/* Available Rooms */}
            {/* ================================= */}

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-3xl font-black mb-8">Choose Your Room</h2>

              {/* Floor / View Filter */}
              {checkIn && checkOut && (
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div>
                    <label className="font-semibold text-sm text-gray-600">
                      Floor
                    </label>
                    <select
                      className="select select-bordered w-full mt-2"
                      value={floor}
                      onChange={(e) => {
                        setFloor(e.target.value);
                        setSelectedRoom(null);
                      }}
                    >
                      <option value="">All Floors</option>
                      {filterOptions.floors.map((f) => (
                        <option key={f} value={f}>
                          Floor {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-sm text-gray-600">
                      View
                    </label>
                    <select
                      className="select select-bordered w-full mt-2"
                      value={view}
                      onChange={(e) => {
                        setView(e.target.value);
                        setSelectedRoom(null);
                      }}
                    >
                      <option value="">All Views</option>
                      {filterOptions.views.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>

                  {(floor || view) && (
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => {
                          setFloor("");
                          setView("");
                          setSelectedRoom(null);
                        }}
                        className="btn btn-ghost text-[#c49b63]"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-5">
                {/* Room Card */}
                {!checkIn || !checkOut ? (
                  <p className="text-gray-500">
                    Room দেখতে আগে Check In / Check Out date সিলেক্ট করো।
                  </p>
                ) : loadingRooms ? (
                  <span className="loading loading-spinner text-[#c49b63]"></span>
                ) : availableRooms.length === 0 ? (
                  <p className="text-gray-500">
                    এই date{floor || view ? " এবং filter" : ""}-এর জন্য কোনো
                    room available নাই।
                    {(floor || view) && " Filter clear করে বা "}
                    অন্য date try করো।
                  </p>
                ) : (
                  availableRooms.map((room) => (
                    <label
                      key={room._id}
                      className={`border rounded-2xl p-5 flex justify-between items-center cursor-pointer transition-all duration-300
                        ${
                          selectedRoom?._id === room._id
                            ? "border-[#c49b63] bg-[#fff8ef] shadow-md"
                            : "border-gray-200 hover:border-[#c49b63]"
                        }`}
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold">
                            Room {room.roomNumber}
                          </h3>

                          {selectedRoom?._id === room._id && (
                            <span className="badge badge-warning text-white">
                              Selected
                            </span>
                          )}
                        </div>

                        <p className="text-gray-500 mt-2">
                          Floor: {room.floor}
                        </p>

                        <p className="text-gray-500">{room.view}</p>
                      </div>

                      <input
                        type="radio"
                        name="room"
                        className="radio radio-warning"
                        checked={selectedRoom?._id === room._id}
                        onChange={() => setSelectedRoom(room)}
                      />
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* Right Side */}
          {/* ================================= */}

          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <BookingSummary
                roomType={type}
                selectedRoom={selectedRoom}
                adults={adults}
                child={child}
                checkIn={checkIn}
                checkOut={checkOut}
                price={price}
                nights={nights}
                serviceFee={serviceFee}
                handleContinue={handleContinue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
