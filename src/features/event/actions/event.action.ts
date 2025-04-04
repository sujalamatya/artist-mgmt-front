import axiosInstance from "@/api/axios-instance";
import { toast } from "sonner";
import { Event } from "../types/event.type";

const EVENT_API_BASE_URL = "http://localhost:8000/api/events/events/";

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
