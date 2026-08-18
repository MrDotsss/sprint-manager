import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { signupSchema, type SignupDTO } from "@/features/auth/auth.validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { authClient } from "@/lib/auth"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { avatarTypes, getAvatarUrl } from "@/features/auth/avatar"
import { useDebounce } from "@/lib/hooks"
import { loading } from "@/stores/global-loading.store"
import { PasswordInput } from "@/components/password-input"

export const Route = createFileRoute("/_auth/signup")({
  component: SignupPage,
})

function SignupPage({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<SignupDTO>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "adventurer",
    },
  })

  const debouncedUsername = useDebounce<string>(getValues("username"), 500)

  const onSignup = async (data: SignupDTO) => {
    loading.start("Creating an account.")
    const { error } = await authClient.signUp.email({
      name: data.username,
      email: data.email,
      password: data.password,
      image: data.image,
    })

    loading.stop()

    if (error) {
      setError("root", error)
      return
    }

    throw navigate({ to: "/profile", replace: true })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="signup-form" onSubmit={handleSubmit(onSignup)}>
            <FieldGroup>
              <Controller
                name="image"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex items-center gap-4">
                    <img
                      className="aspect-square w-1/2 rounded-2xl border bg-muted object-cover"
                      src={getAvatarUrl(debouncedUsername, field.value, false)}
                      alt="Avatar Image"
                    />
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Select Avatar
                      </FieldLabel>
                      <Select
                        id={field.name}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        items={avatarTypes}
                      >
                        <SelectTrigger className="w-full max-w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={false}>
                          <SelectGroup>
                            <SelectLabel>Styles</SelectLabel>
                            {avatarTypes.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                )}
              />
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="MrDots"
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <PasswordInput
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                      required
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Must be at least 8 characters long.
                      </FieldDescription>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>
                    <PasswordInput
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {errors.root && <FieldError errors={[errors.root]} />}
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
