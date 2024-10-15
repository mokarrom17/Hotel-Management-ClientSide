import { Link } from "react-router-dom";
import hotelLogo from "../../../assets/logo.jpg";
import { FaHandPointRight } from "react-icons/fa";

const NavBar = () => {
  const navItems = (
    <>
      <li className="">
        <Link to="/" className="hover:text-[#aa8453]">
          HOME
        </Link>
      </li>
      <li>
        <Link to="/" className="hover:text-[#aa8453]">
          FAQS
        </Link>
      </li>
      <li>
        <Link to="/" className="hover:text-[#aa8453]">
          UPDATE
        </Link>
      </li>
      <li>
        <Link to="/" className="hover:text-[#aa8453]">
          CONTACTS
        </Link>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-white h-24">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/" className="">
            <img className="rounded-e-full w-16" src={hotelLogo} alt="" />
          </Link>
        </div>
        <div className=" navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal text-black  font-medium px-1">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn bg-[#aa8453] text-white font-b hover:bg-black">
            <FaHandPointRight className="text-2xl" />
            BOOK ROOM
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
