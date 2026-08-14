import React from "react";
import { FaUserTie, FaArrowRight } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useUserRole from "../../../../hooks/useUserRole";

const StaffProfile = () => {
  const { user } = useAuth();
  const { role } = useUserRole();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="font-bold text-gray-800">Staff Profile</h2>

        <p className="mt-1 text-xs text-gray-500">Your account information</p>
      </div>

      <div className="p-5">
        {/* Avatar */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#aa8453]/10 text-[#aa8453] ring-4 ring-[#aa8453]/10">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user?.displayName || "Staff"}
                className="h-full w-full object-cover"
              />
            ) : (
              <FaUserTie className="text-3xl" />
            )}
          </div>

          <h3 className="mt-4 font-bold text-gray-800">
            {user?.displayName || "Staff Member"}
          </h3>

          <p className="mt-1 text-sm text-[#aa8453]">Staff Member</p>
        </div>

        {/* Details */}
        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Email
            </p>

            <p className="mt-1 break-all text-sm font-medium text-gray-700">
              {user?.email || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Role
            </p>

            <p className="mt-1 text-sm font-medium capitalize text-gray-700">
              {role || "Staff"}
            </p>
          </div>
        </div>

        {/* Profile Button */}
        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#aa8453] hover:text-[#aa8453]">
          View Profile
          <FaArrowRight className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default StaffProfile;
