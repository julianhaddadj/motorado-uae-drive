import Hero from "@/components/Hero";
import { Header } from "@/components/Header";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { SEO } from "@/components/SEO";
import { ListingCard } from "@/components/ListingCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { useMakesAndModels } from "@/hooks/use-makes-models";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface DatabaseListing {
  id: string;
  make: string;
  model: string;
  year: number;
  price_aed: number;
  mileage_km: number;
  emirate: string;
  trim?: string;
  images: string[];
  is_premium?: boolean;
  slug: string;
  make_name?: string;
  model_name?: string;
}

const Index = () => {
  const { has, toggle } = useFavorites();
  const { makes, loading, fetchModelsForMake, getModelsByMake, isLoadingModelsForMake } = useMakesAndModels();
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [listings, setListings] = useState<DatabaseListing[]>([]);
  const [listingsLoading, setListingsLoading] = useState(true);

  // Fetch listings from database
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false })
          .limit(12);
        
        if (error) throw error;
        
        // Fetch make and model names for each listing
        const listingsWithNames = await Promise.all(
          (data || []).map(async (listing) => {
            const [makeData, modelData] = await Promise.all([
              supabase.from('makes').select('name').eq('id', listing.make).single(),
              supabase.from('models').select('name').eq('id', listing.model).single()
            ]);
            
            return {
              ...listing,
              make_name: makeData.data?.name || listing.make,
              model_name: modelData.data?.name || listing.model
            };
          })
        );
        
        setListings(listingsWithNames);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
      } finally {
        setListingsLoading(false);
      }
    };

    fetchListings();
  }, []);
  
  const featured = listings
    .filter((l) => l.is_premium)
    .concat(listings.filter((l) => !l.is_premium))
    .slice(0, 6);

  const availableModels = selectedMake ? getModelsByMake(selectedMake) : [];

  const handleMakeChange = async (value: string) => {
    const actualValue = value === "all" ? "" : value;
    setSelectedMake(actualValue);
    setSelectedModel(""); // Reset model when make changes
    if (actualValue) {
      await fetchModelsForMake(actualValue);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbNavigation />
      <SEO
        title="Motorado — UAE Car Marketplace"
        description="Sell your car in the UAE fast. Pay-to-list with promo codes. Browse premium cars by make, model, price and more."
        canonical="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Motorado",
          url: typeof window !== 'undefined' ? window.location.origin : '/',
          potentialAction: {
            "@type": "SearchAction",
            target: `${typeof window !== 'undefined' ? window.location.origin : ''}/cars?search={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <Hero />

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-xl border bg-card p-4 shadow-sm md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Select value={selectedMake || "all"} onValueChange={handleMakeChange}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="all">All Makes</SelectItem>
                {makes.map((make) => (
                  <SelectItem key={make.id} value={make.id}>
                    {make.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedModel || "all"} onValueChange={(value) => setSelectedModel(value === "all" ? "" : value)} disabled={!selectedMake}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder={isLoadingModelsForMake(selectedMake) ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                    <span>Loading...</span>
                  </div>
                ) : "Model"} />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="all">All Models</SelectItem>
                {availableModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="2024">2024+</SelectItem>
                <SelectItem value="2020">2020+</SelectItem>
                <SelectItem value="2015">2015+</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="hero" size="xl">Search cars</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Latest premium listings</h2>
          <Button variant="premium">View all</Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {listingsLoading ? (
            // Show loading skeletons
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg aspect-[16/10] mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-muted rounded h-4 w-3/4"></div>
                  <div className="bg-muted rounded h-4 w-1/2"></div>
                </div>
              </div>
            ))
          ) : (
            featured.map((l) => (
              <Link key={l.id} to={`/cars/${l.slug}`} className="block">
                <ListingCard
                  id={l.id}
                  image={l.images?.[0] || "/placeholder.svg"}
                  title={`${l.make_name || l.make} ${l.model_name || l.model} ${l.year}${l.trim ? ` ${l.trim}` : ''}`}
                  priceAED={l.price_aed}
                  year={l.year}
                  mileageKm={l.mileage_km}
                  location={l.emirate}
                  isPremium={l.is_premium}
                  favorite={has.has(l.id)}
                  onToggleFavorite={(e?: any) => {
                    // Prevent link navigation when toggling favorite
                    if (e && e.preventDefault) e.preventDefault();
                    toggle(l.id);
                  }}
                />
              </Link>
            ))
          )}
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Motorado. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/legal/terms" className="hover:text-foreground">Terms</a>
              <a href="/legal/privacy" className="hover:text-foreground">Privacy</a>
              <a href="/contact" className="hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
