import z from "zod"
import { avatarValues } from "./avatar"

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
})

export type LoginDTO = z.infer<typeof loginSchema>

const strongPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(32, "Password cannot exceed 32 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")

export const signupSchema = z
  .object({
    username: z.string().min(3, "Username is too short."),
    email: z.email("Invalid email address"),
    image: z.enum(avatarValues),
    password: strongPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password do not match.",
    path: ["confirmPassword"],
  })

export type SignupDTO = z.infer<typeof signupSchema>
