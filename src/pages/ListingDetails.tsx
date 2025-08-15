import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

interface Listing {
  id: string;
  make: string;
  model: string;
  make_name?: string;
  model_name?: string;
  trim?: string;
  year: number;
  price_aed: number;
  mileage_km: number;
  body_type: string;
  regional_spec: string;
  emirate: string;
  description?: string;
  is_premium?: boolean;
  contact_phone_country_code?: string;
  contact_phone_number?: string;
  contact_phone_has_whatsapp?: boolean;
  images?: string[];
  slug: string;
  is_published: boolean;
  fuel_type?: string;
  exterior_color?: string;
  interior_color?: string;
  transmission?: string;
  horsepower?: string;
  doors?: string;
  warranty?: string;
  steering_side?: string;
  insured_in_uae?: string;
}

const formatAED = (n: number) => new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(n);

const ListingDetails = () => {
  const { slug } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchListing();
    }
  }, [slug]);

  const fetchListing = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) {
        console.error('Error fetching listing:', error);
        return;
      }

      // Fetch make and model names separately
      const [makeData, modelData] = await Promise.all([
        supabase.from('makes').select('name').eq('id', data.make).single(),
        supabase.from('models').select('name').eq('id', data.model).single()
      ]);

      // Add make and model names to the listing object
      const listingWithNames = {
        ...data,
        make_name: makeData.data?.name || data.make,
        model_name: modelData.data?.name || data.model
      };

      setListing(listingWithNames);
    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    );
  }

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
    name: `${listing.year} ${listing.make_name || listing.make} ${listing.model_name || listing.model}`,
    brand: listing.make_name || listing.make,
    model: listing.model_name || listing.model,
    vehicleTransmission: "Unknown",
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: listing.mileage_km,
      unitCode: "KMT"
    },
    offers: {
      "@type": "Offer",
      price: listing.price_aed,
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
          title={`${listing.make_name || listing.make} ${listing.model_name || listing.model} ${listing.year} — Motorado`}
          description={listing.description || `${listing.make_name || listing.make} ${listing.model_name || listing.model} ${listing.year} for sale in ${listing.emirate}.`}
          canonical={`/cars/${listing.slug}`}
          jsonLd={jsonLd}
        />
        
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {listing.is_premium && <Badge className="bg-primary text-primary-foreground">Premium</Badge>}
              <h1 className="text-3xl font-bold">
                {listing.make_name || listing.make} - {listing.model_name || listing.model}
                {listing.trim && ` ${listing.trim}`}
              </h1>
            </div>
            <div className="text-2xl font-bold">{formatAED(listing.price_aed)}</div>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            {listing.year}, {listing.mileage_km.toLocaleString()} km, {listing.regional_spec}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-3">
            {/* Use placeholder image if no images are available */}
            <img 
              src={listing.images?.[0] || "/placeholder.svg"} 
              alt={`${listing.year} ${listing.make_name || listing.make} ${listing.model_name || listing.model} for sale`} 
              className="w-full rounded-lg border" 
            />
            {/* TODO: Implement gallery thumbnails when backend ready */}
          </div>
          
          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-3">Car Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Year</span>: {listing.year}</div>
                <div><span className="text-muted-foreground">Mileage</span>: {listing.mileage_km.toLocaleString()} km</div>
                <div><span className="text-muted-foreground">Body Type</span>: {listing.body_type}</div>
                <div><span className="text-muted-foreground">Regional Spec</span>: {listing.regional_spec}</div>
                <div><span className="text-muted-foreground">Location</span>: {listing.emirate}</div>
                {listing.trim && <div><span className="text-muted-foreground">Trim</span>: {listing.trim}</div>}
                {listing.fuel_type && <div><span className="text-muted-foreground">Fuel Type</span>: {listing.fuel_type}</div>}
                {listing.transmission && <div><span className="text-muted-foreground">Transmission</span>: {listing.transmission}</div>}
                {listing.horsepower && <div><span className="text-muted-foreground">Horsepower</span>: {listing.horsepower}</div>}
                {listing.doors && <div><span className="text-muted-foreground">Doors</span>: {listing.doors}</div>}
                {listing.exterior_color && <div><span className="text-muted-foreground">Exterior Color</span>: {listing.exterior_color}</div>}
                {listing.interior_color && <div><span className="text-muted-foreground">Interior Color</span>: {listing.interior_color}</div>}
                {listing.steering_side && <div><span className="text-muted-foreground">Steering Side</span>: {listing.steering_side}</div>}
                {listing.warranty && <div><span className="text-muted-foreground">Warranty</span>: {listing.warranty}</div>}
                {listing.insured_in_uae && <div><span className="text-muted-foreground">Insured in UAE</span>: {listing.insured_in_uae}</div>}
              </div>
            </div>

            {/* Contact Information */}
            {listing.contact_phone_number && (
              <div className="rounded-lg border p-4">
                <h3 className="mb-3 text-lg font-semibold">Contact Seller</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {listing.contact_phone_country_code} {listing.contact_phone_number}
                    </span>
                  </div>
                  {listing.contact_phone_has_whatsapp && (
                    <Badge variant="secondary" className="gap-1">
                      <MessageCircle className="h-3 w-3 text-green-600" />
                      WhatsApp
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button asChild variant="default" size="sm">
                    <a href={`tel:${listing.contact_phone_country_code}${listing.contact_phone_number}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </a>
                  </Button>
                  
                  {listing.contact_phone_has_whatsapp && (
                    <Button asChild variant="outline" size="sm">
                      <a 
                        href={`https://wa.me/${listing.contact_phone_country_code.replace('+', '')}${listing.contact_phone_number.replace(/\s/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
                        WhatsApp
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}

            {listing.description && (
              <div className="prose mt-6 max-w-none">
                <h2 className="mb-2 text-xl font-semibold">Description</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">{listing.description}</p>
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