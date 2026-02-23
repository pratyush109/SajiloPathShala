import { z } from "zod";

export const forgetpassword = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});