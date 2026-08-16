import { HomeNavbar } from "@/components/home-navbar"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <div>
      <header>
        <HomeNavbar />
      </header>
      <main>hello home</main>
    </div>
  )
}
