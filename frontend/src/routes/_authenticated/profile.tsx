import { createFileRoute, useRouteContext } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/profile")({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useRouteContext({ from: "/_authenticated" })

  return <div>Hello {user.name}</div>
}
