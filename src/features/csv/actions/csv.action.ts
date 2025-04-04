import axiosInstance from "@/api/axios-instance";
import { toast } from "sonner";

const ARTIST_API_BASE_URL = process.env.NEXT_PUBLIC_ARTIST_API_BASE_URL;

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
