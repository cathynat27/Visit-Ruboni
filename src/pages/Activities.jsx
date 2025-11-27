import { useNavigate } from "react-router-dom"
import { Star } from "lucide-react"
import { activityItems } from "@/data/activities"

function Stars({ value }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-500" />
      ))}
      {half && <Star className="h-4 w-4 fill-yellow-500/70" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4" />
      ))}
    </div>
  )
}

export default function Activities() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Activities</h1>
          <p className="text-muted-foreground">
            Discover and book exciting activities in Ruboni
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {activityItems.map((activity) => (
            <div
              key={activity.id}
              onClick={() => navigate(`/activities/${activity.id}`)}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {activity.difficulty}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold">{activity.title}</h3>
                  <span className="text-sm font-semibold text-primary">${activity.price}</span>
                </div>
                <Stars value={activity.rating} />
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {activity.description}
                </p>
                <div className="mt-auto text-xs text-muted-foreground">
                  {activity.duration} • {activity.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
