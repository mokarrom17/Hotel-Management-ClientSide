import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

const OccupancyCard = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["occupancy"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/occupancy");
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

  const chartData = [
    {
      name: "Available",
      value: data.availableRooms,
    },
    {
      name: "Booked",
      value: data.bookedRooms,
    },
    {
      name: "Maintenance",
      value: data.maintenanceRooms,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#2C3E50]">Room Occupancy</h2>

        <p className="text-sm text-gray-500">Current room occupancy overview</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={140}
            paddingAngle={4}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Total Rooms</span>
          <span className="font-semibold">{data.totalRooms}</span>
        </div>

        <div className="flex justify-between">
          <span>Available</span>
          <span className="font-semibold text-green-600">
            {data.availableRooms}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Booked</span>
          <span className="font-semibold text-yellow-600">
            {data.bookedRooms}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Maintenance</span>
          <span className="font-semibold text-red-600">
            {data.maintenanceRooms}
          </span>
        </div>

        <div className="mt-4 border-t pt-4 flex justify-between">
          <span className="font-semibold">Occupancy Rate</span>

          <span className="font-bold text-[#c49b63]">
            {data.occupancyRate}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default OccupancyCard;
