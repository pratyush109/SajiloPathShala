import {z }from "zod";

export const forgetpassword = z.object({

 email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Email is invalid" }),

});