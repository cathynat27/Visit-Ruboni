import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { changePassword } from "@/api/auth"
import { useAuth } from "@/context/useAuth"
import toast from "react-hot-toast"
import { useState } from "react"

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  password: z.string().min(6, "New password must be at least 6 characters"),
  passwordConfirmation: z.string().min(6, "Password confirmation is required"),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "New passwords don't match",
  path: ["passwordConfirmation"],
}).refine((data) => data.password !== data.currentPassword, {
  message: "New password must be different from current password",
  path: ["password"],
})

export default function ChangePassword() {
  const { isAuthenticated } = useAuth()
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(changePasswordSchema) })

  if (!isAuthenticated) {
    return (
      <div className="mx-auto w-full max-w-md py-10">
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
          <h2 className="text-lg font-semibold text-yellow-900 mb-3">Login Required</h2>
          <p className="text-sm text-yellow-800 mb-6">
            You must be logged in to change your password.
          </p>
          <Link 
            to="/auth/login" 
            className="inline-block text-sm text-primary hover:underline font-medium"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  async function onSubmit(values) {
    try {
      const res = await changePassword({
        currentPassword: values.currentPassword,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
      })

      if (res.error) {
        toast.error(res.error.message || "Failed to change password")
        return
      }

      toast.success("Password changed successfully!")
      reset()
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error("Change password error:", error)
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="mx-auto w-full max-w-md py-10">
      <div className="space-y-2 mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Change Password</h1>
        <p className="text-sm text-muted-foreground">
          Update your password to keep your account secure.
        </p>
      </div>

      {isSuccess && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 mb-6">
          <p className="text-sm text-green-800 font-medium">
            ✓ Password changed successfully!
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="currentPassword" className="text-sm font-medium">
            Current Password
          </label>
          <input
            id="currentPassword"
            type="password"
            autoComplete="current-password"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="••••••••"
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <p className="text-xs text-destructive">{errors.currentPassword.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">New Password</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="••••••••"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="passwordConfirmation" className="text-sm font-medium">
            Confirm New Password
          </label>
          <input
            id="passwordConfirmation"
            type="password"
            autoComplete="new-password"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="••••••••"
            {...register("passwordConfirmation")}
          />
          {errors.passwordConfirmation && (
            <p className="text-xs text-destructive">{errors.passwordConfirmation.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </form>

      <p className="text-sm text-muted-foreground text-center mt-6">
        <Link className="text-primary hover:underline font-medium" to="/">
          Back to Home
        </Link>
      </p>
    </div>
  )
}
