import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiShield, FiShieldOff, FiUserCheck, FiUserX } from "react-icons/fi";
import UserDetailsModal from "./UserDetailsModal";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [selectedUser, setSelectedUser] = useState(null);
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
  // ==========================================
  // User Counts
  // ==========================================
  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role === "admin").length;
  const totalStaff = users.filter((user) => user.role === "staff").length;
  const totalCustomers = users.filter((user) => user.role === "user").length;
  // ==========================================
  // Loading and Error Handling
  // ==========================================
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
  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Remove Admin?",
      text: `${user.name} will no longer have admin access.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user._id}`, {
            role: "user",
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();

              Swal.fire({
                icon: "success",
                title: "Admin Removed",
                text: `${user.name} is now a user.`,
                timer: 1500,
                showConfirmButton: false,
              });
            }
          });
      }
    });
  };

  // ==========================================
  // Handle Status Change
  // ==========================================
  const handleStatusChange = async (user) => {
    const newStatus = user.status === "active" ? "suspended" : "active";
    const result = await Swal.fire({
      title: newStatus === "suspended" ? "Suspend User?" : "Activate User?",
      text:
        newStatus === "suspended"
          ? "This user won't be able to access the system."
          : "This user will regain access to the system.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "suspended" ? "#d33" : "#16a34a",
      confirmButtonText: newStatus === "suspended" ? "Suspend" : "Activate",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${user._id}`, {
        status: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        refetch();

        Swal.fire({
          icon: "success",
          title: `User ${
            newStatus === "suspended" ? "Suspended" : "Activated"
          } Successfully`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    }
  };

  // Filtered Users
  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText);

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });
  // ==========================================
  // Sorting Users
  // ==========================================
  const sortedUsers = [...filteredUsers];
  if (sortBy === "az") {
    sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === "za") {
    sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sortBy === "newest") {
    sortedUsers.reverse();
  }

  // ==========================================
  // Pagination Logic
  // ==========================================
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">User Management</h2>
        </div>
      </div>
      {/* Statistics Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500 text-sm ">Total Users</h3>
          <h2 className="text-3xl font-bold mt-2">{totalUsers}</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500 text-sm ">Admins</h3>
          <h2 className="text-3xl font-bold mt-2">{totalAdmins}</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500 text-sm ">Staff</h3>
          <h2 className="text-3xl font-bold mt-2">{totalStaff}</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500 text-sm ">Customers</h3>
          <h2 className="text-3xl font-bold mt-2">{totalCustomers}</h2>
        </div>
      </div>

      {/* Search + Filter + Sort */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          className="input input-bordered w-full lg:w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap items-center gap-3">
          {/* Role Filter */}
          <select
            className="select select-bordered"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="user">User</option>
          </select>

          {/* Sort */}
          <select
            className="select select-bordered"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">Name (A - Z)</option>
            <option value="za">Name (Z - A)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="table table-zebra">
          <thead className="bg-base-200 text-lg text-center">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr
                key={user._id}
                className={
                  user.status === "suspended" ? "bg-red-50 opacity-80" : ""
                }
              >
                <td>{startIndex + index + 1}</td>

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

                <td className="font-semibold">{user.name || "No Name"}</td>

                <td className="text-gray-600 font-semibold">{user.email}</td>

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
                  <span
                    className={`badge badge-lg p-5 font-semibold rounded ${
                      user.status === "active" ? "badge-success" : "badge-error"
                    }`}
                  >
                    {user.status === "active" ? "Active" : "Suspended"}
                  </span>
                </td>

                <td>
                  <div className="flex items-center justify-center gap-2">
                    {/* View Button */}
                    <button
                      className="btn btn-md btn-info"
                      onClick={() => {
                        setSelectedUser(user);
                        document
                          .getElementById("user_details_modal")
                          .showModal();
                      }}
                    >
                      View
                    </button>

                    {/* Role Action */}
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn btn-md btn-outline btn-error tooltip tooltip-left"
                        data-tip="Remove Admin"
                      >
                        <FiShieldOff className="text-base size-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-md btn-warning text-lg font-semibold
                        "
                        data-tip="Make Admin"
                      >
                        <FiShield className="text-base size-5" />
                        Admin
                      </button>
                    )}
                    {/* Status Action */}
                    <button
                      onClick={() => handleStatusChange(user)}
                      className={`btn btn-md ${
                        user.status === "active"
                          ? "btn-outline btn-error"
                          : "btn-outline btn-success"
                      }`}
                    >
                      {user.status === "active" ? (
                        <>
                          <FiUserX className="text-base size-5" />
                          Suspend
                        </>
                      ) : (
                        <>
                          <FiUserCheck className="text-base size-5" />
                          Activate
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn btn-sm ${
              currentPage === index + 1 ? "btn-warning" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      {/* User Details Modal */}
      <UserDetailsModal selectedUser={selectedUser} />
    </div>
  );
};

export default UserManagement;
