import { useEffect, useMemo, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"

const gallery = [
  { src: "/images/mountain.png", alt: "Guided Hike" },
  { src: "/images/zebra.png", alt: "Bird Watching" },
  { src: "/images/elephants.png", alt: "Cultural Tour" },
]

const activities = [
  { name: "Guided Hike", priceUGX: 120000, hours: 4 },
  { name: "Bird Watching", priceUGX: 100000, hours: 3 },
  { name: "Cultural Village Tour", priceUGX: 80000, hours: 2 },
  { name: "Waterfall Visit", priceUGX: 90000, hours: 2 },
]

function Dots({ count, index, onSelect }) {
  return (
    <div className="mt-3 flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={[
            "h-2.5 w-2.5 rounded-full border border-primary/40 transition",
            i === index ? "bg-primary" : "bg-primary/10 hover:bg-primary/30",
          ].join(" ")}
        />
      ))}
    </div>
  )
}

export default function ActivitiesSection() {
  const pics = useMemo(() => gallery, [])
  const [index, setIndex] = useState(0)
  const timer = useRef(0)

  useEffect(() => {
    // auto-swiper
    // @ts-ignore
    timer.current = setInterval(() => setIndex((i) => (i + 1) % pics.length), 4500)
    return () => clearInterval(timer.current)
  }, [pics.length])

  return (
    <section id="activities" className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-semibold">Activities</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left: Swiper */}
          <div className="flex flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              {pics.map((p, i) => (
                <img
                  key={i}
                  src={p.src}
                  alt={p.alt}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
            <Dots count={pics.length} index={index} onSelect={setIndex} />
          </div>

          {/* Right: List */}
          <div className="flex flex-col rounded-lg border border-border bg-card p-4 text-card-foreground">
            <ul className="divide-y divide-border">
              {activities.map((a) => (
                <li key={a.name} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-medium">{a.name}</p>
                    <p className="text-sm text-muted-foreground">UGX {a.priceUGX.toLocaleString()}</p>
                  </div>
                  <Badge variant="secondary">{a.hours} hrs</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
