import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import hoteLogo from "../../../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="mx-3 mt-12 mb-6">
      <div
        className="
          relative
          overflow-hidden
          rounded-[30px]
          bg-black
          text-white
        "
      >
        {/* ==========================================
            Background Glow
        ========================================== */}
        <div
          className="
            absolute
            top-0
            right-0
            h-80
            w-80
            bg-[#c49b63]/10
            blur-[120px]
          "
        ></div>

        {/* ==========================================
            Main Footer
        ========================================== */}
        <div
          className="
            relative
            z-10
            px-6
            sm:px-10
            lg:px-16
            py-14
          "
        >
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-4
              gap-10
            "
          >
            {/* 
            ==========================================
                Brand Section
            ========================================== */}
            <div>
              {/* Logo */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  className="
                    w-20
                    h-20
                    object-cover
                    rounded-full
                    border-4
                    border-[#c49b63]
                  "
                  src={hoteLogo}
                  alt="Hotel Logo"
                />

                <div>
                  <h2 className="text-3xl font-black">HOTEL</h2>

                  <p className="text-[#c49b63] text-sm tracking-[4px] uppercase">
                    Luxury Resort
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-8">
                Experience timeless luxury, premium comfort and exceptional
                hospitality designed for your unforgettable stay.
              </p>

              {/* Social */}
              <div className="flex items-center gap-4 mt-6">
                {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map(
                  (Icon, index) => (
                    <button
                      key={index}
                      className="
                      h-11
                      w-11
                      rounded-full
                      bg-white/10
                      border
                      border-white/10
                      backdrop-blur-xl
                      flex
                      items-center
                      justify-center
                      hover:bg-[#c49b63]
                      transition-all
                      duration-300
                    "
                    >
                      <Icon />
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* ==========================================
                Quick Links
            ========================================== */}
            <div>
              <h3
                className="
                  text-xl
                  font-bold
                  mb-6
                  text-[#c49b63]
                "
              >
                Quick Links
              </h3>

              <ul className="space-y-4 text-gray-300">
                {[
                  "Home",
                  "Rooms & Suites",
                  "Restaurant",
                  "Spa & Wellness",
                  "Gallery",
                  "Contact Us",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="
                      hover:text-[#c49b63]
                      transition
                      cursor-pointer
                    "
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* ==========================================
                Services
            ========================================== */}
            <div>
              <h3
                className="
                  text-xl
                  font-bold
                  mb-6
                  text-[#c49b63]
                "
              >
                Services
              </h3>

              <ul className="space-y-4 text-gray-300">
                {[
                  "Luxury Rooms",
                  "Private Dining",
                  "Swimming Pool",
                  "Fitness Center",
                  "Airport Pickup",
                  "24/7 Concierge",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="
                      hover:text-[#c49b63]
                      transition
                      cursor-pointer
                    "
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* ==========================================
                Contact
            ========================================== */}
            <div>
              <h3
                className="
                  text-xl
                  font-bold
                  mb-6
                  text-[#c49b63]
                "
              >
                Contact Us
              </h3>

              <div className="space-y-5 text-gray-300">
                {/* Location */}
                <div className="flex gap-4">
                  <FaMapMarkerAlt className="text-[#c49b63] text-xl mt-1" />

                  <p>
                    25 Luxury Avenue,
                    <br />
                    California, USA
                  </p>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <FaPhoneAlt className="text-[#c49b63] text-lg mt-1" />

                  <p>+1 234 567 890</p>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <FaEnvelope className="text-[#c49b63] text-lg mt-1" />

                  <p>support@luxuryhotel.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              Bottom Footer
          ========================================== */}
          <div
            className="
              border-t
              border-white/10
              mt-14
              pt-6
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-4
              text-gray-400
              text-sm
            "
          >
            <p>© 2026 Luxury Hotel Resort. All Rights Reserved.</p>

            <div className="flex items-center gap-6">
              <p className="hover:text-[#c49b63] cursor-pointer transition">
                Privacy Policy
              </p>

              <p className="hover:text-[#c49b63] cursor-pointer transition">
                Terms & Conditions
              </p>

              <p className="hover:text-[#c49b63] cursor-pointer transition">
                Security
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
