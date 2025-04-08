import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
