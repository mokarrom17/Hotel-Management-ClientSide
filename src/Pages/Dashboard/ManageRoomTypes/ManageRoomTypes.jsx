import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

const ManageRoomTypes = () => {
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {
    data: roomTypes = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["roomTypes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/roomTypes");
      return res.data;
    },
  });

  // ===============================
  // Loading State
  // ===============================
  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-[#c49b63]"></span>
      </div>
    );
  }

  // ===============================
  // Error State
  // ===============================
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500 text-lg font-medium">
          Failed to load room types.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mb-12">
      {/* ===============================
          Header Section
      =============================== */}
      <div className="bg-white rounded-3xl shadow-md p-6 mb-8">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
          {/* Left */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Room Types
            </h1>

            <p className="text-gray-500 mt-2 max-w-xl">
              Manage all hotel room categories, pricing and capacity from one
              place.
            </p>

            <div className="mt-4">
              <span className="badge badge-primary badge-lg">
                Total Room Types: {roomTypes.length}
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search room type..."
              className="input input-bordered w-full sm:w-64"
            />

            {/* Filter */}
            <select className="select select-bordered">
              <option>All Status</option>
            </select>

            {/* Sort */}
            <select className="select select-bordered">
              <option>Newest</option>
              <option>Oldest</option>
              <option>Price: Low → High</option>
              <option>Price: High → Low</option>
            </select>

            {/* Add Button */}
            <button
              className="btn border-none text-white"
              style={{ backgroundColor: "#c49b63" }}
            >
              + Add Room Type
            </button>
          </div>
        </div>
      </div>

      {/* ===============================
    Room Types Table
================================ */}
      <div className="bg-white rounded-3xl shadow-md overflow-x-auto">
        <table className="table">
          <thead className="bg-[#f8f5f0]">
            <tr className="text-gray-700">
              <th>#</th>
              <th>Image</th>
              <th>Room Type</th>
              <th>Price / Night</th>
              <th className="w-40">Capacity</th>
              <th className="w-32">Total Rooms</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {roomTypes.map((room, index) => (
              <tr key={room._id} className="hover">
                {/* Serial */}
                <td className="font-semibold">{index + 1}</td>

                {/* Image */}
                <td>
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-xl">
                      <img src={room.image} alt={room.type} />
                    </div>
                  </div>
                </td>

                {/* Room Type */}
                <td>
                  <h2 className="font-bold text-gray-800">{room.type}</h2>

                  <p className="text-sm text-gray-500 line-clamp-1">
                    {room.description}
                  </p>
                </td>

                {/* Price */}
                <td>
                  <span className="badge badge-success badge-outline">
                    £{room.price}
                  </span>
                </td>

                {/* Capacity */}
                <td className="min-w-[160px]">
                  <span className="font-medium">
                    {room.adults} Adults • {room.child} Child
                  </span>
                </td>

                {/* Total Rooms */}
                <td>
                  <span className="inline-flex items-center rounded-full bg-gray-700 text-white px-4 py-2 text-sm font-semibold">
                    10 Rooms
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <div className="flex justify-center gap-2">
                    {/* View */}
                    <Link
                      to={`/dashboard/manage-room-types/${room._id}`}
                      className="btn btn-sm btn-outline btn-info tooltip flex items-center justify-center"
                      data-tip="View"
                    >
                      <FiEye className="text-lg" />
                    </Link>

                    {/* Edit */}
                    <button
                      className="btn btn-sm btn-outline btn-warning tooltip"
                      data-tip="Edit"
                    >
                      <FiEdit2 />
                    </button>

                    {/* Delete */}
                    <button
                      className="btn btn-sm btn-outline btn-error tooltip"
                      data-tip="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRoomTypes;
