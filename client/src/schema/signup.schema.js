import {z }from "zod";

export const SignupSchema = z.object({
    
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name can't exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["parent", "tutor", "student"], "Please select a role"), 
  
    
});