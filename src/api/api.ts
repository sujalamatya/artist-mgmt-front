import axios from "axios";
import { setCookie, getCookie } from "@/actions/cookies";
import { IArtist, IUser, ILoginCredentials } from "@/types/types";
const API_BASE_URL = "http://localhost:8000/api/user";
const ARTIST_API_BASE_URL = "http://127.0.0.1:8000/api/artist";
const getAuthToken = async () => {
  return await getCookie("access_token");
};

// Axios instance with auth header (fetching token from cookies)
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

    // Store the new access token
    await setCookie(
      "access_token",
      newAccessToken,
      Date.now() + 15 * 60 * 1000 // 15 min expiry
    );

    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

// Axios response interceptor for handling token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token is expired, try refreshing it
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

// Login API with proper token storage
export const login = async (credentials: ILoginCredentials) => {
  try {
    const response = await axios.post<{
      access_token: string;
      refresh_token: string;
      user: IUser;
    }>(`${API_BASE_URL}/login/`, credentials);

    if (response.data.access_token) {
      // Store Access Token
      await setCookie(
        "access_token",
        response.data.access_token,
        Date.now() + 15 * 60 * 1000 // 15 min expiry
      );

      // Store Refresh Token
      await setCookie(
        "refresh_token",
        response.data.refresh_token,
        Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days expiry
      );

      // Store user info in session storage
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
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
    // Retrieve user info from session storage
    const userString = sessionStorage.getItem("user");
    const user: IUser | null = userString ? JSON.parse(userString) : null;

    // If the user is an artist, set user_id from session storage
    if (user && user.role === "artist") {
      artistData.id = user.id; // Store user_id in artistData
    }

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
