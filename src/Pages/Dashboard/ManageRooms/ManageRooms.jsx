import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import RoomStats from "./RoomStats";
import RoomFilters from "./RoomFilters";
import RoomTable from "./RoomTable";

const ManageRooms = () => {
  const axiosSecure = useAxiosSecure();

  // Filter States
  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState("");
  const [status, setStatus] = useState("");
  const [floor, setFloor] = useState("");

  // Room Types
  const { data: roomTypes = [] } = useQuery({
    queryKey: ["roomTypes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/roomTypes");
      return res.data;
    },
  });

  return (
    <div className="space-y-6 mx-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Manage Rooms</h1>
        <p className="text-gray-500">
          Manage hotel rooms, availability and maintenance.
        </p>
      </div>

      <RoomStats />

      <RoomFilters
        roomTypes={roomTypes}
        search={search}
        setSearch={setSearch}
        roomType={roomType}
        setRoomType={setRoomType}
        floor={floor}
        setFloor={setFloor}
        status={status}
        setStatus={setStatus}
        totalRooms={0}
      />

      <RoomTable
        search={search}
        roomType={roomType}
        floor={floor}
        status={status}
      />
    </div>
  );
};

export default ManageRooms;
