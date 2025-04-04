import axiosInstance from "@/api/axios-instance";

const ARTIST_API_BASE_URL = process.env.NEXT_PUBLIC_ARTIST_API_BASE_URL;

// Fetch user's own music (Requires Authorization)
export const fetchMyMusic = async () => {
  try {
    const response = await axiosInstance.get(
      `${ARTIST_API_BASE_URL}/songs/?user_music=true`
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
