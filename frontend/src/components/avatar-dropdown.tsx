import { ChevronDown } from "lucide-react"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { getAvatarUrl, type AvatarType } from "@/features/auth/avatar"
import { loading } from "@/stores/global-loading.store"
import { authClient } from "@/lib/auth"
import { useNavigate } from "@tanstack/react-router"

type AvatarDropDownProps = {
  username: string
  image?: AvatarType | string | null
}

export function AvatarDropdown({ username, image }: AvatarDropDownProps) {
  const userInitials = username.slice(0, 2).toUpperCase()
  const navigate = useNavigate()

  const onLogout = async () => {
    loading.start("Logging out")

    const { error } = await authClient.signOut()

    if (!error) {
      loading.stop()
      throw navigate({ to: "/login", replace: true })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar size="lg" className="border border-accent-foreground">
              {image && (
                <AvatarImage
                  src={getAvatarUrl(username, image, true)}
                  alt={`${username}'s Avatar`}
                />
              )}
              <AvatarFallback>{userInitials}</AvatarFallback>
              <AvatarBadge className="bg-muted dark:bg-muted-foreground">
                <ChevronDown />
              </AvatarBadge>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent className="w-32">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={onLogout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
