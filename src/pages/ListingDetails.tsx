import { useParams, Link } from "react-router-dom";
import { getListingBySlug } from "@/data/listings";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Badge } from "@/components/ui/badge";

const formatAED = (n: number) => new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(n);

const ListingDetails = () => {
  const { slug } = useParams();
  const listing = slug ? getListingBySlug(slug) : undefined;

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="mb-4 text-3xl font-bold">Listing not found</h1>
          <Link to="/cars" className="text-primary underline">Back to search</Link>
        </main>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: listing.title,
    brand: listing.make,
    model: listing.model,
    color: listing.color,
    vehicleTransmission: listing.transmission,
    fuelType: listing.fuel,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: listing.mileage,
      unitCode: "KMT"
    },
    offers: {
      "@type": "Offer",
      price: listing.priceAED,
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
      url: typeof window !== 'undefined' ? window.location.href : ''
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbNavigation />
      <main className="mx-auto max-w-6xl px-4 py-10">
      <SEO
        title={`${listing.make} ${listing.model} ${listing.year} — Motorado`}
        description={listing.description || `${listing.make} ${listing.model} ${listing.year} for sale in ${listing.emirate}.`}
        canonical={`/cars/${listing.slug}`}
        jsonLd={jsonLd}
      />
      <div className="mb-6 flex items-center gap-3">
        {listing.isPremium && <Badge className="bg-primary text-primary-foreground">Premium</Badge>}
        <h1 className="text-3xl font-bold">{listing.title}</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <img src={listing.coverImageUrl} alt={`${listing.title} for sale`} className="w-full rounded-lg border" />
          {/* TODO: Implement gallery thumbnails when backend ready */}
          {/* {listing.images?.map((image, i) => (
            <img key={i} src={image} alt={`${listing.title} for sale - ${i + 1}`} className="w-full rounded-lg border" />
          ))} */}
        </div>
        <div>
          <div className="rounded-lg border p-4">
            <div className="text-2xl font-bold">{formatAED(listing.priceAED)}</div>
            <p className="mt-2 text-muted-foreground">{listing.year} • {listing.emirate}</p>
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <li><span className="text-muted-foreground">Body</span>: {listing.bodyType}</li>
              <li><span className="text-muted-foreground">Fuel</span>: {listing.fuel}</li>
              <li><span className="text-muted-foreground">Transmission</span>: {listing.transmission}</li>
              <li><span className="text-muted-foreground">Mileage</span>: {listing.mileage.toLocaleString()} km</li>
              <li><span className="text-muted-foreground">Color</span>: {listing.color}</li>
              <li><span className="text-muted-foreground">GCC Spec</span>: {listing.gccSpec ? 'Yes' : 'No'}</li>
            </ul>
          </div>

          {listing.description && (
            <div className="prose mt-6 max-w-none">
              <h2 className="mb-2 text-xl font-semibold">Description</h2>
              <p className="text-muted-foreground">{listing.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Link to="/cars" className="text-primary underline">← Back to search</Link>
      </div>
      </main>
    </div>
  );
};

export default ListingDetails;
