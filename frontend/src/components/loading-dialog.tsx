import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { Spinner } from "./ui/spinner"

export type LoadingDialogProps = {
  open: boolean
  message?: string
}

export function LoadingDialog({
  className,
  open,
  message = "Processing request",
  ...props
}: React.ComponentProps<"div"> & LoadingDialogProps) {
  return (
    <div className={className} {...props}>
      <AlertDialog open={open}>
        <AlertDialogContent className="flex flex-col items-center justify-center">
          <AlertDialogTitle>Loading</AlertDialogTitle>
          <Spinner className="size-10 text-muted-foreground" />
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
