import axiosInstance from "@/api/axios-instance";
import { setCookie } from "@/actions/cookies";
import { ILoginCredentials, IUser } from "../types/auth.type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (credentials: ILoginCredentials) => {
  try {
    const response = await axiosInstance.post<{
      access_token: string;
      refresh_token: string;
      user: IUser;
    }>(`${API_BASE_URL}/login/`, credentials);

    if (response.data.access_token) {
      await setCookie(
        "access_token",
        response.data.access_token,
        Date.now() + 15 * 60 * 1000
      );
      await setCookie(
        "refresh_token",
        response.data.refresh_token,
        Date.now() + 7 * 24 * 60 * 60 * 1000
      );
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
