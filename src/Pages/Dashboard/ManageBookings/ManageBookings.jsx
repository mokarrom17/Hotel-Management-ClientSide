import BookingFilter from "./BookingFilter";
import BookingStats from "./BookingStats";
import BookingTable from "./BookingTable";

const ManageBookings = () => {
  return (
    <div className="space-y-6 mx-8">
      <div>
        <h2 className="text-3xl font-bold text-[#2C3E50]">Manage Bookings</h2>
        <p className="text-gray-500 mt-1">
          View, manage and track all hotel bookings.
        </p>
      </div>

      {/* Statistics Cards */}
      <BookingStats />

      {/* Search & Filter */}
      <BookingFilter />

      {/* Booking Table */}
      <BookingTable />
    </div>
  );
};

export default ManageBookings;
