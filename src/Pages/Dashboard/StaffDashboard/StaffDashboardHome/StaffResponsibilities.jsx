import React from "react";
import { FaCheckCircle, FaClipboardList } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const StaffResponsibilities = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: staffProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff-profile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/profile");

      return res.data;
    },
  });
  const position = staffProfile?.position || "Staff";
  const responsibilitiesByPosition = {
    Receptionist: [
      "Handle today's guest check-ins",
      "Assist guests with front-desk requests",
      "Manage today's check-out activities",
      "Coordinate front-desk operations",
    ],

    Housekeeping: [
      "Monitor room cleaning status",
      "Prepare rooms after guest checkout",
      "Report room maintenance issues",
      "Ensure rooms are ready for new guests",
    ],

    "Food & Beverage": [
      "Coordinate food and beverage service",
      "Assist guest dining requests",
      "Monitor assigned service activities",
      "Maintain service quality",
    ],

    "Front Desk": [
      "Handle today's guest check-ins",
      "Assist guests with front-desk requests",
      "Manage today's check-out activities",
      "Coordinate front-desk operations",
    ],
  };

  const responsibilities = responsibilitiesByPosition[position] || [
    "Assist with daily hotel operations",
    "Support guest service activities",
    "Coordinate assigned hotel tasks",
    "Follow daily operational procedures",
  ];
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div>
          <h2 className="font-bold text-gray-800">Today's Responsibilities</h2>

          <p className="mt-1 text-xs text-gray-500">
            Your assigned tasks for today
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#aa8453]/10 text-[#aa8453]">
          <FaClipboardList />
        </div>
      </div>

      <div className="p-5">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-12 animate-pulse rounded-xl bg-gray-100"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="flex min-h-[180px] items-center justify-center text-center">
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <FaClipboardList />
              </div>

              <h3 className="font-semibold text-gray-700">
                Unable to load responsibilities
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Please try again later.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="mb-4">
              <p className="text-xs font-medium uppercase tracking-wide text-[#aa8453]">
                {position}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Your responsibilities for today
              </p>
            </div>

            {responsibilities.map((responsibility, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 transition hover:border-[#aa8453]/30 hover:bg-white"
              >
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#aa8453]/10 text-[#aa8453]">
                  <FaCheckCircle className="text-xs" />
                </div>

                <p className="text-sm leading-6 text-gray-700">
                  {responsibility}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffResponsibilities;
