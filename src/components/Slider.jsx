import { useEffect, useRef, useState } from "react"

export default function Swiper({ children }) {
  const scrollRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)

  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return

    // Calculate total number of slides
    const timer = setTimeout(() => {
      const childCount = scrollEl.children.length
      setTotalSlides(childCount)
    }, 0)

    const handleScroll = () => {
      if (!scrollEl) return
      const { scrollLeft } = scrollEl
      // Calculate which card is currently in view
      const cardWidth = 288 + 16 
      const index = Math.round(scrollLeft / cardWidth)
      setCurrentIndex(index)
    }

    scrollEl.addEventListener("scroll", handleScroll)

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const scrollToSlide = (index) => {
    if (!scrollRef.current) return
    const cardWidth = 288 + 16 
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth"
    })
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {children}
      </div>

      {/* Dot scrollbar*/}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-blue-600 scale-125" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}