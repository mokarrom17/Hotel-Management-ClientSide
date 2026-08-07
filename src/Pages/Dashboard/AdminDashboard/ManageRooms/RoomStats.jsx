import { useQuery } from "@tanstack/react-query";
import { FaDoorOpen, FaCheckCircle, FaBed, FaTools } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const RoomStats = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stats = {},
    isPending,
    isError,
  } = useQuery({
    queryKey: ["roomStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rooms/stats");
      return res.data;
    },
  });

  if (isError) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
        <p className="font-medium text-red-500">
          Failed to load room statistics.
        </p>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Rooms",
      value: stats.totalRooms ?? 0,
      icon: <FaDoorOpen className="text-2xl text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Available Rooms",
      value: stats.availableRooms ?? 0,
      icon: <FaCheckCircle className="text-2xl text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Booked Rooms",
      value: stats.bookedRooms ?? 0,
      icon: <FaBed className="text-2xl text-red-600" />,
      bg: "bg-red-100",
    },
    {
      title: "Maintenance",
      value: stats.maintenanceRooms ?? 0,
      icon: <FaTools className="text-2xl text-yellow-600" />,
      bg: "bg-yellow-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {statsCards.map((card) => (
        <div
          key={card.title}
          className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium tracking-wide text-gray-500">
                {card.title}
              </p>

              {isPending ? (
                <div className="mt-3 h-9 w-20 animate-pulse rounded-lg bg-gray-200"></div>
              ) : (
                <h2 className="mt-2 text-3xl font-bold text-gray-800">
                  {card.value}
                </h2>
              )}
            </div>

            <div
              className={`rounded-2xl p-4 transition-all duration-300 group-hover:scale-110 ${card.bg}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomStats;
