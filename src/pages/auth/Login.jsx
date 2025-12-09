import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {loginUser} from "@/api/auth"
import { useNavigate } from "react-router-dom"

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })
  const navigate = useNavigate();

  async function onSubmit(values) {
    const res = await loginUser(values);

    if(res.errors){
      alert(res.error.message);
      return;
    }
     // Save user + token
    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.jwt);

     alert("Logged in successfully!");
    navigate("/");

    // Replace with your auth flow
    //console.log("Login submit", values)
    //alert("Logged in (demo)")
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
      

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
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
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="••••••••"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
        <p className="text-sm text-muted-foreground mt-1">
        Don't have an account? {" "}
        <Link className="text-primary hover:underline" to="/auth/signup">Sign up</Link>
      </p>
      </form>
    </div>
  )
}
