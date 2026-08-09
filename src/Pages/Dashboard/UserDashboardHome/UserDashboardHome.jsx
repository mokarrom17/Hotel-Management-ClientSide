import QuickActions from "./QuickActions";
import RecentBookings from "./RecentBookings";
import UpcomingStay from "./UpcomingStay";
import UserStats from "./UserStats";
import UserWelcome from "./WelcomeCard";

const UserDashboardHome = () => {
  return (
    <div className="p-6">
      <UserWelcome />
      <UserStats />
      <UpcomingStay />
      <RecentBookings />
    </div>
  );
};

export default UserDashboardHome;
