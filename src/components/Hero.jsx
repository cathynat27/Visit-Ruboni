import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "/images/mountain.png",
    title: "Explore Ruboni Village",
    description: "Discover the beauty of Rwenzori foothills, culture, and nature.",
  },
  {
    image: "/images/elephants.png",
    title: "Adventure Awaits",
    description: "Hiking, birding, and breathtaking views for every explorer.",
  },
  {
    image: "/images/zebra.png",
    title: "Stay in Comfort",
    description: "Experience serene accommodation nestled in nature.",
  },
]

export default function Hero() {
  const items = useMemo(() => slides, [])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, 5000)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <section className="relative -mt-16 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="relative h-[87vh] w-full overflow-hidden">
        {items.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-center bg-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            {items[index].title}
          </h1>
          <p className="mt-3 max-w-2xl text-white/90 sm:text-lg">
            {items[index].description}
          </p>
          <div className="mt-6">
            <Button asChild className="bg-primary text-primary-foreground shadow-lg hover:opacity-90">
              <a href="#accommodation">Book your stay</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
