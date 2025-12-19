import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { forgotPassword } from "@/api/auth"
import { useState } from "react"
import toast from "react-hot-toast"

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
})

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) })
  
  const [emailSent, setEmailSent] = useState(false)
  const [sentEmail, setSentEmail] = useState("")

  async function onSubmit(values) {
    try {
      const res = await forgotPassword(values.email)

      if (res.error) {
        toast.error(res.error.message || "Failed to send reset email")
        return
      }

      setSentEmail(values.email)
      setEmailSent(true)
      toast.success("Reset email sent! Check your inbox.")
    } catch (error) {
      console.error("Forgot password error:", error)
      toast.error("Something went wrong. Please try again.")
    }
  }

  if (emailSent) {
    return (
      <div className="mx-auto w-full max-w-md py-10">
        <div className="rounded-lg border border-green-200 bg-green-50 p-6">
          <h2 className="text-lg font-semibold text-green-900 mb-3">Email Sent!</h2>
          <p className="text-sm text-green-800 mb-4">
            We've sent a password reset link to <strong>{sentEmail}</strong>. 
            Please check your email and follow the link to reset your password.
          </p>
          <p className="text-xs text-green-700 mb-6">
            If you don't see the email, check your spam folder.
          </p>
          <Link to="/auth/login" className="text-sm text-primary hover:underline font-medium">
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-md py-10">
      <div className="space-y-2 mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Forgot Password?</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>

        <p className="text-sm text-muted-foreground text-center mt-4">
          Remember your password?{" "}
          <Link className="text-primary hover:underline font-medium" to="/auth/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
