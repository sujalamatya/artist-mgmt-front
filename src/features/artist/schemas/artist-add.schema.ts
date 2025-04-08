import { z } from "zod";

export const artistSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  first_release_year: z.coerce
    .number()
    .int()
    .min(1900, { message: "Year must be 1900 or later" })
    .max(new Date().getFullYear(), { message: "Year cannot be in the future" }),
  no_of_albums: z.coerce
    .number()
    .int()
    .min(0, { message: "Number of albums cannot be negative" }),
  // Image is optional
  image: z.instanceof(File).optional(),
});

export type ArtistFormData = z.infer<typeof artistSchema>;
