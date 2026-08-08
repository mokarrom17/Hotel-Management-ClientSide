import useUserRole from "../../../hooks/useUserRole";
import AdminDashboardHome from "../AdminDashboard/DashboardHome/AdminDashboardHome ";
import EmployeeDashboardHome from "../EmployeeDashboard/EmployeeDashboardHome";
import UserDashboardHome from "../UserDashboardHome/UserDashboardHome";

const DashboardHome = () => {
  const { isRoleLoading, isAdmin, isEmployee, isUser } = useUserRole();

  if (isRoleLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isAdmin) {
    return <AdminDashboardHome />;
  }

  if (isEmployee) {
    return <EmployeeDashboardHome />;
  }

  if (isUser) {
    return <UserDashboardHome />;
  }

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <p className="text-red-500">Unable to determine your account role.</p>
    </div>
  );
};

export default DashboardHome;
