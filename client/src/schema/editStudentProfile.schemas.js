import { z } from "zod";

export const EditStudentProfileSchema = z.object({
  grade: z
    .string()
    .min(1, "Grade is required")
    .max(20, "Grade is too long"),

  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio is too long"),
});