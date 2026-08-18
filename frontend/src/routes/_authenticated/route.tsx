import { LoadingDialog } from "@/components/loading-dialog"
import { Navbar } from "@/components/navbar"
import type { Session } from "@/features/auth/auth.types"
import { authClient } from "@/lib/auth"
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouteContext,
} from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const session = await authClient.getSession()

    if (!session.data) {
      throw redirect({
        to: "/login",
      })
    }

    return session.data as Session
  },
  pendingComponent: () => (
    <LoadingDialog open={true} message="Checking user." />
  ),
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useRouteContext({ from: "/_authenticated" })
  return (
    <div>
      <header>
        <Navbar user={user} />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
