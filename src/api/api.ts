import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/user";
const ARTIST_API_BASE_URL = "http://127.0.0.1:8000/api/artist";

// Get stored token from localStorage
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

// Axios instance with auth header (using the token from localStorage)
const axiosInstance = axios.create();

// Set the auth token in axios headers if available
const token = getAuthToken();
if (token) {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
}

// Fetch all artists (Requires Authorization)
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
export const fetchArtistSongs = async (id: number) => {
  try {
    const response = await axiosInstance.get(
      `${ARTIST_API_BASE_URL}/artists/${id}/songs/`
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Create a new artist (Requires Authorization)
export const createArtist = async (artistData: {
  name: string;
  dob: string;
  address: string;
  gender: string;
  first_release_year: number;
  no_of_albums: number;
}) => {
  try {
    const response = await axiosInstance.post(
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
    released: boolean;
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
export const signUp = async (userData: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  role: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register/`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Login API (No auth required)
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, credentials);

    // Store token in localStorage after login
    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);

      // Update axiosInstance headers dynamically after login
      axiosInstance.defaults.headers[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
    }
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
