// import { Button } from "@/components/ui/button"
// import { Star } from "lucide-react"

// const items = [
//   {
//     image: "/images/room1.jpg",
//     title: "Forest View Cottage",
//     description: "Cozy cottage with stunning forest views and modern amenities.",
//     rating: 4.8,
//   },
//   {
//     image: "/images/room2.jpg",
//     title: "Mountain Lodge",
//     description: "Rustic lodge near trails, perfect for adventurers.",
//     rating: 4.6,
//   },
//   {
//     image: "/images/room3.jpg",
//     title: "Riverside Retreat",
//     description: "Peaceful retreat by the river for a serene getaway.",
//     rating: 4.7,
//   },
//   {
//     image: "/images/room4.jpg",
//     title: "Family Suite",
//     description: "Spacious suite ideal for families and groups.",
//     rating: 4.5,
//   },
// ]

// function Stars({ value }) {
//   const full = Math.floor(value)
//   const half = value - full >= 0.5
//   const empty = 5 - full - (half ? 1 : 0)
//   return (
//     <div className="flex items-center gap-1 text-yellow-500">
//       {Array.from({ length: full }).map((_, i) => (
//         <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-500" />
//       ))}
//       {half && <Star className="h-4 w-4 fill-yellow-500/70" />}
//       {Array.from({ length: empty }).map((_, i) => (
//         <Star key={`empty-${i}`} className="h-4 w-4" />
//       ))}
//     </div>
//   )
// }

// function Card({ image, title, description, rating }) {
//   return (
//     <div className="group flex w-72 shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
//       <div className="relative aspect-[4/3] w-full overflow-hidden">
//         <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
//       </div>
//       <div className="flex flex-1 flex-col gap-3 p-4">
//         <div className="flex items-start justify-between gap-2">
//           <h3 className="text-base font-semibold">{title}</h3>
          
//         </div>
//         <Stars value={rating} />
//         <p className="text-sm text-muted-foreground">
//           {description}
//         </p>
//         <div className="mt-auto">
//           <Button className="w-full">View details</Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function Products() {
//   return (
//     <section id="accommodation" className="py-5">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="mb-6 text-2xl text-center font-semibold">Accommodation</h2>
//         <div className="-mx-4 flex gap-4 overflow-x-auto px-4 py-2">
//           {items.map((it) => (
//             <Card key={it.title} {...it} />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
