import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/user";
const ARTIST_API_BASE_URL = "http://127.0.0.1:8000/api/artist";

// Fetch all artists
export const fetchArtists = async () => {
  try {
    const response = await axios.get(`${ARTIST_API_BASE_URL}/artists/`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch single artist by ID
export const fetchArtistById = async (id: number) => {
  try {
    const response = await axios.get(`${ARTIST_API_BASE_URL}/artists/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Create a new artist
export const createArtist = async (artistData: {
  name: string;
  dob: string;
  address: string;
  gender: string;
  first_release_year: number;
  no_of_albums: number;
  released: boolean;
}) => {
  try {
    const response = await axios.post(
      `${ARTIST_API_BASE_URL}/artists/`,
      artistData
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Update an artist by ID
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
    const response = await axios.put(
      `${ARTIST_API_BASE_URL}/artists/${id}/`,
      artistData
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete an artist by ID
export const deleteArtist = async (id: number) => {
  try {
    await axios.delete(`${ARTIST_API_BASE_URL}/artists/${id}/`);
    return { success: true, message: "Artist deleted successfully" };
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// SignUp API
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

// Login API
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, credentials);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
