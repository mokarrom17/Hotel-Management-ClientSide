// ==========================================
// Booking Summary Card
// ==========================================

const BookingSummary = ({
  roomType,
  selectedRoom,
  adults,
  child,
  checkIn,
  checkOut,
  price,
  nights,
  serviceFee,
  handleContinue,
}) => {
  const roomTotal = nights > 0 ? price * nights : 0;
  const total = roomTotal + serviceFee;

  const isBookingValid = selectedRoom && checkIn && checkOut && nights > 0;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-3xl font-black mb-8">Booking Summary</h2>

      <div className="space-y-5">
        {/* Room Type */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Room Type</span>
          <span className="font-semibold">{roomType}</span>
        </div>

        {/* Selected Room */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Selected Room</span>
          <span className="font-semibold">
            {selectedRoom ? selectedRoom.roomNumber : "--"}
          </span>
        </div>

        {/* Guests */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Guests</span>
          <span className="font-semibold">
            {adults} Adult{adults > 1 ? "s" : ""}
            {child > 0 && `, ${child} Child`}
          </span>
        </div>

        {/* Price / Night */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Price / Night</span>
          <span className="font-semibold">${price}</span>
        </div>

        {/* Check In */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Check In</span>
          <span>{checkIn || "--"}</span>
        </div>

        {/* Check Out */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Check Out</span>
          <span>{checkOut || "--"}</span>
        </div>

        <div className="border-t"></div>

        {/* Nights */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Nights</span>
          <span className="font-semibold">{nights > 0 ? nights : "--"}</span>
        </div>

        {/* Room Total */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Room Total</span>
          <span className="font-semibold">
            {nights > 0 ? `$${roomTotal}` : "--"}
          </span>
        </div>

        {/* Service Fee */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Service Fee</span>
          <span>{nights > 0 ? `$${serviceFee}` : "--"}</span>
        </div>

        <div className="border-t pt-5">
          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold">Total</span>
            <span className="text-2xl font-black text-[#c49b63]">
              {nights > 0 ? `$${total}` : "--"}
            </span>{" "}
          </div>

          <button
            onClick={handleContinue}
            disabled={!isBookingValid}
            className="btn w-full bg-[#c49b63] text-white border-none hover:bg-[#b88a4d] disabled:bg-gray-300"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
