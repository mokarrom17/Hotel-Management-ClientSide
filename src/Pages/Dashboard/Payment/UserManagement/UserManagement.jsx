import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiShieldOff } from "react-icons/fi";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load users.
      </div>
    );
  }

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user an admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = {
          role: "admin",
        };

        axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              icon: "success",
              title: "Success!",
              text: `${user.name ?? user.email} is now an Admin.`,
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  };
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user._id}`, { isDeleted: true })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: `${user.name ?? user.email} has been deleted.`,
                timer: 1500,
                showConfirmButton: false,
              });
            }
          });
      }
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">User Management</h2>
          <p className="text-gray-500 mt-1">Total Users : {users.length}</p>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src={
                          user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                        }
                        alt="User"
                      />
                    </div>
                  </div>
                </td>

                <td>{user.name || "No Name"}</td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={`rounded badge-lg p-3 font-semibold ${
                      user.role === "admin" ? "badge-success" : "badge-warning"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>

                <td>
                  <div className="flex gap-2">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="tooltip"
                        data-tip="Remove Admin"
                      >
                        <FiShieldOff />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm btn-warning"
                      >
                        👑 Make Admin
                      </button>
                    )}
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

export default UserManagement;
