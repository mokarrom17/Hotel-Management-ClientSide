import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="bg-[#faf7f2] min-h-screen">
      {/* ==========================================
          Hero Section
      ========================================== */}
      <div
        className="relative bg-cover bg-center py-40 px-4 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="uppercase tracking-[5px] text-[#e0b97a] font-semibold mb-5 text-sm">
            Luxury Hospitality
          </p>

          <h1 className="text-5xl md:text-7xl text-white font-black leading-tight drop-shadow-[0_5px_20px_rgba(0,0,0,0.9)]">
            Contact Us
          </h1>

          <p className="text-gray-100 font-medium max-w-3xl mx-auto mt-8 leading-9 text-xl">
            Our hospitality team is available 24/7 to assist you with bookings,
            reservations and luxury accommodation inquiries.
          </p>
        </div>
      </div>

      {/* ==========================================
          Contact Section
      ========================================== */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ==========================================
              Contact Info
          ========================================== */}
          <div className="space-y-8">
            <div>
              <p className="uppercase tracking-[4px] text-[#c49b63] font-semibold mb-4">
                Get In Touch
              </p>

              <h2 className="text-5xl font-black text-black leading-tight">
                We Are Always Ready To Help You
              </h2>
            </div>

            {/* Cards */}
            <div className="space-y-5">
              {/* Address */}
              <div className="bg-white rounded-[30px] p-6 shadow-xl flex items-start gap-5">
                <div className="bg-[#c49b63]/10 p-5 rounded-2xl">
                  <FaLocationDot className="text-3xl text-[#c49b63]" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    Hotel Address
                  </h3>

                  <p className="text-gray-600 leading-8">
                    25 Luxury Avenue, Ocean View District, Dubai Marina, UAE
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-[30px] p-6 shadow-xl flex items-start gap-5">
                <div className="bg-[#c49b63]/10 p-5 rounded-2xl">
                  <FaPhone className="text-3xl text-[#c49b63]" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    Call Us
                  </h3>

                  <p className="text-gray-600">+880 1700-000000</p>

                  <p className="text-gray-600">+971 500-000000</p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-[30px] p-6 shadow-xl flex items-start gap-5">
                <div className="bg-[#c49b63]/10 p-5 rounded-2xl">
                  <FaEnvelope className="text-3xl text-[#c49b63]" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    Email Address
                  </h3>

                  <p className="text-gray-600">luxuryhotel@gmail.com</p>

                  <p className="text-gray-600">reservations@luxuryhotel.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              Contact Form
          ========================================== */}
          <div className="bg-white rounded-[35px] shadow-2xl p-8">
            <div className="mb-8">
              <p className="uppercase tracking-[4px] text-[#c49b63] font-semibold mb-3">
                Send Message
              </p>

              <h2 className="text-4xl font-black text-black">
                Make An Inquiry
              </h2>
            </div>

            <form className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-black font-semibold mb-2 block">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full bg-white rounded-2xl h-14"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-black font-semibold mb-2 block">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full bg-white rounded-2xl h-14"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-black font-semibold mb-2 block">
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="input input-bordered w-full bg-white rounded-2xl h-14"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="text-black font-semibold mb-2 block">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Message subject"
                  className="input input-bordered w-full bg-white rounded-2xl h-14"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-black font-semibold mb-2 block">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="textarea textarea-bordered w-full bg-white rounded-2xl"
                ></textarea>
              </div>

              {/* Button */}
              <button className=" w-full h-16 rounded-2xl bg-[#c49b63] hover:bg-[#aa8453] text-white font-bold tracking-wide text-lg shadow-xl transition-all duration-300">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ==========================================
          Google Map
      ========================================== */}
      <div className="px-4 pb-20">
        <div className="max-w-7xl mx-auto rounded-[35px] overflow-hidden shadow-2xl">
          <iframe
            title="Hotel Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115308.18455844732!2d55.18853836122534!3d25.07638147023585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6a2f2d1d9f25%3A0xbcb0b2dd8d3f3f1!2sDubai%20Marina!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
            width="100%"
            height="500"
            allowFullScreen=""
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
