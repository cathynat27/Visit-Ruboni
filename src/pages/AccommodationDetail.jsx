import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { accommodationItems } from "@/data/accommodations"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, MapPin, DollarSign } from "lucide-react"

function StarRating({ value }) {
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

export default function AccommodationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const accommodation = accommodationItems.find((item) => item.id === parseInt(id))
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")

  if (!accommodation) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Accommodation not found</h1>
        <Button onClick={() => navigate("/accommodation")}>Back to Accommodations</Button>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % accommodation.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + accommodation.gallery.length) % accommodation.gallery.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/accommodation")}
          className="mb-6"
        >
          ← Back to Accommodations
        </Button>

        {/* Gallery Section */}
        <div className="mb-8">
          <div className="relative w-full h-[500px] overflow-hidden rounded-lg bg-muted mb-4">
            <img
              src={accommodation.gallery[currentImageIndex]}
              alt={`${accommodation.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Gallery Navigation */}
            {accommodation.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {accommodation.gallery.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {accommodation.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentImageIndex ? "border-primary" : "border-border"
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{accommodation.title}</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <StarRating value={accommodation.rating} />
              <span className="text-sm text-muted-foreground">({accommodation.rating})</span>
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold text-primary">
              <DollarSign className="h-5 w-5" />
              {accommodation.price}/night
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              {accommodation.location}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-border mb-8">
          <div className="flex gap-8">
            {["overview", "about", "amenities", "location"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">Welcome to {accommodation.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {accommodation.description}
                </p>
                <p className="text-foreground leading-relaxed">
                  {accommodation.about}
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border h-fit">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">${accommodation.price}</div>
                  <p className="text-sm text-muted-foreground">per night</p>
                </div>
                <Button className="w-full mb-4 bg-primary text-primary-foreground">Book Now</Button>
                <Button variant="outline" className="w-full">Contact Host</Button>
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold mb-4">About This Accommodation</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {accommodation.about}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Why Choose Us?</h3>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>✓ Authentic Ruboni experience</li>
                  <li>✓ Close to nature and adventure activities</li>
                  <li>✓ Friendly and knowledgeable staff</li>
                  <li>✓ Best value for money</li>
                </ul>
              </div>
            </div>
          )}

          {/* Amenities Tab */}
          {activeTab === "amenities" && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold mb-6">Amenities & Facilities</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {accommodation.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg"
                  >
                    <div className="text-primary text-xl">✓</div>
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location Tab */}
          {activeTab === "location" && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold mb-6">Location</h2>
              <div className="mb-6">
                <p className="text-muted-foreground mb-2">Address:</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {accommodation.location}
                </p>
              </div>
              
              {/* Map Placeholder */}
              <div className="w-full h-[400px] bg-gray-200 rounded-lg border border-border flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Interactive map will be displayed here
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Coordinates: {accommodation.coordinates.lat}° N, {accommodation.coordinates.lng}° E
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Getting Here</h3>
                <p className="text-sm text-foreground">
                  Easy access by road. Located in the heart of Ruboni Village with good connectivity to major attractions and hiking trails.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Ready for your Ruboni adventure?</h2>
          <p className="mb-6">Book {accommodation.title} today and experience unforgettable moments</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button className="bg-white text-primary hover:bg-white/90">Book Now</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
