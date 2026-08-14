import React from "react";
import {
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

const EmployeeApplicationModal = ({
  application,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-5">
      <div className="relative flex h-[92vh] max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="shrink-0 border-b border-gray-200 bg-white px-5 py-4 sm:px-6 sm:py-5 md:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Applicant Info */}
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#aa8453] text-white shadow-sm sm:h-14 sm:w-14">
                <FaUserTie className="text-xl sm:text-2xl" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-gray-800 sm:text-xl md:text-2xl">
                  {application.name}
                </h2>

                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 sm:text-sm">
                  <span className="max-w-[180px] truncate font-medium text-[#aa8453] sm:max-w-none">
                    {application.position}
                  </span>

                  <span className="text-gray-300">•</span>

                  <span className="whitespace-nowrap">
                    Applied{" "}
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
                  </span>
                </div>
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close application details"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition duration-200 hover:bg-gray-200 hover:text-gray-800 sm:h-10 sm:w-10"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* =====================================================
            BODY
        ====================================================== */}
        <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/70 px-4 py-5 sm:px-6 sm:py-6 md:px-8">
          {/* =================================================
              PERSONAL INFORMATION
          ================================================== */}
          <section className="mb-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#aa8453]/10 text-[#aa8453]">
                <FaUserTie />
              </div>

              <div>
                <h3 className="font-bold text-gray-800">
                  Personal Information
                </h3>

                <p className="text-xs text-gray-500">
                  Applicant contact and personal details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Name */}
              <div className="flex min-w-0 items-start gap-3">
                <FaUserTie className="mt-1 shrink-0 text-sm text-[#aa8453]" />

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Full Name
                  </p>

                  <p className="mt-1 break-words font-semibold text-gray-800">
                    {application.name || "N/A"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex min-w-0 items-start gap-3">
                <FaEnvelope className="mt-1 shrink-0 text-sm text-[#aa8453]" />

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Email Address
                  </p>

                  <p className="mt-1 break-all font-semibold text-gray-800">
                    {application.email || "N/A"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex min-w-0 items-start gap-3">
                <FaPhone className="mt-1 shrink-0 text-sm text-[#aa8453]" />

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Phone Number
                  </p>

                  <p className="mt-1 break-words font-semibold text-gray-800">
                    {application.phone || "N/A"}
                  </p>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="flex min-w-0 items-start gap-3">
                <FaCalendarAlt className="mt-1 shrink-0 text-sm text-[#aa8453]" />

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Date of Birth
                  </p>

                  <p className="mt-1 break-words font-semibold text-gray-800">
                    {application.dateOfBirth || "N/A"}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex min-w-0 items-start gap-3 md:col-span-2">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-sm text-[#aa8453]" />

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Address
                  </p>

                  <p className="mt-1 break-words leading-6 font-semibold text-gray-800">
                    {application.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              JOB INFORMATION
          ================================================== */}
          <section className="mb-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#aa8453]/10 text-[#aa8453]">
                <FaBriefcase />
              </div>

              <div>
                <h3 className="font-bold text-gray-800">Job Information</h3>

                <p className="text-xs text-gray-500">
                  Position and professional qualifications
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Position */}
              <div className="min-w-0 rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Position Applied For
                </p>

                <div className="mt-2 flex min-w-0 items-center gap-2">
                  <FaBriefcase className="shrink-0 text-[#aa8453]" />

                  <p className="break-words font-semibold text-gray-800">
                    {application.position || "N/A"}
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="min-w-0 rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Previous Experience
                </p>

                <div className="mt-2 flex min-w-0 items-center gap-2">
                  <FaGraduationCap className="shrink-0 text-[#aa8453]" />

                  <p className="break-words font-semibold text-gray-800">
                    {application.experience || "N/A"}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="min-w-0 rounded-xl bg-gray-50 p-4 md:col-span-2">
                <div className="flex items-center gap-2">
                  <FaTools className="shrink-0 text-[#aa8453]" />

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Skills
                  </p>
                </div>

                <p className="mt-2 break-words whitespace-pre-wrap leading-6 font-semibold text-gray-800">
                  {application.skills || "N/A"}
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              APPLICATION STATEMENT
          ================================================== */}
          <section className="mb-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#aa8453]/10 text-[#aa8453]">
                <FaCommentDots />
              </div>

              <div>
                <h3 className="font-bold text-gray-800">
                  Application Statement
                </h3>

                <p className="text-xs text-gray-500">
                  Why the applicant wants to join the hotel
                </p>
              </div>
            </div>

            <div className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="break-all whitespace-pre-wrap text-sm leading-7 text-gray-700">
                {application.reason || "No statement provided."}
              </p>
            </div>
          </section>

          {/* =================================================
              APPLICATION STATUS
          ================================================== */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Application Status
                </p>

                <div className="mt-2">
                  {application.status === "pending" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700 ring-1 ring-yellow-200">
                      <span className="h-2 w-2 rounded-full bg-yellow-500" />
                      Pending Review
                    </span>
                  )}

                  {application.status === "approved" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 ring-1 ring-green-200">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Approved
                    </span>
                  )}

                  {application.status === "rejected" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 ring-1 ring-red-200">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      Rejected
                    </span>
                  )}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-xs text-gray-400">Application Date</p>

                <p className="mt-1 text-sm font-semibold text-gray-700">
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
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}
        <div className="shrink-0 border-t border-gray-200 bg-white px-5 py-4 sm:px-6 md:px-8">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-700 transition duration-200 hover:bg-gray-200"
            >
              Close
            </button>

            {/* Reject */}
            {application.status === "pending" && (
              <button
                type="button"
                onClick={() => onReject(application)}
                className="rounded-xl border border-red-200 bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 transition duration-200 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
              >
                Reject Application
              </button>
            )}

            {/* Approve */}
            {application.status === "pending" && (
              <button
                type="button"
                onClick={() => onApprove(application)}
                className="rounded-xl bg-[#aa8453] px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#92703f] focus:outline-none focus:ring-2 focus:ring-[#aa8453] focus:ring-offset-2"
              >
                Approve Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeApplicationModal;
