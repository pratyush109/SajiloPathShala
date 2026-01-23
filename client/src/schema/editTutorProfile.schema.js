import { z } from "zod";

export const editTutorProfileSchema = z.object({
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(300, "Bio must be under 300 characters"),

  subjects: z
    .array(z.string())
    .min(1, "Add at least one subject"),

  hourlyRate: z
    .number({ invalid_type_error: "Hourly rate is required" })
    .min(100, "Minimum rate is NPR 100"),

  experience: z
    .number({ invalid_type_error: "Experience is required" })
    .min(0, "Experience cannot be negative")
    .max(50, "Experience too high"),

  availability: z.object({
    morning: z.boolean(),
    afternoon: z.boolean(),
    evening: z.boolean(),
    weekend: z.boolean(),
  }).refine(
    (v) => Object.values(v).some(Boolean),
    { message: "Select at least one availability option" }
  ),
});