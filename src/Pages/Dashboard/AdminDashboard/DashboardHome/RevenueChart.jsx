import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const RevenueChart = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: revenueData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["revenue-chart"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/revenue-chart");
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
          Failed to load revenue chart.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#2C3E50]">Monthly Revenue</h2>

        <p className="text-sm text-gray-500">
          Revenue generated from paid bookings.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#c49b63"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
