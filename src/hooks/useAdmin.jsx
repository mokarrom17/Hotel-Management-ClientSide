import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

// ==========================================
// useAdmin
// Checks the current user's role against the backend.
// Returns { isAdmin, isAdminLoading } so callers can
// show a spinner instead of flashing admin-only UI early.
// ==========================================
const useAdmin = () => {
  const { user, loading } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: isAdmin = false, isPending: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],

    // don't fire until Firebase auth has resolved AND we have an email
    enabled: !loading && !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);

      return res.data.role === "admin";
    },
  });

  return { isAdmin, isAdminLoading };
};

export default useAdmin;
