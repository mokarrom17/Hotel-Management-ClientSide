import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaEye,
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaCommentDots,
  FaTimes,
} from "react-icons/fa";
import EmployeeApplicationModal from "./EmployeeApplicationModal";
import Swal from "sweetalert2";

const ManageEmployee = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSelectedApplication] = useState(null);

  const {
    data: applications = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["employee-application"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/manage-employees");
      return res.data;
    },
  });

  const handleApprove = async (application) => {
    const result = await Swal.fire({
      title: "Approve Application?",
      text: `Approve ${application.name} as ${application.position}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#aa8453",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(
        `/admin/manage-employees/${application._id}/approve`,
      );

      if (res.data.success) {
        await Swal.fire({
          title: "Application Approved!",
          text: `${application.name} is now a staff member.`,
          icon: "success",
          confirmButtonColor: "#aa8453",
        });

        setSelectedApplication(null);
        refetch();
      }
    } catch (error) {
      console.error("Approve application error:", error);

      Swal.fire({
        title: "Approval Failed",
        text:
          error.response?.data?.message || "Failed to approve the application.",
        icon: "error",
        confirmButtonColor: "#aa8453",
      });
    }
  };

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
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm text-gray-600">
                  <th className="w-12 px-4 py-4 font-semibold">#</th>

                  <th className="min-w-[190px] px-4 py-4 font-semibold">
                    Applicant
                  </th>

                  <th className="min-w-[230px] px-4 py-4 font-semibold">
                    Email
                  </th>

                  <th className="min-w-[160px] px-4 py-4 font-semibold">
                    Position
                  </th>

                  <th className="min-w-[150px] px-4 py-4 font-semibold">
                    Experience
                  </th>

                  <th className="w-[120px] px-4 py-4 font-semibold">Status</th>

                  <th className="w-[140px] whitespace-nowrap px-4 py-4 font-semibold">
                    Applied Date
                  </th>

                  <th className="w-[130px] px-4 py-4 text-center font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center">
                      <p className="text-gray-500">
                        No employee applications found.
                      </p>
                    </td>
                  </tr>
                ) : (
                  applications.map((application, index) => (
                    <tr
                      key={application._id}
                      className="border-b border-gray-100 transition hover:bg-gray-50"
                    >
                      {/* Number */}
                      <td className="px-4 py-4 text-sm font-medium text-gray-600">
                        {index + 1}
                      </td>

                      {/* Applicant */}
                      <td className="px-4 py-4">
                        <div className="min-w-[170px]">
                          <p className="break-words font-semibold text-gray-800">
                            {application.name}
                          </p>

                          <p className="mt-1 whitespace-nowrap text-xs text-gray-500">
                            {application.phone}
                          </p>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-4">
                        <p className="min-w-[210px] break-all text-sm text-gray-600">
                          {application.email}
                        </p>
                      </td>

                      {/* Position */}
                      <td className="px-4 py-4">
                        <p className="min-w-[140px] break-words font-medium text-gray-700">
                          {application.position}
                        </p>
                      </td>

                      {/* Experience */}
                      <td className="px-4 py-4">
                        <p className="min-w-[130px] break-words text-sm text-gray-600">
                          {application.experience}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        {application.status === "pending" && (
                          <span className="inline-flex whitespace-nowrap rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                            Pending
                          </span>
                        )}

                        {application.status === "approved" && (
                          <span className="inline-flex whitespace-nowrap rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            Approved
                          </span>
                        )}

                        {application.status === "rejected" && (
                          <span className="inline-flex whitespace-nowrap rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                            Rejected
                          </span>
                        )}
                      </td>

                      {/* Applied Date */}
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                        {application.createdAt
                          ? new Date(application.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "N/A"}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => setSelectedApplication(application)}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#aa8453] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#92703f]"
                        >
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
      {/* View Application Modal */}
      <EmployeeApplicationModal
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
        onApprove={handleApprove}
      />
    </div>
  );
};

export default ManageEmployee;
