import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = null, isPending: isRoleLoading } = useQuery({
    queryKey: ["user-role", user?.email],

    enabled: !loading && !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);

      console.log("Logged in email:", user.email);
      console.log("Role API response:", res.data);
      console.log("Role:", res.data.role);

      return res.data.role;
    },
  });

  return {
    role,
    isRoleLoading,
    isAdmin: role === "admin",
    isStaff: role === "staff",
    isUser: role === "customer",
  };
};

export default useUserRole;
