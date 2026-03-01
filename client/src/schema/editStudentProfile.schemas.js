import { z } from "zod";

export const EditStudentProfileSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be less than 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Full name can only contain letters"),
  email: z.string().optional(), 
});