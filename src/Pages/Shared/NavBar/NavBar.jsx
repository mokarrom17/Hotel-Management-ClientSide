import { Link, NavLink } from "react-router-dom";
import hotelLogo from "../../../assets/logo.jpg";
import { FaHandPointRight, FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handelLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  // User First Letter
  const firstLetter = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : "U";

  // Nav Items
  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#c49b63] font-bold"
              : "hover:text-[#c49b63] transition duration-300"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            isActive
              ? "text-[#c49b63] font-bold"
              : "hover:text-[#c49b63] transition duration-300"
          }
        >
          Rooms
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-[#c49b63] font-bold"
              : "hover:text-[#c49b63] transition duration-300"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100">
      <div className="navbar max-w-7xl mx-auto h-24 px-4 lg:px-8">
        {/* ==========================================
            Navbar Start
        ========================================== */}
        <div className="navbar-start gap-3">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden text-black hover:bg-[#f5f5f5]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            <ul className="menu menu-sm dropdown-content mt-3 z-[100] p-5 shadow-2xl bg-white rounded-3xl w-64 text-black space-y-1">
              {navItems}

              <div className="divider my-1"></div>

              {user?.email ? (
                <>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>

                  <li>
                    <Link to="/myBookings">My Bookings</Link>
                  </li>

                  <li>
                    <button onClick={handelLogOut}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>

                  <li>
                    <Link to="/signUp">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:scale-105 transition duration-300"
          >
            <img
              className="w-20 md:w-24 object-contain"
              src={hotelLogo}
              alt="Hotel Logo"
            />
          </Link>
        </div>

        {/* ==========================================
            Navbar Center
        ========================================== */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-8 text-black font-semibold tracking-wide px-1">
            {navItems}
          </ul>
        </div>

        {/* ==========================================
            Navbar End
        ========================================== */}
        <div className="navbar-end gap-3">
          {/* User Dropdown */}
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="cursor-pointer transition duration-300 hover:scale-105"
            >
              {user?.photoURL ? (
                <img
                  className="w-12 h-12 rounded-full border-2 border-[#c49b63] object-cover shadow-md"
                  src={user.photoURL}
                  alt="User"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#c49b63] text-white flex items-center justify-center text-lg font-bold shadow-md">
                  {user?.email ? firstLetter : <FaUserCircle size={24} />}
                </div>
              )}
            </label>

            {/* Dropdown Menu */}
            <ul className="mt-4 z-[100] p-5 shadow-2xl menu menu-sm dropdown-content bg-white rounded-3xl w-64 text-black">
              {user?.email ? (
                <>
                  {/* User Info */}
                  <div className="mb-3">
                    <h2 className="font-bold text-lg">
                      {user?.displayName || "Hotel Guest"}
                    </h2>

                    <p className="text-sm text-gray-500 break-words">
                      {user?.email}
                    </p>
                  </div>

                  <div className="divider my-1"></div>

                  <li>
                    <Link to="/myProfile">My Profile</Link>
                  </li>

                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>

                  <li>
                    <Link to="/myBookings">My Bookings</Link>
                  </li>

                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>

                  <div className="divider my-1"></div>

                  <li>
                    <button onClick={handelLogOut} className="text-red-500">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>

                  <li>
                    <Link to="/signUp">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Book Room Button */}
          <Link
            to="/rooms"
            className="btn rounded-full bg-[#c49b63] border-0 text-white px-5 lg:px-7 h-12 min-h-12 text-sm lg:text-base hover:bg-black hover:text-white transition duration-300 shadow-lg"
          >
            <FaHandPointRight className="text-lg" />

            <span className="hidden sm:block">BOOK ROOM</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
