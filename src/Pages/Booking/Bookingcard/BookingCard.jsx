import { useContext, useMemo, useState } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { FaArrowRight } from "react-icons/fa";

import { toast } from "react-toastify";

import { AuthContext } from "../../../Providers/AuthProvider.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import BookingSummary from "../BookingSummary/BookingSummary.jsx";

// ==========================================
// Helpers
// ==========================================
const MS_PER_DAY = 1000 * 60 * 60 * 24;

// Number of nights between two dates. Falls back to 1
// so the summary/price never shows 0 or a negative value.
const getNightsBetween = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 1;

  const diffDays = Math.round(
    (checkOut.getTime() - checkIn.getTime()) / MS_PER_DAY,
  );

  return diffDays > 0 ? diffDays : 1;
};

// Keeps the rooms count a valid whole number >= 1
const sanitizeRoomsCount = (value) => {
  const parsed = parseInt(value, 10);

  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
};

// ==========================================
// Booking Card
// Price + summary + the whole booking form, all
// self-contained so RoomDetails only needs to render
// <BookingCard room={room} />
// ==========================================
const BookingCard = ({ room }) => {
  const { _id: roomId, type, price, discount, isAvailable } = room;

  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  // ==========================================
  // States
  // ==========================================
  const [checkInDate, setCheckInDate] = useState(null);

  const [checkOutDate, setCheckOutDate] = useState(null);

  // ✅ Number Of Rooms — now controlled, so price recalculates live
  const [roomsCount, setRoomsCount] = useState(1);

  const [submitting, setSubmitting] = useState(false);

  // ==========================================
  // Nights / Price
  // ==========================================
  const nights = useMemo(
    () => getNightsBetween(checkInDate, checkOutDate),
    [checkInDate, checkOutDate],
  );

  const serviceFee = 20;

  // price * nights * rooms + one flat service fee
  const totalPrice = price * nights * roomsCount + serviceFee;

  // ==========================================
  // Handle Booking
  // ==========================================
  const handleBooking = async (event) => {
    event.preventDefault();

    if (!isAvailable) return;

    const form = event.target;

    setSubmitting(true);

    try {
      // ✅ Firebase token নাও
      const token = await user.getIdToken();

      const booking = {
        roomId,

        customerName: form.name.value,

        customerEmail: user?.email,

        customerPhone: form.phone.value,

        checkIn: form.checkIn.value,

        checkOut: form.checkOut.value,

        // Number of rooms booked (kept as "roomNumber" to match
        // the existing field already used in MyBookings.jsx)
        roomNumber: roomsCount,

        // room information
        type,

        price,

        nights,

        serviceFee,

        totalPrice,

        paymentStatus: "pending",

        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/bookings", booking, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.data.insertedId) {
        toast.success("Booking Successful!");
        form.reset();
        setCheckInDate(null);
        setCheckOutDate(null);
        setRoomsCount(1);
      }
    } catch (error) {
      toast.error("Booking Failed!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sticky top-28 bg-white rounded-[35px] shadow-2xl p-8 border border-gray-100">
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

      {/* Booking Summary — now reacts to nights AND room count */}
      <BookingSummary
        price={price}
        nights={nights}
        rooms={roomsCount}
        serviceFee={serviceFee}
      />

      {/* Booking Form */}
      <form onSubmit={handleBooking} className="space-y-5">
        {/* Check In */}
        <div>
          <label className="text-black font-semibold mb-2 block">
            Check In
          </label>

          <DatePicker
            selected={checkInDate}
            onChange={(date) => {
              setCheckInDate(date);
              // keep check-out valid if it's now before/equal to the new check-in
              if (checkOutDate && date && checkOutDate <= date) {
                setCheckOutDate(null);
              }
            }}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Date"
            name="checkIn"
            className="input input-bordered w-full bg-white text-black rounded-2xl h-14"
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
            className="input input-bordered w-full bg-white text-black rounded-2xl h-14"
            required
            minDate={
              checkInDate
                ? new Date(checkInDate.getTime() + MS_PER_DAY)
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
            className="input input-bordered w-full bg-white text-black rounded-2xl h-14"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-black font-semibold mb-2 block">Email</label>

          <input
            type="email"
            name="email"
            defaultValue={user?.email}
            className="input input-bordered w-full bg-gray-100 text-black rounded-2xl h-14"
            readOnly
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-black font-semibold mb-2 block">Phone</label>

          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            className="input input-bordered w-full bg-white text-black rounded-2xl h-14"
            required
          />
        </div>

        {/* Rooms — controlled now, drives the price live */}
        <div>
          <label className="text-black font-semibold mb-2 block">
            Number Of Rooms
          </label>

          <input
            type="number"
            name="rooms"
            min="1"
            value={roomsCount}
            onChange={(e) => setRoomsCount(sanitizeRoomsCount(e.target.value))}
            placeholder="Rooms"
            className="input input-bordered w-full bg-white text-black rounded-2xl h-14"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={!isAvailable || submitting}
          className="w-full h-16 rounded-2xl bg-[#c49b63] hover:bg-[#aa8453] text-white font-bold tracking-wide text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!isAvailable ? (
            "CURRENTLY UNAVAILABLE"
          ) : submitting ? (
            "BOOKING..."
          ) : (
            <>
              BOOK NOW
              <FaArrowRight />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingCard;
