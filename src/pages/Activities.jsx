import { useNavigate } from "react-router-dom";
import { Star,Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchSafaris } from "@/api/safari";
import { Button } from "@/components/ui/button";

// Star component
function Stars({ value }) {
  const full = Math.floor(value || 0);
  const half = (value || 0) - full >= 0.5;
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

// Activity Card component
function ActivityCard({ id, image, name, overview, unit, rating, duration,  price, currency }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/activities/${id}`);
  };

  // Format price based on currency
  const formatPrice = (price, currency) => {
    if (!price) return 'N/A';
    if (currency === 'ugx') {
      return `UGX ${price.toLocaleString()}`;
    }
    return `$${price}`;
  };

  // Strip HTML tags from overview
  const cleanOverview = (html) => {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  return (
    <div
      className="group flex flex-col rounded-lg overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold line-clamp-1">{name}</h3>
          <span className="text-sm font-semibold text-primary whitespace-nowrap">
            {formatPrice(price, currency)}
          </span>
        </div>

        {rating && <Stars value={rating} />}

        {overview && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {cleanOverview(overview)}
          </p>
        )}

        {/* {includes && (
          <div className="text-xs">
            <span className="font-semibold">Includes: </span>
            <span className="text-muted-foreground line-clamp-1">{includes}</span>
          </div>
        )}
        {excludes && (
          <div className="text-xs">
            <span className="font-semibold">Excludes: </span>
            <span className="text-muted-foreground line-clamp-1">{excludes}</span>
          </div>
        )} */}
        {duration && (
          <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {duration} {duration === 1 ? "day" : "days"}
            {unit && ` • Per ${unit}`}
          </div>
        )}

        {/* {duration && (
          <div className="mt-auto text-xs text-muted-foreground">
            {duration} {duration === 1 ? "day" : "days"}
            {unit && ` • Per ${unit}`}
          </div>
        )} */}

        <Button
          className="w-full mt-2"
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

// Activities Page
export default function ActivitiesPage() {
  const [safaris, setSafaris] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSafaris().then((data) => {
      setSafaris(data);
      console.log("All safaris:", data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="py-12 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <p className="text-center text-lg">Loading activities...</p>
        </div>
      </section>
    );
  }

  if (!safaris || safaris.length === 0) {
    return (
      <section className="py-12 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <p className="text-center text-lg">No activities available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 text-center">
          <h1 className="mb-4 text-3xl font-bold">All Activities</h1>
          <p className="mb-8 text-muted-foreground">
            Discover and book exciting activities in Ruboni
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {safaris.map((safari) => {
            const attrs = safari.attributes;
            return (
              <ActivityCard
                key={safari.id}
                id={safari.id}
                image={
                  attrs?.image?.data?.attributes?.url ||
                  "https://placehold.co/600x400?text=No+Image"
                }
                name={attrs.safariName}
                overview={attrs.overview}
                includes={attrs.includes}
                excludes={attrs.excludes}
                unit={attrs.unit}
                rating={attrs.rating}
                duration={attrs.duration}
                location={attrs.location}
                price={attrs.overralPrice}
                currency={attrs.currency}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}