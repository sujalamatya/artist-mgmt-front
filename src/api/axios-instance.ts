import axios from "axios";
import { setCookie, getCookie } from "@/actions/cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAuthToken = async () => {
  return await getCookie("access_token");
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Refresh token function
const refreshAccessToken = async () => {
  try {
    const refreshToken = await getCookie("refresh_token");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post<{ access_token: string }>(
      `${API_BASE_URL}/refresh/`,
      { refresh_token: refreshToken }
    );

    const newAccessToken = response.data.access_token;

    await setCookie(
      "access_token",
      newAccessToken,
      Date.now() + 15 * 60 * 1000
    );
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
