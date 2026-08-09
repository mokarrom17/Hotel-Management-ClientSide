import {
  FaCalendarCheck,
  FaCalendarAlt,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UserStats = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stats = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/dashboard-stats");
      return res.data;
    },
  });

  const statsData = [
    {
      title: "Total Bookings",
      value: stats.totalBookings || 0,
      icon: FaCalendarCheck,
    },
    {
      title: "Upcoming Stays",
      value: stats.upcomingStays || 0,
      icon: FaCalendarAlt,
    },
    {
      title: "Completed Stays",
      value: stats.completedStays || 0,
      icon: FaCheckCircle,
    },
    {
      title: "Total Spent",
      value: `$${stats.totalSpent || 0}`,
      icon: FaMoneyBillWave,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-xl border border-gray-200 bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
        Failed to load dashboard statistics.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {statsData.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-800">
                  {stat.value}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c49b63]/10 text-[#c49b63]">
                <Icon className="text-xl" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserStats;
