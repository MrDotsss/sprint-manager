import { env } from "@/config/env.config"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: env.API_URL,
})
