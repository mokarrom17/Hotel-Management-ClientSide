import { useQuery } from "@tanstack/react-query";

import FeaturedRoom from "./FeaturedRoom";

const FeaturedRooms = () => {
  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ["featuredRooms"],

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
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-[#c49b63]"></span>
      </div>
    );
  }

  return (
    <section className="my-24 px-4 lg:px-6">
      {/* ==========================================
          Header
      ========================================== */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className=" text-[#c49b63] uppercase tracking-[5px] font-semibold mb-3">
          Luxury Accommodation
        </p>

        <h2 className=" text-4xl md:text-5xl font-black text-black leading-tight">
          Featured Rooms & Suites
        </h2>

        <p className=" text-gray-500 text-lg mt-5 leading-8">
          Discover premium comfort, elegant interiors and luxurious room
          experiences crafted for your unforgettable stay.
        </p>
      </div>

      {/* ==========================================
          Room Grid
      ========================================== */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {rooms.map((room) => (
          <FeaturedRoom key={room._id} room={room} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedRooms;
