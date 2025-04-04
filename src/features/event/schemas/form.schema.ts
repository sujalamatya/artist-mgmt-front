import { z } from "zod";

export const eventFormSchema = z.object({
  artist_id: z.number().min(1, "Artist ID is required"),
  user_id: z.number().min(1, "User ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  event_date: z.date(),
  location: z.string().optional(),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
