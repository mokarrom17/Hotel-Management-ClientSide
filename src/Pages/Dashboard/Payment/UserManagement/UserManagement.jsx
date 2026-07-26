import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiShieldOff } from "react-icons/fi";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
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
  const totalCustomers = users.filter(
    (user) => user.role === "customer",
  ).length;
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
            {paginatedUsers.map((user, index) => (
              <tr key={user._id}>
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
    </div>
  );
};

export default UserManagement;
