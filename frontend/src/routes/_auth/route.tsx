import { CompanyLogo } from "@/components/company-logo"
import { LoadingDialog } from "@/components/loading-dialog"
import { authClient } from "@/lib/auth"
import { createFileRoute, Link, redirect, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const session = await authClient.getSession()

    if (session.data) {
      throw redirect({
        to: "/profile",
      })
    }
  },
  pendingComponent: () => (
    <LoadingDialog open={true} message="Checking user." />
  ),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-6">
        <Link to="/">
          <CompanyLogo />
        </Link>
        <Outlet />
      </div>
    </div>
  )
}
