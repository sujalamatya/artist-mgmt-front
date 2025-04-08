import { z } from "zod";

export const userSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z.string().min(5, "Address must be at least 5 characters"),
  role: z.enum(["artist", "artist_manager", "super_admin"]),
});

export type UserFormValues = z.infer<typeof userSchema>;
