import axios from "axios";
import { IArtist, IUser, ILoginCredentials } from "@/types/types";
const API_BASE_URL = "http://localhost:8000/api/user";
const ARTIST_API_BASE_URL = "http://127.0.0.1:8000/api/artist";
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

// Axios instance with auth header (using the token from localStorage)
const axiosInstance = axios.create();

const token = getAuthToken();
if (token) {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export const fetchArtists = async () => {
  try {
    const response = await axiosInstance.get(`${ARTIST_API_BASE_URL}/artists/`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch single artist by ID (Requires Authorization)
export const fetchArtistById = async (id: number) => {
  try {
    const response = await axiosInstance.get(
      `${ARTIST_API_BASE_URL}/artists/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch all songs by artist ID (Requires Authorization)
export const fetchArtistSongs = async (id?: number) => {
  try {
    const url = id
      ? `${ARTIST_API_BASE_URL}/artists/${id}/songs/`
      : `${ARTIST_API_BASE_URL}/songs/`; // Fetch all songs if no ID is provided
    const response = await axiosInstance.get(url);
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
// Search songs by artist and query
export const searchSongsById = async (query: string, artistId: number) => {
  try {
    const response = await axiosInstance.get(
      `${ARTIST_API_BASE_URL}/songs/?artist_id=${artistId}&search=${query}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Create a new artist (Requires Authorization)
export const createArtist = async (artistData: IArtist) => {
  try {
    const response = await axiosInstance.post<IArtist>(
      `${ARTIST_API_BASE_URL}/artists/`,
      artistData
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
// Update an artist by ID (Requires Authorization)
export const updateArtist = async (
  id: number,
  artistData: Partial<{
    name: string;
    dob: string;
    address: string;
    gender: string;
    first_release_year: number;
    no_of_albums: number;
  }>
) => {
  try {
    const response = await axiosInstance.put(
      `${ARTIST_API_BASE_URL}/artists/${id}/`,
      artistData
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete an artist by ID (Requires Authorization)
export const deleteArtist = async (id: number) => {
  try {
    await axiosInstance.delete(`${ARTIST_API_BASE_URL}/artists/${id}/`);
    return { success: true, message: "Artist deleted successfully" };
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// SignUp API (No auth required)
export const signUp = async (userData: IUser) => {
  try {
    const response = await axios.post<IUser>(
      `${API_BASE_URL}/register/`,
      userData
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Login API (No auth required)
export const login = async (credentials: ILoginCredentials) => {
  try {
    const response = await axios.post<{ access_token: string }>(
      `${API_BASE_URL}/login/`,
      credentials
    );

    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
      axiosInstance.defaults.headers[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
    }
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
