import axios from "axios";
import { getJWTToken } from "./get-jwt-token.util";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getJWTToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If user is not authorized, we have to clean local storage and redirect user to login page
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.history.go("/login");
    }

    return Promise.reject(error);
  },
);
