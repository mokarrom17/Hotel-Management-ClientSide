import { useQuery } from "@tanstack/react-query";
import FeaturedRoom from "../Home/FeaturedRoom/FeaturedRoom";

const Rooms = () => {
  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ["roomTypes"],

    queryFn: async () => {
      const res = await fetch("http://localhost:5000/roomTypes");

      return res.json();
    },
  });

  // ==========================================
  // Loading State
  // ==========================================
  if (isLoading) {
    return (
      <div className="flex justify-center py-40">
        <span className="loading loading-spinner loading-lg text-[#c49b63]"></span>
      </div>
    );
  }

  return (
    <div className="bg-[#faf7f2] min-h-screen">
      {/* ==========================================
          Hero Section
      ========================================== */}
      <div
        className="relative bg-cover bg-center py-40 px-4 overflow-hidden rounded-t-lg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/80"></div>

        {/* Content */}
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="uppercase tracking-[5px] text-[#e0b97a] font-semibold mb-5 text-sm">
            Luxury Accommodation
          </p>

          <h1 className="text-5xl md:text-7xl text-white font-black leading-tight drop-shadow-[0_5px_20px_rgba(0,0,0,0.9)]">
            Rooms & Suites
          </h1>

          <p className="text-gray-100 font-medium max-w-3xl mx-auto mt-8 leading-9 text-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Discover premium comfort, elegant interiors and world-class luxury
            hospitality experiences crafted for your unforgettable stay.
          </p>
        </div>
      </div>

      {/* ==========================================
          Filters Section
      ========================================== */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white rounded-[30px] shadow-xl p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Search */}
            <input
              type="text"
              placeholder="Search Rooms..."
              className="input input-bordered rounded-2xl w-full bg-white"
            />

            {/* Filter */}
            <select className="select select-bordered rounded-2xl w-full bg-white">
              <option>All Views</option>

              <option>Ocean View</option>

              <option>City View</option>

              <option>Garden View</option>
            </select>

            {/* Price */}
            <select className="select select-bordered rounded-2xl w-full bg-white">
              <option>Price Range</option>

              <option>$100 - $200</option>

              <option>$200 - $500</option>

              <option>$500+</option>
            </select>
          </div>
        </div>

        {/* ==========================================
            Room Grid
        ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <FeaturedRoom key={room._id} room={room}></FeaturedRoom>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
