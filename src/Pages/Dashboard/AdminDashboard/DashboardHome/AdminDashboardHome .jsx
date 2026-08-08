import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

import DashboardStats from "./DashboardStats";
import RevenueChart from "./RevenueChart";
import BookingTrendChart from "./BookingTrendChart";
import OccupancyCard from "./OccupancyCard";
import RecentBookings from "./RecentBookings";
import TodaySummary from "./TodaySummary";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stats = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-[#c49b63]"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">{error.message}</div>
    );
  }

  return (
    <div className="space-y-6 mx-8 mb-10">
      {/* Statistics */}
      <DashboardStats stats={stats} />

      <TodaySummary />

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Booking Trend */}
      <BookingTrendChart />

      {/* Occupancy */}
      <OccupancyCard />

      {/* Recent Bookings */}
      <RecentBookings />
    </div>
  );
};

export default AdminDashboardHome;
