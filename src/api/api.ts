import axios from "axios";
import { setCookie, getCookie } from "@/actions/cookies";
import { IArtist, IUser, ILoginCredentials } from "@/types/types";
import { Event } from "@/types/types";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const ARTIST_API_BASE_URL = process.env.NEXT_PUBLIC_ARTIST_API_BASE_URL;
const EVENT_API_BASE_URL = "http://localhost:8000/api/events/events/";
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
// export const login = async (credentials: ILoginCredentials) => {
//   try {
//     const response = await axios.post<{
//       access_token: string;
//       refresh_token: string;
//       user: IUser;
//     }>(`${API_BASE_URL}/login/`, credentials);

//     if (response.data.access_token) {
//       // Store Access Token
//       await setCookie(
//         "access_token",
//         response.data.access_token,
//         Date.now() + 15 * 60 * 1000 // 15 min expiry
//       );

//       // Store Refresh Token
//       await setCookie(
//         "refresh_token",
//         response.data.refresh_token,
//         Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days expiry
//       );

//       // Store user info in session storage
//       sessionStorage.setItem("user", JSON.stringify(response.data.user));
//     }

//     return response.data;
//   } catch (error: any) {
//     throw error.response ? error.response.data : error.message;
//   }
// };

// fetch artist with pagination
export const fetchArtists = async (page = 1, pageSize = 10) => {
  try {
    const response = await axiosInstance.get(
      `${ARTIST_API_BASE_URL}/artists/?page=${page}&page_size=${pageSize}` //------------------------done
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch artists by user ID
export const fetchArtistsByUserId = async (
  //---------DONE
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
    throw error.response ? error.response.data : error.message; //-----------------------DONE
  }
};

// Fetch all songs by artist ID (Requires Authorization)
export const fetchArtistSongs = async (id?: number) => {
  try {
    const url = id
      ? `${ARTIST_API_BASE_URL}/artists/${id}/songs/` //-----------------------done
      : `${ARTIST_API_BASE_URL}/songs/`; // Fetch all songs if no ID is provided
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

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
      `${ARTIST_API_BASE_URL}/songs/?artist_id=${artistId}&search=${query}` //DONE
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
        throw new Error("Your session has expired. Please log in again."); //----------DONE
      }
      throw error.response.data;
    }
    throw new Error(error.message || "Failed to create artist");
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
      isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {} //-----------------DONE
    );

    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete an artist by ID (Requires Authorization)
export const deleteArtist = async (id: number) => {
  //-------------------DONE
  try {
    await axiosInstance.delete(`${ARTIST_API_BASE_URL}/artists/${id}/`);
    return { success: true, message: "Artist deleted successfully" };
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

// SignUp API (No auth required)
// export const signUp = async (userData: IUser) => {
//   try {
//     const response = await axios.post<IUser>(
//       `${API_BASE_URL}/register/`,
//       userData
//     );
//     // return response.data;
//   } catch (error: any) {
//     throw error.response ? error.response.data : error.message;
//   }
// };

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
export const addArtistSong = async (songData: {
  artist_id: string;
  title: string;
  album_name: string;
  genre: string;
}) => {
  try {
    const response = await axiosInstance.post(
      `${ARTIST_API_BASE_URL}/artists/${songData.artist_id}/songs/`,
      songData
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

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

//EVENT APIS
export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(EVENT_API_BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch events");
    return await response.json();
  } catch (error) {
    toast.error("Failed to load events");
    throw error;
  }
};

export const createEvent = async (data: Omit<Event, "id">): Promise<Event> => {
  try {
    const response = await fetch(EVENT_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  } catch (error) {
    toast.error("Failed to create event");
    throw error;
  }
};

export const updateEvent = async (
  id: number,
  data: Partial<Event>
): Promise<Event> => {
  try {
    const response = await fetch(`${EVENT_API_BASE_URL}/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  } catch (error) {
    toast.error("Failed to update event");
    throw error;
  }
};

export const deleteEvent = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${EVENT_API_BASE_URL}/${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete event");
  } catch (error) {
    toast.error("Failed to delete event");
    throw error;
  }
};

// Export music list as CSV
export const exportMusicCSV = async () => {
  try {
    const response = await axiosInstance.get(
      `${ARTIST_API_BASE_URL}/songs/?export=csv`,
      {
        responseType: "blob", // response treated as a file
        // binary large object
      }
    );

    // Create a download link for the CSV file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "music_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error: any) {
    toast.error("Failed to export CSV");
    throw error.response ? error.response.data : error.message;
  }
};

export const importMusicCSV = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("csv_file", file);

    const response = await axiosInstance.post(
      `${ARTIST_API_BASE_URL}/songs/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("CSV imported successfully");
    return response.data;
  } catch (error: any) {
    toast.error("Failed to import CSV");
    throw error.response ? error.response.data : error.message;
  }
};
