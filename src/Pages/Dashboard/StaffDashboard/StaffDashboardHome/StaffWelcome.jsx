import React from "react";
import { FaUserTie } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useUserRole from "../../../../hooks/useUserRole";

const StaffWelcome = () => {
  const { user } = useAuth();
  const { role } = useUserRole();

  return (
    <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#aa8453] to-[#8f6c3f] p-6 text-white shadow-lg md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-white/80">
            <FaUserTie />
            <span>Staff Dashboard</span>
          </div>

          <h1 className="text-2xl font-bold md:text-3xl">
            Welcome back, {user?.displayName || "Staff"} 👋
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-white/80 md:text-base">
            Manage your daily hotel operations, bookings, and assigned
            responsibilities from your staff dashboard.
          </p>
        </div>

        <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-wider text-white/70">
            Current Role
          </p>

          <p className="mt-1 text-lg font-bold capitalize">{role || "Staff"}</p>
        </div>
      </div>
    </div>
  );
};

export default StaffWelcome;
