import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { createBooking, fetchBookingById } from "@/api/booking"
import { useAuth } from "@/context/useAuth"
import toast from "react-hot-toast"

const bookingSchema = z.object({
  checkInDate: z.string().min(1, "Check-in date is required"),
  checkOutDate: z.string().min(1, "Check-out date is required"),
  numberOfGuests: z.coerce.number().int().min(1, "At least 1 guest required"),
  accommodationId: z.string().optional(),
  activityId: z.string().optional(),
  notes: z.string().optional(),
  totalPrice: z.coerce.number().positive("Price must be positive"),
}).refine((data) => new Date(data.checkOutDate) > new Date(data.checkInDate), {
  message: "Check-out date must be after check-in date",
  path: ["checkOutDate"],
})

export default function BookingForm({ title = "Make a Booking", onSubmit, accommodationId, activityId }) {
  const { user, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingId, setBookingId] = useState(null)

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({ 
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      accommodationId: accommodationId || "",
      activityId: activityId || "",
    }
  })

  const checkInDate = watch("checkInDate")
  const checkOutDate = watch("checkOutDate")

  // Calculate number of nights
  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate)
      const checkOut = new Date(checkOutDate)
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      return nights > 0 ? nights : 0
    }
    return 0
  }

  const nights = calculateNights()

  const submit = async (values) => {
    if (!isAuthenticated || !user) {
      toast.error("Please login to make a booking")
      return
    }

    setIsLoading(true)
    try {
      const bookingData = {
        checkInDate: values.checkInDate,
        checkOutDate: values.checkOutDate,
        numberOfGuests: values.numberOfGuests,
        totalPrice: values.totalPrice,
        status: "pending",
        accommodationId: values.accommodationId || null,
        activityId: values.activityId || null,
        notes: values.notes || "",
        userId: user.id,
      }

      const result = await createBooking(bookingData)
      setBookingId(result.id)
      setBookingSuccess(true)
      
      toast.success("Booking created successfully!")
      
      if (onSubmit) {
        onSubmit(result)
      }

      // Reset form after 2 seconds
      setTimeout(() => {
        reset()
        setBookingSuccess(false)
      }, 2000)
    } catch (error) {
      console.error("Booking error:", error)
      toast.error(error.message || "Failed to create booking")
    } finally {
      setIsLoading(false)
    }
  }

  if (bookingSuccess) {
    return (
      <div className="mx-auto max-w-xl rounded-lg border border-green-200 bg-green-50 p-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-green-900 mb-2">Booking Confirmed!</h2>
          <p className="text-sm text-green-800 mb-4">
            Your booking has been created successfully. 
            <br />
            Booking ID: <span className="font-mono font-bold">{bookingId}</span>
          </p>
          <p className="text-xs text-green-700">
            You will receive a confirmation email shortly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl rounded-lg border border-border bg-card p-6">
      <h2 className="mb-1 text-xl font-semibold">{title}</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        {isAuthenticated ? `Booking for ${user?.name || user?.email}` : "Please login to make a booking"}
      </p>

      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Check-in Date</label>
          <input 
            type="date" 
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring/50" 
            {...register("checkInDate")} 
          />
          {errors.checkInDate && <p className="mt-1 text-xs text-destructive">{errors.checkInDate.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Check-out Date</label>
          <input 
            type="date" 
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring/50" 
            {...register("checkOutDate")} 
          />
          {errors.checkOutDate && <p className="mt-1 text-xs text-destructive">{errors.checkOutDate.message}</p>}
        </div>

        {nights > 0 && (
          <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
            Duration: <span className="font-semibold">{nights} night{nights !== 1 ? 's' : ''}</span>
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">Number of Guests</label>
          <input 
            type="number" 
            min={1} 
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring/50" 
            {...register("numberOfGuests")} 
          />
          {errors.numberOfGuests && <p className="mt-1 text-xs text-destructive">{errors.numberOfGuests.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Total Price (UGX)</label>
          <input 
            type="number" 
            step="0.01"
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring/50" 
            {...register("totalPrice")} 
            placeholder="0.00"
          />
          {errors.totalPrice && <p className="mt-1 text-xs text-destructive">{errors.totalPrice.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Additional Notes (Optional)</label>
          <textarea 
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring/50" 
            rows="3"
            {...register("notes")} 
            placeholder="Any special requests or requirements..."
          />
        </div>

        <div className="pt-2 flex justify-center">
          <button 
            type="submit"
            disabled={isSubmitting || isLoading || !isAuthenticated}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting || isLoading ? "Processing..." : "Complete Booking"}
          </button>
        </div>
      </form>
    </div>
  )
}
