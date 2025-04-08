import axiosInstance from "@/api/axios-instance";

const ARTIST_API_BASE_URL = process.env.NEXT_PUBLIC_ARTIST_API_BASE_URL;

//create artist music
export const createMyMusic = async (musicData: {
  title: string;
  album_name: string;
  genre: string;
}) => {
  try {
    const response = await axiosInstance.post(
      `${ARTIST_API_BASE_URL}/songs/`,
      musicData
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// search songs
export const searchSongs = async (query: string) => {
  try {
    const response = await axiosInstance.get(
      `${ARTIST_API_BASE_URL}/songs/?search=${query}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete an SONG by ID (Requires Authorization)
export const deleteSong = async (id: number) => {
  try {
    await axiosInstance.delete(`${ARTIST_API_BASE_URL}/songs/${id}/`);
    return { success: true, message: "Song deleted successfully" };
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

export const searchMyMusic = async (query: string) => {
  try {
    const response = await axiosInstance.get(
      `${ARTIST_API_BASE_URL}/songs/?user_music=true&search=${query}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
