import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight, Clock } from "lucide-react"
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

function Card({ id, image, title, description, rating, price, duration, difficulty }) {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/activities/${id}`)
  }

  return (
    <div
      className="group flex w-72 shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {difficulty}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold">{title}</h3>
          <span className="text-sm font-semibold text-primary">${price}</span>
        </div>
        <Stars value={rating} />
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {duration}
        </div>

        <div className="mt-auto">
          <Button className="w-full" onClick={(e) => {
            e.stopPropagation()
            handleViewDetails()
          }}>
            View details
          </Button>
        </div>
      </div>
    </div>
  )
}

function SeeAllCard() {
  return (
    <Link to="/activities">
      <div className="flex w-72 shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm h-full cursor-pointer hover:shadow-md transition-shadow">
        <div className="flex flex-1 flex-col gap-4 p-6 items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">View All Activities</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Explore all exciting activities in Ruboni
            </p>
          </div>
          <div className="flex items-center gap-2 text-primary font-semibold">
            See All
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function ActivitiesSection() {
  return (
    <section id="activities" className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl text-center font-semibold">Activities</h2>
        <p className="mb-8 text-center text-muted-foreground max-w-2xl mx-auto">
          Experience thrilling adventures and unforgettable experiences in Ruboni
        </p>
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 py-2">
          {activityItems.slice(0, 4).map((activity) => (
            <Card key={activity.id} {...activity} />
          ))}
          <SeeAllCard />
        </div>
      </div>
    </section>
  )
}
