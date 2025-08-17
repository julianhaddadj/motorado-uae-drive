import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { BackgroundSpline } from "@/components/BackgroundSpline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Phone, MessageCircle } from "lucide-react";
import { FadeLoader } from "@/components/FadeLoader";

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
  seller_type?: string;
  dealership_name?: string;
}

const formatAED = (n: number) => new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(n);

const ListingDetails = () => {
  const { slug } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<any>(null);

  // Reset state when slug changes to prevent flash of old content
  useEffect(() => {
    setListing(null);
    setLoading(true);
    setCurrentImageIndex(0);
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchListing();
    }
  }, [slug]);

  // Track current carousel slide
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentImageIndex(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);
    onSelect(); // Initialize

    return () => carouselApi.off("select", onSelect);
  }, [carouselApi]);

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

  if (loading || !listing) {
    return (
      <div className="min-h-screen bg-background relative">
        <BackgroundSpline />
        <div className="relative z-10">
          <Header />
          <BreadcrumbNavigation />
          <main className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            {loading ? (
              <FadeLoader size="lg" showText={false} />
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-4 text-white">Listing not found</h1>
                <p className="text-white/80 mb-6">The listing you're looking for doesn't exist or has been removed.</p>
                <Button asChild>
                  <Link to="/cars">Browse Cars</Link>
                </Button>
              </>
            )}
          </div>
        </main>
        </div>
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
    <div className="min-h-screen bg-background relative">
      <BackgroundSpline />
      <div className="relative z-10">
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
              <h1 className="text-3xl font-bold text-white">
                {listing.make_name || listing.make} - {listing.model_name || listing.model}
                {listing.trim && ` - ${listing.trim}`}
              </h1>
            </div>
            <div className="text-2xl font-bold text-white">{formatAED(listing.price_aed)}</div>
          </div>
          <p className="mt-2 text-lg text-white/80">
            {listing.year}, {listing.mileage_km.toLocaleString()} km, {listing.regional_spec}
          </p>
        </div>

        <div className="space-y-8">
          {/* Image Gallery Section - Full Width */}
          <div className="w-full">
            {/* Image Gallery */}
            {listing.images && listing.images.length > 0 ? (
              <div className="relative">
                <Carousel className="w-full" setApi={setCarouselApi}>
                  <CarouselContent>
                    {listing.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="flex justify-center bg-muted/20 rounded-lg">
                          <img 
                            src={image} 
                            alt={`${listing.year} ${listing.make_name || listing.make} ${listing.model_name || listing.model} - Image ${index + 1}`} 
                            className="max-w-full max-h-[600px] object-contain rounded-lg" 
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {listing.images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-4" />
                      <CarouselNext className="right-4" />
                    </>
                  )}
                </Carousel>
                
                {/* Image counter */}
                {listing.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm">
                    {currentImageIndex + 1} / {listing.images.length}
                  </div>
                )}
                
                {/* Thumbnail strip for multiple images */}
                {listing.images.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {listing.images.map((image, index) => (
                      <button
                        key={index}
                        className={`flex-shrink-0 w-20 h-20 rounded border transition-colors ${
                          index === currentImageIndex 
                            ? 'border-primary border-2' 
                            : 'border-border hover:border-primary'
                        }`}
                        onClick={() => {
                          carouselApi?.scrollTo(index);
                        }}
                      >
                        <img 
                          src={image} 
                          alt={`Thumbnail ${index + 1}`} 
                          className="w-full h-full object-cover rounded" 
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center bg-muted/20 rounded-lg py-16">
                <img 
                  src="/placeholder.svg" 
                  alt={`${listing.year} ${listing.make_name || listing.make} ${listing.model_name || listing.model} for sale`} 
                  className="max-w-full max-h-[400px] object-contain rounded-lg" 
                />
              </div>
            )}
          </div>
          
          {/* Car Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="rounded-lg border border-white/10 bg-card/95 backdrop-blur-sm p-4" style={{ boxShadow: 'var(--shadow-elevated)' }}>
                <h3 className="text-lg font-semibold mb-3 text-white">Car Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div><span className="text-white/70">Year</span>: {listing.year}</div>
                  <div><span className="text-white/70">Mileage</span>: {listing.mileage_km.toLocaleString()} km</div>
                  <div><span className="text-white/70">Body Type</span>: {listing.body_type}</div>
                  <div><span className="text-white/70">Regional Spec</span>: {listing.regional_spec}</div>
                  <div><span className="text-white/70">Location</span>: {listing.emirate}</div>
                  {listing.trim && <div><span className="text-white/70">Trim</span>: {listing.trim}</div>}
                  {listing.fuel_type && <div><span className="text-white/70">Fuel Type</span>: {listing.fuel_type}</div>}
                  {listing.transmission && <div><span className="text-white/70">Transmission</span>: {listing.transmission}</div>}
                  {listing.horsepower && <div><span className="text-white/70">Horsepower</span>: {listing.horsepower}</div>}
                  {listing.doors && <div><span className="text-white/70">Doors</span>: {listing.doors}</div>}
                  {listing.exterior_color && <div><span className="text-white/70">Exterior Color</span>: {listing.exterior_color}</div>}
                  {listing.interior_color && <div><span className="text-white/70">Interior Color</span>: {listing.interior_color}</div>}
                  {listing.steering_side && <div><span className="text-white/70">Steering Side</span>: {listing.steering_side}</div>}
                  {listing.warranty && <div><span className="text-white/70">Warranty</span>: {listing.warranty}</div>}
                  {listing.insured_in_uae && <div><span className="text-white/70">Insured in UAE</span>: {listing.insured_in_uae}</div>}
                </div>
              </div>

              {/* Seller Information */}
              <div className="rounded-lg border border-white/10 bg-card/95 backdrop-blur-sm p-4" style={{ boxShadow: 'var(--shadow-elevated)' }}>
                <h3 className="text-lg font-semibold mb-3 text-white">Seller Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div><span className="text-white/70">Type</span>: {listing.seller_type}</div>
                  {listing.seller_type === 'Dealership' && listing.dealership_name && (
                    <div><span className="text-white/70">Dealership</span>: {listing.dealership_name}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Contact Information */}
              {listing.contact_phone_number && (
                <div className="rounded-lg border border-white/10 bg-card/95 backdrop-blur-sm p-4" style={{ boxShadow: 'var(--shadow-elevated)' }}>
                  <h3 className="mb-3 text-lg font-semibold text-white">Contact Seller</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 flex-1">
                      <Phone className="h-4 w-4 text-white/70" />
                      <span className="font-medium text-white">
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
                <div className="rounded-lg border border-white/10 bg-card/95 backdrop-blur-sm p-4" style={{ boxShadow: 'var(--shadow-elevated)' }}>
                  <h3 className="mb-3 text-lg font-semibold text-white">Description</h3>
                  <p className="text-white/80 whitespace-pre-wrap text-sm leading-relaxed">
                    {listing.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/cars" className="text-white underline">← Back to search</Link>
        </div>
      </main>
      </div>
    </div>
  );
};

export default ListingDetails;