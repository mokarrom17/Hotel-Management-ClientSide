import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

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
        console.log(error);

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
