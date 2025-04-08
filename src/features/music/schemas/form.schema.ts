import * as z from "zod";

export const musicSchema = z.object({
  title: z.string().min(1, "Title is required"),
  album_name: z.string().min(1, "Album name is required"),
  genre: z.string().min(1, "Genre is required"),
});

export type MusicFormData = z.infer<typeof musicSchema>;
