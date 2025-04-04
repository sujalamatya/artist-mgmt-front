import axiosInstance from "@/api/axios-instance";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch all users
export const fetchUsers = async (): Promise<any[]> => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/users/`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete a user
export const deleteUser = async (id: number): Promise<string> => {
  const response = await axiosInstance.delete(`${API_BASE_URL}/users/${id}/`);
  return response.data?.message || "User deleted successfully";
};
