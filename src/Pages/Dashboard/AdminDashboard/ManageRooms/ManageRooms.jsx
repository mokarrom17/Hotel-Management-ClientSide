import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

import RoomStats from "./RoomStats";
import RoomFilters from "./RoomFilters";
import RoomTable from "./RoomTable";
import Pagination from "../../../Shared/Pagination/Pagination";

const ManageRooms = () => {
  const axiosSecure = useAxiosSecure();

  // ==========================================
  // Pagination
  // ==========================================
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 10;

  // ==========================================
  // Filter States
  // ==========================================
  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState("");
  const [status, setStatus] = useState("");
  const [floor, setFloor] = useState("");

  // ==========================================
  // Fetch Room Types
  // ==========================================
  const { data: roomTypes = [] } = useQuery({
    queryKey: ["roomTypes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/roomTypes");
      return res.data;
    },
  });

  // ==========================================
  // Fetch Rooms
  // ==========================================
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

  // ==========================================
  // Pagination Logic
  // ==========================================
  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  const startIndex = (currentPage - 1) * roomsPerPage;
  const endIndex = startIndex + roomsPerPage;

  const paginatedRooms = rooms.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 mx-8 mb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Manage Rooms</h1>

        <p className="text-gray-500">
          Manage hotel rooms, availability and maintenance.
        </p>
      </div>

      {/* Statistics */}
      <RoomStats />

      {/* Filters */}
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
        totalRooms={rooms.length}
      />

      {/* Table */}
      <RoomTable
        rooms={paginatedRooms}
        isPending={isPending}
        isError={isError}
        error={error}
        startIndex={startIndex}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ManageRooms;
