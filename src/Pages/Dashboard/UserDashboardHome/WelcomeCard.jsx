import useAuth from "../../../hooks/useAuth";

const UserWelcome = () => {
  const { user } = useAuth();

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome back, {user?.displayName || "Guest"} 👋
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Here’s an overview of your hotel bookings and stays.
      </p>
    </div>
  );
};

export default UserWelcome;
