import { Link } from "@tanstack/react-router"
import { CompanyLogo } from "./company-logo"

export function HomeNavbar() {
  return (
    <nav className="flex items-center justify-between gap-2 border-b p-4">
      <Link to="/">
        <CompanyLogo />
      </Link>
    </nav>
  )
}
