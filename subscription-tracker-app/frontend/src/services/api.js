import axios from "axios";
import { logout } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalRequest = err.config;
    if (err) {
      if (err.response.status === 403) {
        logout();
      }
      if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        logout();
      }
    }
    return Promise.reject(err);
  }
);

export default api;
