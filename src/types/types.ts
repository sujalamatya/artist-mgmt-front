import { z } from "zod";
export interface ILoginCredentials {
  email: string;
  password: string;
}

// export interface IUser {
//   id: number;
//   email: string;
//   name: string;
// }

export interface IArtist {
  id?: number;
  name: string;
  dob: string;
  address: string;
  gender: string;
  first_release_year: number;
  no_of_albums: number;
  image: File | string;
}

export interface IUser {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  role: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IAPIResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export const eventFormSchema = z.object({
  artist_id: z.number().min(1, "Artist ID is required"),
  user_id: z.number().min(1, "User ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  event_date: z.date(),
  location: z.string().optional(),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;

export interface Event {
  id: number;
  artist_id: number;
  user_id: number;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
}
