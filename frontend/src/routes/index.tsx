import { Navbar } from "@/components/navbar"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>hello home</main>
    </div>
  )
}
