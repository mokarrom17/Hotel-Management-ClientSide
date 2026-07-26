import React from "react";
import { FaUserShield, FaUser, FaCalendarAlt } from "react-icons/fa";
import { MdEmail, MdContentCopy } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";

const UserDetailsModal = ({ selectedUser }) => {
  if (!selectedUser) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedUser._id);
  };

  return (
    <dialog id="user_details_modal" className="modal">
      <div className="modal-box w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-yellow-400 px-5 py-6 md:px-8 md:py-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            {/* Avatar */}
            <div className="avatar">
              <div className="w-24 md:w-32 rounded-full ring ring-white ring-offset-4 ring-offset-amber-400">
                <img
                  src={
                    selectedUser.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt={selectedUser.name}
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold break-words">
                {selectedUser.name || "No Name"}
              </h2>

              <p className="mt-2 flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm md:text-lg break-all">
                <MdEmail />
                {selectedUser.email}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                {/* Role */}
                <span
                  className={`badge badge-lg px-4 py-4 text-white ${
                    selectedUser.role === "admin"
                      ? "badge-success"
                      : selectedUser.role === "staff"
                        ? "badge-info"
                        : "badge-warning"
                  }`}
                >
                  <FaUserShield className="mr-1" />
                  {selectedUser.role || "User"}
                </span>

                {/* Status */}
                <span
                  className={`badge badge-lg px-4 py-4 text-white ${
                    selectedUser.isDeleted ? "badge-error" : "badge-success"
                  }`}
                >
                  <IoMdCheckmarkCircle className="mr-1" />
                  {selectedUser.isDeleted ? "Suspended" : "Active"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold mb-6">
            User Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="border rounded-xl p-4 md:p-5">
              <p className="text-gray-500 mb-2">Full Name</p>

              <h4 className="font-bold text-xl flex items-center gap-2">
                <FaUser />
                {selectedUser.name || "N/A"}
              </h4>
            </div>

            {/* Email */}
            <div className="border rounded-xl p-4 md:p-5">
              <p className="text-gray-500 mb-2">Email Address</p>

              <h4 className="font-bold break-all flex items-center gap-2">
                <MdEmail />
                {selectedUser.email}
              </h4>
            </div>

            {/* Role */}
            <div className="border rounded-xl p-4 md:p-5">
              <p className="text-gray-500 mb-2">Role</p>

              <h4 className="font-bold capitalize">
                {selectedUser.role || "User"}
              </h4>
            </div>

            {/* Status */}
            <div className="border rounded-xl p-4 md:p-5">
              <p className="text-gray-500 mb-2">Account Status</p>

              <h4
                className={`font-bold ${
                  selectedUser.isDeleted ? "text-red-500" : "text-green-600"
                }`}
              >
                {selectedUser.isDeleted ? "Suspended" : "Active"}
              </h4>
            </div>

            {/* Joined Date */}
            <div className="border rounded-xl p-4 md:p-5">
              <p className="text-gray-500 mb-2">Joined Date</p>

              <h4 className="font-bold flex items-center gap-2">
                <FaCalendarAlt />

                {selectedUser.createdAt
                  ? new Date(selectedUser.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      },
                    )
                  : "N/A"}
              </h4>
            </div>

            {/* User ID */}
            <div className="border rounded-xl p-4 md:p-5">
              <p className="text-gray-500 mb-2">User ID</p>

              <div className="flex justify-between items-center gap-3">
                <h4 className="font-bold text-sm break-all">
                  {selectedUser._id}
                </h4>

                <button onClick={handleCopy} className="btn btn-sm btn-outline">
                  <MdContentCopy />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-action px-5 pb-5 md:px-8 md:pb-8 justify-center md:justify-end">
          <form method="dialog">
            <button className="btn btn-warning w-full md:w-auto px-8">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UserDetailsModal;
