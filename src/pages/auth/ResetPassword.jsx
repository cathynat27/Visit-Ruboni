import { useParams, useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { resetPassword } from "@/api/auth"
import toast from "react-hot-toast"

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  passwordConfirmation: z.string().min(6, "Password confirmation is required"),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords don't match",
  path: ["passwordConfirmation"],
})

export default function ResetPassword() {
  const { code } = useParams()
  const navigate = useNavigate()
  const isValidCode = !!code

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) })

  async function onSubmit(values) {
    try {
      const res = await resetPassword({
        code,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
      })

      if (res.error) {
        toast.error(res.error.message || "Failed to reset password")
        return
      }

      toast.success("Password reset successfully! Redirecting to login...")
      setTimeout(() => navigate("/auth/login"), 2000)
    } catch (error) {
      console.error("Reset password error:", error)
      toast.error("Something went wrong. Please try again.")
    }
  }

  if (!isValidCode) {
    return (
      <div className="mx-auto w-full max-w-md py-10">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-900 mb-3">Invalid Reset Link</h2>
          <p className="text-sm text-red-800 mb-6">
            The reset link is invalid or has expired. Please request a new one.
          </p>
          <Link 
            to="/auth/forgot-password" 
            className="inline-block text-sm text-primary hover:underline font-medium"
          >
            Request New Reset Link
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-md py-10">
      <div className="space-y-2 mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Reset Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            Confirm Password
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
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </Button>

        <p className="text-sm text-muted-foreground text-center mt-4">
          <Link className="text-primary hover:underline font-medium" to="/auth/login">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  )
}
