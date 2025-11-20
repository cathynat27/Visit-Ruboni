"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type CarouselCtx = {
  scrollRef: React.RefObject<HTMLDivElement>
}

const CarouselContext = React.createContext<CarouselCtx | null>(null)

export function Carousel({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  return (
    <CarouselContext.Provider value={{ scrollRef }}>
      <div className={cn("relative", className)}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

export function CarouselContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const ctx = React.useContext(CarouselContext)
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        ref={ctx?.scrollRef as React.RefObject<HTMLDivElement>}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {React.Children.map(children, (child) => (
          <div className="min-w-full snap-start">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

export function CarouselItem({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full", className)}>
      {children}
    </div>
  )
}

export function CarouselPrevious({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(CarouselContext)
  const onClick = React.useCallback(() => {
    const el = ctx?.scrollRef.current
    if (!el) return
    el.scrollBy({ left: -el.clientWidth, behavior: "smooth" })
  }, [ctx])
  return (
    <button
      type="button"
      aria-label="Previous"
      onClick={onClick}
      className={cn("absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur hover:bg-black/60", className)}
      {...props}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
    </button>
  )
}

export function CarouselNext({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(CarouselContext)
  const onClick = React.useCallback(() => {
    const el = ctx?.scrollRef.current
    if (!el) return
    el.scrollBy({ left: el.clientWidth, behavior: "smooth" })
  }, [ctx])
  return (
    <button
      type="button"
      aria-label="Next"
      onClick={onClick}
      className={cn("absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur hover:bg-black/60", className)}
      {...props}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
    </button>
  )
}
