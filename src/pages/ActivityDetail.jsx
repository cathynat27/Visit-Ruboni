import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, MapPin, Clock, Check, DollarSign } from "lucide-react"
import { fetchSafarisById } from "@/api/safari"

function Stars({ value }) {
  const full = Math.floor(value || 0)
  const half = (value || 0) - full >= 0.5
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

export default function ActivityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")
  const [safari, setSafari] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSafarisById(id).then((data) => {
      console.log("Single safari:", data)
      setSafari(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <p className="text-center py-10">Loading...</p>
  if (!safari) return <p className="text-center py-10">Activity not found</p>

  // Extract attributes from the API response
  const attrs = safari.attributes || safari

  // Format price based on currency
  const formatPrice = (price, currency) => {
    if (!price) return 'N/A'
    if (currency === 'ugx') {
      return `UGX ${price.toLocaleString()}`
    }
    return `$${price}`
  }

  // Strip HTML tags from text
  const cleanHTML = (html) => {
    if (!html) return ''
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  // Get gallery images (use placeholder if not available)
  const gallery = attrs.image?.data 
    ? [attrs.image.data.attributes?.url || "https://placehold.co/800x600?text=No+Image"]
    : ["https://placehold.co/800x600?text=No+Image"]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/activities")}
          className="mb-6"
        >
          Back to Activities
        </Button>

        {/* Gallery */}
        <div className="mb-8">
          <div className="relative w-full h-[500px] overflow-hidden rounded-lg bg-muted mb-4">
            <img
            src="/images/hiking.png"
              src={gallery[currentImageIndex]}
              alt={`${attrs.safariName} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Gallery Navigation */}
            {gallery.length > 1 && (
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
                  {currentImageIndex + 1} / {gallery.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{attrs.safariName}</h1>
          <div className="flex items-center gap-6 flex-wrap">
            

            {/* Rating */}
            {attrs.rating && (
              <div className="flex items-center gap-2">
                <Stars value={attrs.rating} />
                <span className="text-sm text-muted-foreground">
                  ({attrs.rating})
                </span>
              </div>
            )}

            {/* Price - NO ICON */}
            <div className="text-lg font-semibold text-primary">
              {formatPrice(attrs.overralPrice, attrs.currency)}
              {attrs.unit && <span className="text-sm font-normal text-muted-foreground"> / {attrs.unit}</span>}
            </div>

            {/* Location */}
            {attrs.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                {attrs.location}
              </div>
            )}
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-border mb-8">
          <div className="flex gap-8">
            {["overview", "Intenary", "Reviews","FAQ"].map((tab) => (
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
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">
                  About {attrs.safariName}
                </h2>
                <div className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {cleanHTML(attrs.overview)}
                </div>

                <div className="flex justify-between gap-4 mb-6">
                  {/* Duration */}
            <div className="flex gap-2  bg-slate-100 p-6 rounded-lg flex-1 justify-center">
              <Clock className="h-5 w-5" />
              <span>{attrs.duration} {attrs.duration === 1 ? 'Day' : 'Days'}</span>
            </div>
                  {/* Duration Card
                  <div className="bg-slate-100 p-6 rounded-lg flex-1 text-center">
                    <Clock className="text-primary h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold text-lg">{attrs.duration} {attrs.duration === 1 ? 'Day' : 'Days'}</p>
                    <p className="text-sm text-muted-foreground">Duration</p>
                  </div> */}

                  {/* Rate Card */}
                  <div className="bg-slate-100 p-6 gap-2 rounded-lg flex  flex-1 justify-center">
                    <Star className="h-6 w-5" />
                    {/* <p className="font-semibold text-lg">{formatPrice(attrs.overralPrice, attrs.currency)}</p> */}
                    <p className="text-sm text-muted-foreground">4 out of 5</p>
                  </div>
                </div>

                {attrs.includes && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Check className="text-green-600" /> What's Included
                    </h3>
                    <p className="text-muted-foreground">{attrs.includes}</p>
                  </div>
                )}

                {attrs.excludes && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Not Included</h3>
                    <p className="text-muted-foreground">{attrs.excludes}</p>
                  </div>
                )}
              </div>

              {/* Booking Card */}
              <div className="bg-card p-6 rounded-lg border border-border h-fit sticky top-4">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatPrice(attrs.overralPrice, attrs.currency)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {attrs.unit ? `per ${attrs.unit}` : 'per booking'}
                  </p>
                </div>
                <Button 
                  className="w-full mb-4 bg-primary text-primary-foreground"
                  onClick={() => navigate("/booking")}
                >
                  Book Now
                </Button>
                <Button variant="outline" className="w-full">Contact Us</Button>
              </div>
            </div>
          )}

          {/* Details */}
          {activeTab === "details" && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold mb-6">Activity Details</h2>
              
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Duration & Timing</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>{attrs.duration} {attrs.duration === 1 ? 'Day' : 'Days'}</span>
                  </div>
                </div>

                {attrs.location && (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4">Location</h3>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>{attrs.location}</span>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3">Why Choose This Activity?</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Authentic Ruboni experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Expert guides and support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Unforgettable memories</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Best value for money</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Includes/Excludes */}
          {activeTab === "includes" && (
            <div className="max-w-3xl">
              {attrs.includes && (
                <>
                  <h2 className="text-2xl font-semibold mb-6">What's Included</h2>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-foreground whitespace-pre-line">{attrs.includes}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {attrs.excludes && (
                <>
                  <h2 className="text-2xl font-semibold mb-6">What's Not Included</h2>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <span className="text-orange-600 text-2xl font-bold flex-shrink-0">✕</span>
                      <div>
                        <p className="text-foreground whitespace-pre-line">{attrs.excludes}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Ready for your Ruboni adventure?
          </h2>
          <p className="mb-6">
            Book {attrs.safariName} today and experience unforgettable moments
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => navigate("/booking")}
              className="bg-white text-primary hover:bg-white/90"
            >
              Book Now
            </Button>
            <Button
            
              className="bg-white text-primary hover:bg-white/90"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}