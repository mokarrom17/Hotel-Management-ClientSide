import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import BookingFilter from "./BookingFilter";
import BookingStats from "./BookingStats";
import BookingTable from "./BookingTable";
import { useState } from "react";
import BookingDetailsModal from "./BookingDetailsModal";
import Swal from "sweetalert2";
import Pagination from "../../Shared/Pagination/Pagination";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

  const [sortBy, setSortBy] = useState("");

  const [search, setSearch] = useState("");

  const [bookingStatus, setBookingStatus] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("");

  const [roomType, setRoomType] = useState("");

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/bookings");
      return res.data;
    },
  });

  const handleConfirmBooking = async (booking) => {
    const result = await Swal.fire({
      title: "Confirm Booking?",
      text: "Do you want to confirm this booking?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(
        `/admin/bookings/${booking._id}/confirm`,
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Booking Confirmed",
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to confirm booking.",
      });
    }
  };

  const handleCancelBooking = async (booking) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel Booking",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(
        `/admin/bookings/${booking._id}/cancel`,
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Booking Cancelled",
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to cancel booking.",
      });
    }
  };

  const handleCheckIn = async (booking) => {
    const result = await Swal.fire({
      title: "Check-In Guest?",
      text: "Mark this guest as checked-in?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Check-In",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(
        `/admin/bookings/${booking._id}/check-in`,
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Guest Checked-In",
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to check-in guest.",
      });
    }
  };
  const handleCheckOut = async (booking) => {
    const result = await Swal.fire({
      title: "Check-Out Guest?",
      text: "Complete this guest's stay?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Check-Out",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(
        `/admin/bookings/${booking._id}/check-out`,
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Guest Checked-Out",
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to check-out guest.",
      });
    }
  };

  const handleReset = () => {
    setSearch("");
    setBookingStatus("");
    setPaymentStatus("");
    setRoomType("");
    setSortBy("");
    setCurrentPage(1);
  };

  const filteredBookings = bookings.filter((booking) => {
    const keyword = search.trim().toLowerCase();

    const matchesSearch =
      booking._id?.toLowerCase().includes(keyword) ||
      booking.customerName?.toLowerCase().includes(keyword) ||
      booking.roomNumber?.toString().includes(keyword);

    const matchesBookingStatus =
      !bookingStatus || booking.bookingStatus === bookingStatus;

    const matchesPaymentStatus =
      !paymentStatus || booking.paymentStatus === paymentStatus;

    const matchesRoomType = !roomType || booking.type === roomType;

    return (
      matchesSearch &&
      matchesBookingStatus &&
      matchesPaymentStatus &&
      matchesRoomType
    );
  });

  const sortedBookings = [...filteredBookings];

  switch (sortBy) {
    case "checkInAsc":
      sortedBookings.sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
      break;

    case "checkInDesc":
      sortedBookings.sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));
      break;

    case "checkOutAsc":
      sortedBookings.sort(
        (a, b) => new Date(a.checkOut) - new Date(b.checkOut),
      );
      break;

    case "checkOutDesc":
      sortedBookings.sort(
        (a, b) => new Date(b.checkOut) - new Date(a.checkOut),
      );
      break;

    case "amountAsc":
      sortedBookings.sort((a, b) => a.totalPrice - b.totalPrice);
      break;

    case "amountDesc":
      sortedBookings.sort((a, b) => b.totalPrice - a.totalPrice);
      break;

    case "bookingStatusAsc":
      sortedBookings.sort((a, b) =>
        a.bookingStatus.localeCompare(b.bookingStatus),
      );
      break;

    case "paymentStatusAsc":
      sortedBookings.sort((a, b) =>
        a.paymentStatus.localeCompare(b.paymentStatus),
      );
      break;

    default:
      break;
  }

  //
  const totalPages = Math.ceil(sortedBookings.length / bookingsPerPage);

  const startIndex = (currentPage - 1) * bookingsPerPage;

  const paginatedBookings = sortedBookings.slice(
    startIndex,
    startIndex + bookingsPerPage,
  );

  return (
    <div className="space-y-6 mx-8 mb-12">
      <div>
        <h2 className="text-3xl font-bold text-[#2C3E50]">Manage Bookings</h2>
        <p className="text-gray-500 mt-1">
          View, manage and track all hotel bookings.
        </p>
      </div>

      {/* Statistics Cards */}
      <BookingStats bookings={bookings} />

      {/* Search & Filter */}
      <BookingFilter
        search={search}
        setSearch={setSearch}
        bookingStatus={bookingStatus}
        setBookingStatus={setBookingStatus}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
        roomType={roomType}
        setRoomType={setRoomType}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={handleReset}
        setCurrentPage={setCurrentPage}
        bookingCount={filteredBookings.length}
      />

      {/* Booking Table */}
      <BookingTable
        bookings={paginatedBookings}
        startIndex={startIndex}
        isLoading={isLoading}
        onView={setSelectedBooking}
        onConfirm={handleConfirmBooking}
        onCancel={handleCancelBooking}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
      />
      <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ManageBookings;
