import { LoadingDialog } from "@/components/loading-dialog"
import { useLoadingStore } from "@/stores/global-loading.store"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

const RootLayout = () => {
  const count = useLoadingStore((state) => state.count)
  const message = useLoadingStore((state) => state.message)

  return (
    <>
      <Outlet />
      <LoadingDialog open={count > 0} message={message} />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRoute({ component: RootLayout })
