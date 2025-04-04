import axiosInstance from "@/api/axios-instance";

const ARTIST_API_BASE_URL = process.env.NEXT_PUBLIC_ARTIST_API_BASE_URL;

// fetch artist with pagination
export const fetchArtists = async (page = 1, pageSize = 10) => {
  try {
    const response = await axiosInstance.get(
      `${ARTIST_API_BASE_URL}/artists/?page=${page}&page_size=${pageSize}`
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

// Fetch artists by user ID
export const fetchArtistsByUserId = async (
  Id: number,
  page = 1,
  pageSize = 10
) => {
  try {
    const response = await axiosInstance.get(
      `${ARTIST_API_BASE_URL}/users/${Id}/artists/?page=${page}&page_size=${pageSize}`
    );
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

// Update an artist by ID (Requires Authorization)
export const updateArtist = async (
  id: number,
  artistData:
    | FormData
    | Partial<{
        name: string;
        dob: string;
        address: string;
        gender: string;
        first_release_year: number;
        no_of_albums: number;
      }>
) => {
  try {
    const isFormData = artistData instanceof FormData;

    const response = await axiosInstance.put(
      `${ARTIST_API_BASE_URL}/artists/${id}/`,
      artistData,
      isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {}
    );

    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Create a new artist (Requires Authorization)
export const createArtist = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(
      `${ARTIST_API_BASE_URL}/artists/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error("Your session has expired. Please log in again.");
      }
      throw error.response.data;
    }
    throw new Error(error.message || "Failed to create artist");
  }
};
