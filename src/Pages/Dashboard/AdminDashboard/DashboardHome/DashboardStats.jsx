import {
  FaDollarSign,
  FaClipboardList,
  FaUsers,
  FaBed,
  FaDoorOpen,
  FaTools,
  FaCheckCircle,
  FaClock,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Revenue",
      value: `${stats.totalRevenue || 0}`,
      icon: <FaDollarSign />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings || 0,
      icon: <FaClipboardList />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: <FaUsers />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total Rooms",
      value: stats.totalRooms || 0,
      icon: <FaBed />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Available Rooms",
      value: stats.availableRooms || 0,
      icon: <FaDoorOpen />,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Maintenance",
      value: stats.maintenanceRooms || 0,
      icon: <FaTools />,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Paid Bookings",
      value: stats.paidBookings || 0,
      icon: <FaCheckCircle />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Pending",
      value: stats.pendingBookings || 0,
      icon: <FaClock />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Checked In",
      value: stats.checkedIn || 0,
      icon: <FaSignInAlt />,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Checked Out",
      value: stats.checkedOut || 0,
      icon: <FaSignOutAlt />,
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <div className="my-12">
      <h2 className="mb-6 text-3xl font-bold text-[#2C3E50]">
        Dashboard Overview
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c49b63] hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>

                <h3 className="mt-2 text-3xl font-bold text-[#2C3E50]">
                  {card.value}
                </h3>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl border border-white/40 text-2xl ${card.color}`}
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

export default DashboardStats;
