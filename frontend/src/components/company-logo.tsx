import { TicketSlash } from "lucide-react"

export function CompanyLogo() {
  return (
    <div className="group flex items-center justify-start gap-2 hover:brightness-150">
      <TicketSlash className="size-10 transform fill-primary-foreground text-primary transition-transform duration-500 ease-in-out group-hover:rotate-90" />
      <div>
        <div className="text-xl leading-none font-bold text-primary">SSaaS</div>
        <div className="text-muted-foreground">
          Simulate Support as a Service
        </div>
      </div>
    </div>
  )
}
