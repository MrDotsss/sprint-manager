import { authClient } from "@/lib/auth"

export type Session = typeof authClient.$Infer.Session
export type User = typeof authClient.$Infer.Session.user
