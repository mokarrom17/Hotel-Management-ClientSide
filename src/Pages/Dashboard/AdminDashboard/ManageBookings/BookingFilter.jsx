import { FaCalendarCheck, FaHotel, FaSortAmountDown } from "react-icons/fa";
import { FiRefreshCw, FiSearch } from "react-icons/fi";
import { MdPayment, MdRefresh } from "react-icons/md";

const BookingFilter = ({
  search,
  setSearch,
  bookingStatus,
  setBookingStatus,
  paymentStatus,
  setPaymentStatus,
  roomType,
  setRoomType,
  sortBy,
  setSortBy,
  onReset,
  setCurrentPage,
  bookingCount,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        {/* Search */}
        <div className="lg:col-span-2 ">
          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <FiSearch className="text-[#C89A57]" />
            Search
          </label>

          <label className="input input-bordered flex w-full items-center gap-2">
            <FiSearch className="text-gray-400" />

            <input
              type="text"
              className="grow"
              placeholder="Search by Booking ID, Customer or Room..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </label>
        </div>

        {/* Booking Status */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <FaCalendarCheck className="text-[#C89A57]" />
            Booking Status
          </label>

          <select
            value={bookingStatus}
            className="select select-bordered w-full"
            onChange={(e) => {
              setBookingStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked-in">Checked-In</option>
            <option value="checked-out">Checked-Out</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Payment Status */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <MdPayment className="text-[#C89A57]" />
            Payment
          </label>

          <select
            value={paymentStatus}
            className="select select-bordered w-full"
            onChange={(e) => {
              setPaymentStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Payment</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Room Type */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <FaHotel className="text-[#C89A57]" />
            Room Type
          </label>

          <select
            value={roomType}
            className="select select-bordered w-full"
            onChange={(e) => {
              setRoomType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Room Types</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
            <option value="Family">Family</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <FaSortAmountDown className="text-[#C89A57]" />
            Sort By
          </label>

          <select
            className="select select-bordered w-full"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Default</option>
            <option value="checkInAsc">Check-In (Old → New)</option>
            <option value="checkInDesc">Check-In (New → Old)</option>
            <option value="checkOutAsc">Check-Out (Old → New)</option>
            <option value="checkOutDesc">Check-Out (New → Old)</option>
            <option value="amountAsc">Amount (Low → High)</option>
            <option value="amountDesc">Amount (High → Low)</option>
            <option value="bookingStatusAsc">Booking Status (A-Z)</option>
            <option value="paymentStatusAsc">Payment Status (A-Z)</option>
          </select>
        </div>
      </div>
      {/* Reset */}
      <div className="mt-6 border-t border-gray-200 pt-5">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-bold text-[#C89A57]">{bookingCount}</span>{" "}
            Bookings
          </p>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 text-sm font-semibold text-[#C89A57] hover:underline"
          >
            <FiRefreshCw />
            Reset All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingFilter;
