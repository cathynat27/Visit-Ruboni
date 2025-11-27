import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  location: z.string().min(2, "Location is required"),
  people: z.coerce.number().int().min(1, "At least 1 person"),
})

export default function BookingForm({ title = "Booking", onSubmit }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const submit = (values) => {
    if (onSubmit) onSubmit(values)
    // For now just log. In production integrate API here
    console.log("booking:", values)
  }

  return (
    <div className="mx-auto max-w-xl rounded-lg border border-border bg-card p-6">
      <h2 className="mb-1 text-xl font-semibold">{title}</h2>
      <p className="mb-6 text-sm text-muted-foreground">Please provide the following</p>

      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Full name</label>
          <input className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring/50" {...register("fullName")} placeholder="John Doe" />
          {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input type="email" className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring/50" {...register("email")} placeholder="john@example.com" />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Location</label>
          <input className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring/50" {...register("location")} placeholder="Kampala" />
          {errors.location && <p className="mt-1 text-xs text-destructive">{errors.location.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Number of people</label>
          <input type="number" min={1} className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring/50" {...register("people")} placeholder="1" />
          {errors.people && <p className="mt-1 text-xs text-destructive">{errors.people.message}</p>}
        </div>
        <div className="pt-2 flex justify-center">
          <button disabled={isSubmitting} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60">Continue</button>
        </div>
      </form>
    </div>
  )
}
