import {
  FaSearch,
  FaUndoAlt,
  FaBed,
  FaLayerGroup,
  FaCheckCircle,
} from "react-icons/fa";

const RoomFilters = ({
  roomTypes = [],
  search,
  setSearch,
  roomType,
  setRoomType,
  floor,
  setFloor,
  status,
  setStatus,
  totalRooms = 0,
}) => {
  const handleReset = () => {
    setSearch("");
    setRoomType("");
    setFloor("");
    setStatus("");
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Top Row */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Search */}
        <div className="xl:col-span-4">
          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <FaSearch className="text-[#c49b63]" />
            Search Room
          </label>

          <label className="input input-bordered flex h-12 w-full items-center gap-2 rounded-xl">
            <FaSearch className="text-gray-400" />

            <input
              type="text"
              className="grow"
              placeholder="Search by Room Number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>

        {/* Room Type */}
        <div className="xl:col-span-3">
          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <FaBed className="text-[#c49b63]" />
            Room Type
          </label>

          <select
            className="select select-bordered h-12 w-full rounded-xl"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="">All Room Types</option>

            {roomTypes.map((type) => (
              <option key={type._id} value={type.type}>
                {type.type}
              </option>
            ))}
          </select>
        </div>

        {/* Floor */}
        <div className="xl:col-span-2">
          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <FaLayerGroup className="text-[#c49b63]" />
            Floor
          </label>

          <select
            className="select select-bordered h-12 w-full rounded-xl"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          >
            <option value="">All Floors</option>
            <option value="1">1st Floor</option>
            <option value="2">2nd Floor</option>
            <option value="3">3rd Floor</option>
            <option value="4">4th Floor</option>
            <option value="5">5th Floor</option>
          </select>
        </div>

        {/* Status */}
        <div className="xl:col-span-2">
          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <FaCheckCircle className="text-[#c49b63]" />
            Status
          </label>

          <select
            className="select select-bordered h-12 w-full rounded-xl"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* Reset */}
        <div className="flex items-end xl:col-span-1">
          <button
            onClick={handleReset}
            className="btn h-12 w-full rounded-xl border-none bg-[#c49b63] text-white hover:bg-[#ab814b]"
          >
            <FaUndoAlt />
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t pt-4 text-sm text-gray-600 md:flex-row">
        <p>
          Showing <span className="font-bold text-[#c49b63]">{totalRooms}</span>{" "}
          Room{totalRooms !== 1 ? "s" : ""}
        </p>

        <button
          onClick={handleReset}
          className="text-sm font-medium text-[#c49b63] transition hover:text-[#ab814b]"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
};

export default RoomFilters;
