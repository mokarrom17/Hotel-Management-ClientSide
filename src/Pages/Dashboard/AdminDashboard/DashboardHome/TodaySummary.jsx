import { useQuery } from "@tanstack/react-query";
import {
  FaDollarSign,
  FaClipboardList,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const TodaySummary = ({}) => {
  const axiosSecure = useAxiosSecure();

  const { data: summary = {}, isLoading: summaryLoading } = useQuery({
    queryKey: ["today-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/today-summary");
      return res.data;
    },
  });
  const cards = [
    {
      title: "Today's Revenue",
      value: `$${summary?.todayRevenue || 0}`,
      icon: <FaDollarSign />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Today's Bookings",
      value: summary?.todayBookings || 0,
      icon: <FaClipboardList />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Today's Check-In",
      value: summary?.todayCheckIns || 0,
      icon: <FaSignInAlt />,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Today's Check-Out",
      value: summary?.todayCheckOuts || 0,
      icon: <FaSignOutAlt />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2C3E50]">Today's Summary</h2>

        <p className="text-sm text-gray-500">
          Daily booking and revenue overview
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 bg-gray-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>

                <h3 className="mt-2 text-3xl font-bold text-[#2C3E50]">
                  {card.value}
                </h3>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${card.color}`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySummary;
