import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchLodges } from "@/api/lodges";

function Stars({ value }) {
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

function Card({ id, image, title, description, location }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/accommodation/${id}`);
  };

  return (
    <div
      className="group flex flex-col rounded-lg overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow p-4 space-y-3">
        <div className="flex flex-col space-y-1">
          <h3 className="text-base font-semibold line-clamp-1">{title}</h3>

          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">
          {description}
        </p>

        <Button
          className="w-full mt-auto"
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
        >
          View details
        </Button>
      </div>
    </div>
  );
}

export default function AccommodationPage() {
  const [lodges, setLodges] = useState([]);
  const [loading, setLoading] = useState(true);

  const STRAPI_URL = "https://cms.visitruboni.com"; // MEDIA DOMAIN

  useEffect(() => {
    fetchLodges().then((data) => {
      console.log("All lodges:", data);
      setLodges(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6">
          <h1 className="mb-4 text-4xl text-center font-bold">
            All Accommodations
          </h1>
          <p className="mb-8 text-muted-foreground text-center">
            Explore our complete selection of rooms and suites nestled in the
            beauty of Ruboni
          </p>
        </div>

        <div className="grid gap-6 pt-4 md:grid-cols-2 lg:grid-cols-4">
          {lodges.map((item) => {
            const lodge = item.attributes;

            // FULL MEDIA URL FIX
            const mainPhoto = lodge.photo?.data?.attributes?.url
              ? STRAPI_URL + lodge.photo.data.attributes.url
              : "https://placehold.co/600x400?text=No+Image";

            return (
              <Card
                key={item.id}
                id={item.id}
                title={lodge.name}
                description={lodge.services}
                location={lodge.location}
                image={mainPhoto}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
