// ==========================================
// Booking Summary Card
// Shows a price breakdown: (nights * rooms * price) + service fee.
// Kept as its own component so it can be reused
// (e.g. later on a checkout / payment confirmation page).
// ==========================================
const BookingSummary = ({ price, nights = 1, rooms = 1, serviceFee = 20 }) => {
  const roomTotal = price * nights * rooms;
  const total = roomTotal + serviceFee;

  return (
    <div className="bg-[#faf7f2] rounded-3xl p-5 space-y-3 mb-8">
      <div className="flex justify-between">
        <span>
          {nights} Night{nights > 1 ? "s" : ""} × {rooms} Room
          {rooms > 1 ? "s" : ""}
        </span>

        <span>${roomTotal}</span>
      </div>

      <div className="flex justify-between">
        <span>Service Fee</span>

        <span>${serviceFee}</span>
      </div>

      <div className="border-t pt-3 flex justify-between font-black text-lg">
        <span>Total</span>

        <span>${total}</span>
      </div>
    </div>
  );
};

export default BookingSummary;
