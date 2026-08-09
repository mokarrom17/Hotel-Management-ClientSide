import { FaBed, FaCalendarCheck, FaUser, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      title: "Book a Room",
      description: "Find and book your next stay",
      icon: FaBed,
      path: "/rooms",
    },
    {
      title: "My Bookings",
      description: "View all your bookings",
      icon: FaCalendarCheck,
      path: "/dashboard/my-bookings",
    },
    {
      title: "My Profile",
      description: "Manage your profile",
      icon: FaUser,
      path: "/dashboard/profile",
    },
    {
      title: "My Reviews",
      description: "View and manage your reviews",
      icon: FaStar,
      path: "/dashboard/reviews",
    },
  ];

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-800">Quick Actions</h2>

        <p className="mt-1 text-sm text-gray-500">
          Quickly access your most used features
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.path}
              className="group rounded-xl border border-gray-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c49b63]/40 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#c49b63]/10 text-[#c49b63] transition-colors duration-300 group-hover:bg-[#c49b63] group-hover:text-white">
                <Icon className="text-lg" />
              </div>

              <h3 className="mt-4 font-semibold text-gray-800">
                {action.title}
              </h3>

              <p className="mt-1 text-sm leading-5 text-gray-500">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
