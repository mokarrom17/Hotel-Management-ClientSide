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

  //
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const startIndex = (currentPage - 1) * bookingsPerPage;
  const endIndex = startIndex + bookingsPerPage;

  const paginatedBookings = bookings.slice(startIndex, endIndex);

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
      <BookingFilter />

      {/* Booking Table */}
      <BookingTable
        bookings={paginatedBookings}
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
