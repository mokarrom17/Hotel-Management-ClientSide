import React from "react";
import { Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaBed,
  FaCreditCard,
  FaStar,
  FaCog,
  FaHome,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Navbar Title</div>
        </nav>
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow gap-2 text-[15px]">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#c49b63] text-white rounded-xl"
                    : "rounded-xl hover:bg-[#f5f5f5]"
                }
              >
                <FaHome className="text-lg" />
                <span className="is-drawer-close:hidden">Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#c49b63] text-white rounded-xl"
                    : "rounded-xl hover:bg-[#f5f5f5]"
                }
              >
                <FaTachometerAlt className="text-lg" />
                <span className="is-drawer-close:hidden">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#c49b63] text-white rounded-xl"
                    : "rounded-xl hover:bg-[#f5f5f5]"
                }
              >
                <FaUser className="text-lg" />
                <span className="is-drawer-close:hidden">My Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-bookings"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#c49b63] text-white rounded-xl"
                    : "rounded-xl hover:bg-[#f5f5f5]"
                }
              >
                <FaBed className="text-lg" />
                <span className="is-drawer-close:hidden">My Bookings</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/payments/:bookingId"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#c49b63] text-white rounded-xl"
                    : "rounded-xl hover:bg-[#f5f5f5]"
                }
              >
                <FaCreditCard className="text-lg" />
                <span className="is-drawer-close:hidden">Payments</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/reviews"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#c49b63] text-white rounded-xl"
                    : "rounded-xl hover:bg-[#f5f5f5]"
                }
              >
                <FaStar className="text-lg" />
                <span className="is-drawer-close:hidden">My Reviews</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#c49b63] text-white rounded-xl"
                    : "rounded-xl hover:bg-[#f5f5f5]"
                }
              >
                <FaCog className="text-lg" />
                <span className="is-drawer-close:hidden">Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
