import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RoomTable = ({ search, roomType, floor, status }) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: rooms = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["rooms", search, roomType, floor, status],
    queryFn: async () => {
      const res = await axiosSecure.get("/rooms", {
        params: {
          search,
          roomType,
          floor,
          status,
        },
      });
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="rounded-2xl border bg-white p-10 shadow-sm">
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg text-[#c49b63]"></span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border bg-white p-10 shadow-sm">
        <p className="text-center font-medium text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
      <table className="table table-zebra">
        <thead className="bg-base-200 text-gray-700">
          <tr>
            <th>#</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Floor</th>
            <th>View</th>
            <th>Availability</th>
            <th>Maintenance</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rooms.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-12 text-center text-gray-500">
                No rooms found.
              </td>
            </tr>
          ) : (
            rooms.map((room, index) => (
              <tr key={room._id} className="hover">
                <td>{index + 1}</td>

                <td className="font-semibold">{room.roomNumber}</td>

                <td>{room.roomTypeName}</td>

                <td>{room.floor}</td>

                <td className="capitalize">{room.view}</td>

                <td>
                  <span
                    className={`badge font-medium rounded p-4 ${
                      room.isAvailable ? "badge-success" : "badge-error"
                    }`}
                  >
                    {room.isAvailable ? "Available" : "Booked"}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge font-medium capitalize rounded p-4 ${
                      room.maintenanceStatus === "good"
                        ? "badge-success"
                        : room.maintenanceStatus === "cleaning"
                          ? "badge-warning"
                          : "badge-error"
                    }`}
                  >
                    {room.maintenanceStatus}
                  </span>
                </td>

                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      className="btn btn-sm btn-info btn-outline"
                      title="View Room"
                    >
                      <FaEye />
                    </button>

                    <button
                      className="btn btn-sm btn-warning btn-outline"
                      title="Edit Room"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;
