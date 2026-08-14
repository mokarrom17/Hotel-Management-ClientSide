import React from "react";
import StaffWelcome from "./StaffWelcome";
import StaffResponsibilities from "./StaffResponsibilities";
import StaffProfile from "./StaffProfile";
import StaffRecentActivity from "./StaffRecentActivity";
import StaffStats from "./StaffStats";

const StaffDashboardHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Welcome */}
        <StaffWelcome />

        {/* Statistics */}
        <StaffStats />

        {/* Responsibilities + Profile */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <StaffResponsibilities />
          <StaffProfile />
        </div>

        {/* Recent Activity */}
        <StaffRecentActivity />
      </div>
    </div>
  );
};

export default StaffDashboardHome;
