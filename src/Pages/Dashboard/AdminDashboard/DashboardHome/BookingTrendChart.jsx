import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const BookingTrendChart = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: bookingTrend = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booking-trend"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/booking-trend");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg text-[#c49b63]"></span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <p className="text-center text-red-500">
          Failed to load booking trend.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#2C3E50]">Booking Trend</h2>

        <p className="text-sm text-gray-500">Monthly booking statistics.</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={bookingTrend}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="bookings" fill="#c49b63" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingTrendChart;
