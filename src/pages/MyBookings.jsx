import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/context/useAuth"
import { fetchUserBookings, cancelBooking, confirmBooking, deleteBooking } from "@/api/booking"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Trash2, CheckCircle, XCircle, Clock } from "lucide-react"

export default function MyBookings() {
  const { user, isAuthenticated } = useAuth()
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("all") // all, pending, confirmed, cancelled

  const loadBookings = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await fetchUserBookings(user.id)
      setBookings(data || [])
    } catch (error) {
      console.error("Error loading bookings:", error)
      toast.error("Failed to load bookings")
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (isAuthenticated && user) {
      loadBookings()
    }
  }, [isAuthenticated, user, loadBookings])

  const handleCancelBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return

    try {
      await cancelBooking(bookingId)
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: "cancelled" } : b
      ))
      toast.success("Booking cancelled")
    } catch (error) {
      console.error("Error cancelling booking:", error)
      toast.error("Failed to cancel booking")
    }
  }

  const handleConfirmBooking = async (bookingId) => {
    try {
      await confirmBooking(bookingId)
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: "confirmed" } : b
      ))
      toast.success("Booking confirmed")
    } catch (error) {
      console.error("Error confirming booking:", error)
      toast.error("Failed to confirm booking")
    }
  }

  const handleDeleteBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to delete this booking? This action cannot be undone.")) return

    try {
      await deleteBooking(bookingId)
      setBookings(bookings.filter(b => b.id !== bookingId))
      toast.success("Booking deleted")
    } catch (error) {
      console.error("Error deleting booking:", error)
      toast.error("Failed to delete booking")
    }
  }

  const filteredBookings = bookings.filter(booking => {
    if (filter === "all") return true
    return booking.status === filter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading your bookings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground">Manage and track your bookings</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "pending", "confirmed", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === status
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {filter === status && ` (${filteredBookings.length})`}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground mb-4">No {filter === "all" ? "" : filter} bookings found</p>
          <Button onClick={() => window.location.href = "/accommodation"}>
            Make a Booking
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Booking #{booking.id}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    {booking.totalPrice?.toLocaleString()} UGX
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 py-4 border-y border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Check-in</p>
                  <p className="font-medium">{new Date(booking.checkInDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Check-out</p>
                  <p className="font-medium">{new Date(booking.checkOutDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Guests</p>
                  <p className="font-medium">{booking.numberOfGuests}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Booked On</p>
                  <p className="font-medium">{new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {booking.notes && (
                <div className="mb-4 p-3 bg-secondary rounded-md">
                  <p className="text-sm"><span className="font-medium">Notes:</span> {booking.notes}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 flex-wrap">
                {booking.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleConfirmBooking(booking.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
                {(booking.status === "cancelled" || booking.status === "pending") && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteBooking(booking.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
