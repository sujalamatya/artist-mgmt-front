import axiosInstance from "@/api/axios-instance";
import { setCookie } from "@/actions/cookies";
import { IUser } from "../types/auth.type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const signUp = async (userData: IUser) => {
  try {
    return await axiosInstance.post(`${API_BASE_URL}/register/`, userData);
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
