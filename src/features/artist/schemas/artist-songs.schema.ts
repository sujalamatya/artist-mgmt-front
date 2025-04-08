import { z } from "zod";

export const songSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  album_name: z.string().min(1, { message: "Album name is required" }),
  genre: z.string().min(1, { message: "Genre is required" }),
});

export type SongFormData = z.infer<typeof songSchema>;
