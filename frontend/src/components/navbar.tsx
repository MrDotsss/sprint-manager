import { Link } from "@tanstack/react-router"
import { CompanyLogo } from "./company-logo"
import { Button } from "./ui/button"
import { ArrowUpRight } from "lucide-react"
import type { User } from "@/features/auth/auth.types"
import { cn } from "@/lib/utils"
import { AvatarDropdown } from "./avatar-dropdown"

export type NavbarProps = {
  user?: User
}

export function Navbar({
  className,
  user,
  ...props
}: React.ComponentProps<"nav"> & NavbarProps) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between gap-2 border-b p-4",
        className
      )}
      {...props}
    >
      <Link to="/">
        <CompanyLogo />
      </Link>

      {user ? (
        <AvatarDropdown username={user.name} image={user.image} />
      ) : (
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button size="lg">
              Start <ArrowUpRight />
            </Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
