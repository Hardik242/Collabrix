import z from "zod";

export const signUpSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Minimum length should be 8 characters")
    .max(20, "Maximum length should be 20 characters"),
});

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z.string({ required_error: "password is required" }),
});
