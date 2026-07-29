import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft, FaStar, FaUserFriends, FaBed } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import BookingSummary from "../BookingSummary/BookingSummary";
import useAuth from "../../../hooks/useAuth";

const BookingPage = () => {
  // ===============================
  // Loader Data
  // ===============================
  const room = useLoaderData();

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const navigate = useNavigate();

  const { image, type, price, adults, child, beds, rating, totalReviews } =
    room;

  // ===============================
  // States
  // ===============================
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24),
        )
      : 0;

  const serviceFee = 20;

  const { data: availableRooms = [] } = useQuery({
    queryKey: ["availableRooms", type],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rooms/available?roomType=${type}`);
      return res.data;
    },
  });

  if (!room?._id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#c49b63]"></span>
      </div>
    );
  }

  const handleContinue = async () => {
    const bookingData = {
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
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingData);

      navigate(`/payment/${res.data.insertedId}`);
    } catch (error) {
      console.log(error);
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
                      setCheckIn(e.target.value);

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

              <div className="space-y-5">
                {/* Room Card */}

                {availableRooms.map((room) => (
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

                      <p className="text-gray-500 mt-2">Floor: {room.floor}</p>

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
                ))}
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
