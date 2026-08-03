import { FaBars, FaBell, FaCog, FaSearch, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const DashboardNavbar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const currentPath = location.pathname.split("/").pop();

  const pageTitle =
    currentPath === "dashboard"
      ? "Dashboard"
      : currentPath
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
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
                Welcome back, {user?.displayName || "Admin"} 👋
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
            />
          </label>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <div className="indicator">
            <span className="indicator-item badge badge-error badge-xs">3</span>

            <button className="btn btn-ghost btn-circle text-xl">
              <FaBell />
            </button>
          </div>

          <button className="btn btn-ghost btn-circle text-xl">
            <FaCog />
          </button>

          <button className="btn btn-ghost">
            <img
              src={user?.photoURL || "/avatar.png"}
              alt=""
              className="w-11 h-11 rounded-full object-cover border-2 border-[#c49b63]"
            />
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-800">
                {user?.displayName || "Admin"}
              </span>

              <span className="text-xs text-gray-500">Administrator</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
