import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { fetchLodgeById } from "@/api/lodges";

function StarRating({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
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
  );
}

export default function AccommodationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lodge, setLodge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchLodgeById(id).then((data) => {
      console.log("Single lodge:", data);
      setLodge(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!lodge) return <p>Not found</p>;

  const info = lodge.attributes;
  const rooms = info.Rooms || [];

  const coverImage = info.photo?.data?.attributes?.url
    ? `https://cms.visitruboni.com${info.photo.data.attributes.url}`
    : null;

  const gallery =
    info.photos?.data?.map(
      (img) => `https://cms.visitruboni.com${img.attributes.url}`
    ) || [];

  const images = gallery.length > 0 ? gallery : coverImage ? [coverImage] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/accommodation")}
          className="mb-6"
        >
          Back to Accommodations
        </Button>

        {/* Gallery */}
        <div className="mb-8">
          <div className="relative w-full h-[500px] overflow-hidden rounded-lg bg-muted mb-4">
            <img
              src={images[currentImageIndex]}
              alt={`${info.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  idx === currentImageIndex ? "border-primary" : "border-border"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col max-w-6xl mx-auto lg:flex-row lg:gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{info.name}</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <StarRating value={info.rating || 4} />
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                {info.location}, {info.district} ,{info.region}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-border mb-8">
          <div className="flex gap-8">
            {["overview", "amenities", "location"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-semibold capitalize ${
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

        {/* Overview */}
        {activeTab === "overview" && rooms.length > 0 && (
          <div className="mb-12 max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">Room Type</h2>

            <div className="space-y-4">
              {rooms.map((room) => (
                <div key={room.id}>
                  <p className="text-lg font-bold">{room.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Type: <span className="font-semibold">{room.type}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Occupancy:{" "}
                    <span className="font-semibold">
                      {room.occupancy} guests
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Price:{" "}
                    <span className="font-bold text-primary">
                      {room.currency?.toUpperCase()}{" "}
                      {room.price?.toLocaleString()}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        {activeTab === "amenities" && (
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl font-semibold mb-6">Amenities</h2>
            <p>{info.services}</p>
          </div>
        )}

        {/* Location */}
        {activeTab === "location" && (
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl font-semibold mb-6">Location</h2>
            <p className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {info.location},{info.district} {info.region}
            </p>
          </div>
        )}

        {/* Booking CTA */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Ready for your Ruboni adventure?
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => navigate("/Booking")}
              className="bg-white text-primary hover:bg-white/90"
            >
              Book Now
            </Button>
            <Button className="bg-white text-primary hover:bg-white/90">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
