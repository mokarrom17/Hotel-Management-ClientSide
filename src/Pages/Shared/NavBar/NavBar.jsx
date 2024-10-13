import { Link } from "react-router-dom";
import { FaHandPointRight } from "react-icons/fa";

const NavBar = () => {
  const navItems = (
    <>
      <li>
        <Link to="/">HOME</Link>
      </li>
      <li>
        <Link to="/">FAQS</Link>
      </li>
      <li>
        <Link to="/">UPDATE</Link>
      </li>
      <li>
        <Link to="/">CONTACTS</Link>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 h-24">
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
            <img className="rounded-e-full w-16" alt="" />
          </Link>
        </div>
        <div className=" navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
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
