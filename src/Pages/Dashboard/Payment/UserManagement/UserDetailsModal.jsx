import React from "react";

const UserDetailsModal = ({ selectedUser }) => {
  return (
    <dialog id="user_details_modal" className="modal">
      <div className="modal-box max-w-2xl p-0 overflow-hidden">
        {selectedUser && (
          <>
            {/* Header */}
            <div className="bg-warning text-white p-6 flex items-center gap-5">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-white ring-offset-2">
                  <img
                    src={
                      selectedUser.photoURL ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt={selectedUser.name}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {selectedUser.name || "No Name"}
                </h2>

                <p className="text-sm opacity-90">{selectedUser.email}</p>

                <div className="mt-2 flex gap-2">
                  <span
                    className={`badge badge-lg ${
                      selectedUser.role === "admin"
                        ? "badge-success"
                        : selectedUser.role === "staff"
                          ? "badge-info"
                          : "badge-warning"
                    }`}
                  >
                    {selectedUser.role || "User"}
                  </span>

                  <span
                    className={`badge badge-lg ${
                      selectedUser.isDeleted ? "badge-error" : "badge-success"
                    }`}
                  >
                    {selectedUser.isDeleted ? "Suspended" : "Active"}
                  </span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <h3 className="text-lg font-bold mb-5 border-b pb-2">
                User Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>

                  <h4 className="font-semibold">
                    {selectedUser.name || "N/A"}
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email Address</p>

                  <h4 className="font-semibold break-all">
                    {selectedUser.email}
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Role</p>

                  <h4 className="font-semibold capitalize">
                    {selectedUser.role || "User"}
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Account Status</p>

                  <h4 className="font-semibold">
                    {selectedUser.isDeleted ? "Suspended" : "Active"}
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Joined Date</p>

                  <h4 className="font-semibold">
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

                <div>
                  <p className="text-sm text-gray-500">User ID</p>

                  <h4 className="font-semibold break-all">
                    {selectedUser._id}
                  </h4>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="modal-action px-6 pb-6">
          <form method="dialog">
            <button className="btn btn-warning">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UserDetailsModal;
