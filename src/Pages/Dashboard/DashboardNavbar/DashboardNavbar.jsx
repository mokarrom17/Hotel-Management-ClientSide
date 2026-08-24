import { FaBars, FaBell, FaCog, FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";

const ROLE_LABELS = {
  admin: "Administrator",
  staff: "Staff Member",
  customer: "Customer",
};

const DashboardNavbar = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.split("/").pop();

  const pageTitle =
    currentPath === "dashboard"
      ? "Dashboard"
      : currentPath
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

  const displayName = user?.displayName || "Guest";
  const roleLabel = ROLE_LABELS[role] || "Guest";

  return (
    <div className="border-b bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div>
          <div className="flex items-center gap-4">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <FaBars />
            </label>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">{pageTitle}</h2>

              <p className="text-sm text-gray-500">
                Welcome back, {displayName} 👋
              </p>
            </div>
          </div>

          <div className="mt-3 border-t pt-3 text-sm text-gray-500">
            <Link to="/" className="font-medium text-[#c49b63] hover:underline">
              Home
            </Link>

            <span className="mx-2">/</span>

            <span className="font-semibold text-gray-700">{pageTitle}</span>
          </div>
        </div>

        {/* Center */}
        <div className="hidden w-[380px] lg:block">
          <label className="input input-bordered rounded-xl w-full flex items-center gap-3 h-12">
            <FaSearch className="text-gray-400" />

            <input
              type="text"
              className="grow"
              placeholder="Search users, rooms, bookings..."
              // NOTE: not wired to a real search endpoint yet.
              // Hook this up once a global search API exists.
            />
          </label>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <button
            className="btn btn-ghost btn-circle text-xl"
            aria-label="Notifications"
          >
            <FaBell />
          </button>

          <button
            className="btn btn-ghost btn-circle text-xl"
            aria-label="Settings"
            onClick={() => navigate("/dashboard/profile")}
          >
            <FaCog />
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => navigate("/dashboard/profile")}
          >
            <img
              src={user?.photoURL || "/avatar.png"}
              alt={displayName}
              className="w-11 h-11 rounded-full object-cover border-2 border-[#c49b63]"
            />
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-800">
                {displayName}
              </span>

              <span className="text-xs text-gray-500">{roleLabel}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
