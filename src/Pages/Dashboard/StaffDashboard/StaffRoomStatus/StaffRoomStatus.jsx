import React from "react";
import {
  FaBuilding,
  FaCheckCircle,
  FaDoorOpen,
  FaExclamationTriangle,
  FaEye,
  FaTools,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const StaffRoomStatus = () => {
  const axiosSecure = useAxiosSecure();

  // ==========================================
  // Fetch Rooms
  // ==========================================
  const {
    data: rooms = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff-room-status"],

    queryFn: async () => {
      const res = await axiosSecure.get("/rooms");
      return res.data;
    },
  });

  // ==========================================
  // Get Room Status
  // ==========================================
  const getRoomStatus = (room) => {
    if (room.maintenanceStatus !== "good") {
      return "maintenance";
    }

    if (!room.isAvailable) {
      return "occupied";
    }

    return "available";
  };

  // ==========================================
  // Status Configuration
  // ==========================================
  const statusConfig = {
    available: {
      label: "Available",
      className: "bg-green-100 text-green-700",
      dotClass: "bg-green-500",
      icon: FaCheckCircle,
    },

    occupied: {
      label: "Occupied",
      className: "bg-red-100 text-red-700",
      dotClass: "bg-red-500",
      icon: FaDoorOpen,
    },

    maintenance: {
      label: "Maintenance",
      className: "bg-orange-100 text-orange-700",
      dotClass: "bg-orange-500",
      icon: FaTools,
    },
  };

  // ==========================================
  // Statistics
  // ==========================================
  const availableRooms = rooms.filter(
    (room) => getRoomStatus(room) === "available",
  ).length;

  const occupiedRooms = rooms.filter(
    (room) => getRoomStatus(room) === "occupied",
  ).length;

  const maintenanceRooms = rooms.filter(
    (room) => getRoomStatus(room) === "maintenance",
  ).length;

  // ==========================================
  // Loading State
  // ==========================================
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-4 w-72 animate-pulse rounded bg-gray-100" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-52 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // Error State
  // ==========================================
  if (isError) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <div className="flex items-center gap-3">
          <FaExclamationTriangle className="text-red-500" />

          <div>
            <h2 className="font-semibold text-red-700">
              Failed to load room status
            </h2>

            <p className="mt-1 text-sm text-red-500">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ==========================================
          Page Header
      ========================================== */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#aa8453]/10 text-[#aa8453]">
                <FaBuilding />
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-800">Room Status</h1>

                <p className="mt-1 text-sm text-gray-500">
                  Monitor the current operational status of hotel rooms.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#aa8453]/10 px-4 py-2 text-sm font-semibold text-[#aa8453]">
            {rooms.length} Total Rooms
          </div>
        </div>
      </div>

      {/* ==========================================
          Statistics
      ========================================== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Available */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Available</p>

              <h2 className="mt-1 text-2xl font-bold text-gray-800">
                {availableRooms}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <FaCheckCircle />
            </div>
          </div>
        </div>

        {/* Occupied */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Occupied</p>

              <h2 className="mt-1 text-2xl font-bold text-gray-800">
                {occupiedRooms}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <FaDoorOpen />
            </div>
          </div>
        </div>

        {/* Maintenance */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Maintenance</p>

              <h2 className="mt-1 text-2xl font-bold text-gray-800">
                {maintenanceRooms}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <FaTools />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Room Grid
      ========================================== */}
      {rooms.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <FaDoorOpen className="mx-auto text-3xl text-gray-300" />

          <h2 className="mt-3 font-semibold text-gray-600">No rooms found</h2>

          <p className="mt-1 text-sm text-gray-400">
            There are currently no rooms available to display.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => {
            const status = getRoomStatus(room);
            const config = statusConfig[status];
            const StatusIcon = config.icon;

            return (
              <div
                key={room._id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Room Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {room.roomNumber}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {room.roomTypeName}
                    </p>
                  </div>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.className}`}
                  >
                    <StatusIcon />
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-gray-100" />

                {/* Room Information */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Floor</span>

                    <span className="font-semibold text-gray-700">
                      {room.floor}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">View</span>

                    <span className="font-semibold capitalize text-gray-700">
                      {room.view === "beach" ? "Beach View" : "Non-Beach View"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Maintenance</span>

                    <span className="font-semibold capitalize text-gray-700">
                      {room.maintenanceStatus || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Current Status
                  </span>

                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${config.className}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${config.dotClass}`}
                    />

                    {config.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StaffRoomStatus;
