import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { accommodationItems } from "@/data/accommodations"
import { useNavigate } from "react-router-dom"

const items = accommodationItems

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

function Card({ id, image, title, description, rating, price }) {
  const navigate = useNavigate()
  
  const handleViewDetails = () => {
    navigate(`/accommodation/${id}`)
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={handleViewDetails}>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold">{title}</h3>
        </div>
        <Stars value={rating} />
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
          <span className="text-sm font-semibold text-primary">${price}</span>
        </div>
        <div className="mt-auto">
          <Button className="w-full" onClick={(e) => {
            e.stopPropagation()
            handleViewDetails()
          }}>View details</Button>
        </div>
      </div>
    </div>
  )
}

export default function AccommodationPage() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold">All Accommodations</h1>
        <p className="mb-8 text-muted-foreground">
          Explore our complete selection of rooms and suites nestled in the beauty of Ruboni
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <Card key={it.title} {...it} />
          ))}
        </div>
      </div>
    </section>
  )
}
