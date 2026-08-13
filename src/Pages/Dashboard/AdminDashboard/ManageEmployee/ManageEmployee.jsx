import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaUserTie } from "react-icons/fa";

const ManageEmployee = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employee-application"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/manage-employees");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#aa8453]"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-xl bg-red-50 px-6 py-4 text-center text-red-600">
          Failed to load employee applications.
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#aa8453] p-3 text-white">
              <FaUserTie className="text-xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                Manage Employees
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Review and manage employee applications.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Applications</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-800">
              {applications.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="mt-1 text-2xl font-bold text-yellow-600">
              {
                applications.filter(
                  (application) => application.status === "pending",
                ).length
              }
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Approved</p>
            <h2 className="mt-1 text-2xl font-bold text-green-600">
              {
                applications.filter(
                  (application) => application.status === "approved",
                ).length
              }
            </h2>
          </div>
        </div>

        {/* Application Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-50 text-gray-600">
                  <th>#</th>
                  <th>Applicant</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th>Applied Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center">
                      <p className="text-gray-500">
                        No employee applications found.
                      </p>
                    </td>
                  </tr>
                ) : (
                  applications.map((application, index) => (
                    <tr key={application._id}>
                      <td>{index + 1}</td>

                      <td>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {application.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {application.phone}
                          </p>
                        </div>
                      </td>

                      <td className="text-gray-600">{application.email}</td>

                      <td>
                        <span className="font-medium text-gray-700">
                          {application.position}
                        </span>
                      </td>

                      <td className="text-gray-600">
                        {application.experience}
                      </td>

                      <td>
                        {application.status === "pending" && (
                          <span className="badge badge-warning">Pending</span>
                        )}

                        {application.status === "approved" && (
                          <span className="badge badge-success">Approved</span>
                        )}

                        {application.status === "rejected" && (
                          <span className="badge badge-error">Rejected</span>
                        )}
                      </td>

                      <td className="text-sm text-gray-500">
                        {application.createdAt
                          ? new Date(application.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td>
                        <button className="btn btn-sm border-none bg-[#aa8453] text-white hover:bg-black">
                          <FaEye />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEmployee;
