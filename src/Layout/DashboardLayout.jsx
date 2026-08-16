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
  FaUsersCog,
  FaDoorOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaBriefcase,
  FaUserTie,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import DashboardNavbar from "../Pages/Dashboard/AdminDashboard/DashboardNavbar/DashboardNavbar";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { isAdmin } = useAdmin();
  const { isStaff, isUser } = useUserRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <DashboardNavbar />
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-white border-r border-gray-200 is-drawer-close:w-14 is-drawer-open:w-72">
          {/* Sidebar content here */}
          <ul className="menu w-full grow gap-1 p-4 text-[15px]">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                    : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
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
                    ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                    : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
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
                    ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                    : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
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
                    ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                    : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
                }
              >
                <FaBed className="text-lg" />
                <span className="is-drawer-close:hidden">My Bookings</span>
              </NavLink>
            </li>

            {isUser && (
              <li>
                <NavLink
                  to="/dashboard/employee-application"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                      : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
                  }
                >
                  <FaBriefcase className="text-lg" />
                  <span className="is-drawer-close:hidden">
                    Become an Employee
                  </span>
                </NavLink>
              </li>
            )}

            <div className="divider my-4"></div>

            {/*  Admin */}
            {isAdmin && (
              <>
                <li className="menu-title uppercase tracking-wider text-xs font-bold text-gray-400 px-2">
                  <span>Administration</span>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                        : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
                    }
                  >
                    <FaUsersCog className="text-lg" />
                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/manage-room-types"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                        : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
                    }
                  >
                    <FaBed className="text-lg" />
                    <span className="is-drawer-close:hidden">
                      Manage Room Types
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-rooms"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                        : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
                    }
                  >
                    <FaDoorOpen className="text-lg" />
                    <span className="is-drawer-close:hidden">Manage Rooms</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/manage-bookings"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                        : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
                    }
                  >
                    <FaClipboardList className="text-lg" />
                    <span className="is-drawer-close:hidden">
                      Manage Bookings
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/manage-employees"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                        : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
                    }
                  >
                    <FaUserTie className="text-lg" />
                    <span className="is-drawer-close:hidden">
                      Manage Employees
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/payments/:bookingId"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                        : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
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
                        ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                        : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
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
                        ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                        : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
                    }
                  >
                    <FaCog className="text-lg" />
                    <span className="is-drawer-close:hidden">Settings</span>
                  </NavLink>
                </li>
              </>
            )}
            {/* Staff */}
            {isStaff && (
              <>
                <li className="menu-title uppercase tracking-wider text-xs font-bold text-gray-400 px-2">
                  <span>Staff</span>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/staff-bookings"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                        : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
                    }
                  >
                    <FaClipboardList className="text-lg" />
                    <span className="is-drawer-close:hidden">
                      Staff Bookings
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/room-status"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#c49b63] text-white rounded-xl shadow-md"
                        : "rounded-xl transition-all duration-300 hover:bg-[#f8f6f2] hover:translate-x-1"
                    }
                  >
                    <FaDoorOpen className="text-lg" />
                    <span className="is-drawer-close:hidden">Room Status</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="w-full mt-auto p-4">
            <div className="divider my-4"></div>
            <button
              // onClick={handleLogout}
              className="w-full flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-red-50 hover:text-red-600"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="is-drawer-close:hidden">Logout</span>
            </button>
          </div>
          <div className="w-full border-t p-4 pb-4">
            <p className="text-center text-xs text-gray-500">
              Hotel Management System
            </p>

            <p className="mt-1 text-center text-xs text-gray-400">
              Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
