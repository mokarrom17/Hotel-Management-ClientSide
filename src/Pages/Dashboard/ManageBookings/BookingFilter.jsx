import { FiSearch } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";

const BookingFilter = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Search
          </label>

          <label className="input input-bordered flex items-center gap-2 w-full">
            <FiSearch className="text-gray-400" />

            <input
              type="text"
              className="grow"
              placeholder="Booking ID / Customer / Room"
            />
          </label>
        </div>

        {/* Booking Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Booking Status
          </label>

          <select className="select select-bordered w-full">
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked-in">Checked In</option>
            <option value="checked-out">Checked Out</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Payment Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Payment
          </label>

          <select className="select select-bordered w-full">
            <option value="">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        {/* Room Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Room Type
          </label>

          <select className="select select-bordered w-full">
            <option value="">All</option>
            <option>Single</option>
            <option>Deluxe</option>
            <option>Suite</option>
            <option>Family</option>
          </select>
        </div>

        {/* Reset */}
        <div className="flex items-end ">
          <button className="btn  w-full hover:bg-[#ab814b]">
            <MdRefresh className="text-lg" />
            <span className="text-lg">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingFilter;
