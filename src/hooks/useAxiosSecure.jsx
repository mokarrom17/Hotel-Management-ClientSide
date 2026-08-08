import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const token = await user?.getIdToken();

        config.headers.Authorization = `Bearer ${token}`;

        return config;
      },

      (error) => {
        return Promise.reject(error);
      },
    );

    // Response Interceptor

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },

      (error) => {
        const statusCode = error.response?.status;

        if (statusCode === 401) {
          logOut().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);

      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
