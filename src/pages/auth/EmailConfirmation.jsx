import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { emailConfirmation } from "@/api/auth"
import toast from "react-hot-toast"

export default function EmailConfirmation() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState("loading") // loading, success, error
  const [message, setMessage] = useState("")

  useEffect(() => {
    const confirmEmail = async () => {
      const confirmationToken = searchParams.get("confirmation")

      if (!confirmationToken) {
        setStatus("error")
        setMessage("No confirmation token provided")
        return
      }

      try {
        const res = await emailConfirmation(confirmationToken)

        if (res.error) {
          setStatus("error")
          setMessage(res.error.message || "Failed to confirm email")
          toast.error("Email confirmation failed")
          return
        }

        setStatus("success")
        setMessage("Your email has been confirmed successfully!")
        toast.success("Email confirmed!")
      } catch (error) {
        console.error("Email confirmation error:", error)
        setStatus("error")
        setMessage("Something went wrong. Please try again.")
        toast.error("Email confirmation error")
      }
    }

    confirmEmail()
  }, [searchParams])

  if (status === "loading") {
    return (
      <div className="mx-auto w-full max-w-md py-10 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-sm text-muted-foreground">Confirming your email...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-md py-10">
      {status === "success" ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-green-900 mb-2 text-center">Email Confirmed!</h2>
          <p className="text-sm text-green-800 mb-6 text-center">
            {message}
          </p>
          <Link 
            to="/auth/login" 
            className="block text-center text-sm text-primary hover:underline font-medium"
          >
            Go to Login
          </Link>
        </div>
      ) : (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-red-900 mb-2 text-center">Confirmation Failed</h2>
          <p className="text-sm text-red-800 mb-6 text-center">
            {message}
          </p>
          <Link 
            to="/auth/signup" 
            className="block text-center text-sm text-primary hover:underline font-medium"
          >
            Back to Sign Up
          </Link>
        </div>
      )}
    </div>
  )
}
