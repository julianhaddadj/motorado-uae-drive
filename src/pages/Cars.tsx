import { useMemo, useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { ListingCard } from "@/components/ListingCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFavorites } from "@/hooks/use-favorites";
import { useMakesAndModels } from "@/hooks/use-makes-models";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

function useFilters() {
  const [params, setParams] = useSearchParams();

  const set = (key: string, value?: string) => {
    const next = new URLSearchParams(params);
    if (!value) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  return { params, set, setParams };
}

const Cars = () => {
  const { params, set, setParams } = useFilters();
  const { has, toggle } = useFavorites();
  const { makes, loading, fetchModelsForMake, getModelsByMake, isLoadingModelsForMake } = useMakesAndModels();
  const [listings, setListings] = useState<any[]>([]);
  const [listingsLoading, setListingsLoading] = useState(true);

  const selectedMakeId = params.get("make") || "";
  const selectedModelId = params.get("model") || "";
  const minYear = params.get("minYear") || "";
  const maxYear = params.get("maxYear") || "";
  const minPrice = params.get("minPrice") || "";
  const maxPrice = params.get("maxPrice") || "";
  const sort = params.get("sort") || "newest";

  // Get make and model names for filtering
  const selectedMake = makes.find(m => m.id === selectedMakeId);
  const availableModels = selectedMakeId ? getModelsByMake(selectedMakeId) : [];
  const selectedModel = availableModels.find(m => m.id === selectedModelId);

  // Fetch listings from Supabase
  useEffect(() => {
    const fetchListings = async () => {
      setListingsLoading(true);
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .eq('is_published', true);
        
        if (error) throw error;
        setListings(data || []);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
      } finally {
        setListingsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleMakeChange = async (value: string) => {
    set("make", value === "all" ? "" : value);
    set("model", ""); // Reset model when make changes
    if (value && value !== "all") {
      await fetchModelsForMake(value);
    }
  };

  const filteredListings = useMemo(() => {
    let filtered = listings;

    // Apply filters
    if (selectedMake) {
      filtered = filtered.filter(listing => listing.make === selectedMake.name);
    }
    if (selectedModel) {
      filtered = filtered.filter(listing => listing.model === selectedModel.name);
    }
    if (minYear) {
      filtered = filtered.filter(listing => listing.year >= parseInt(minYear));
    }
    if (maxYear) {
      filtered = filtered.filter(listing => listing.year <= parseInt(maxYear));
    }
    if (minPrice) {
      filtered = filtered.filter(listing => listing.price_aed >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(listing => listing.price_aed <= parseInt(maxPrice));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case "price_asc":
          return a.price_aed - b.price_aed;
        case "price_desc":
          return b.price_aed - a.price_aed;
        case "mileage_asc":
          return a.mileage_km - b.mileage_km;
        case "year_desc":
          return b.year - a.year;
        default:
          return +new Date(b.created_at) - +new Date(a.created_at);
      }
    });

    return filtered;
  }, [listings, selectedMake, selectedModel, minYear, maxYear, minPrice, maxPrice, sort]);

  if (loading || listingsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <BreadcrumbNavigation />
        <main className="mx-auto max-w-6xl px-4 py-10">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbNavigation />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <SEO
          title="Browse Cars — Motorado"
          description="Search cars for sale across the UAE by make, model, price, year, mileage and more."
          canonical="/cars"
        />
        <h1 className="mb-6 text-3xl font-bold">Browse Cars</h1>

        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-6">
          <Select value={selectedMakeId || "all"} onValueChange={handleMakeChange}>
            <SelectTrigger className="h-11 md:col-span-1">
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

          <Select value={selectedModelId || "all"} onValueChange={(value) => set("model", value === "all" ? "" : value)} disabled={!selectedMakeId}>
            <SelectTrigger className="h-11 md:col-span-1">
              <SelectValue placeholder={isLoadingModelsForMake(selectedMakeId) ? "Loading..." : "Model"} />
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

          <Input 
            className="h-11" 
            placeholder="Min Year" 
            value={minYear} 
            onChange={(e) => set("minYear", e.target.value || undefined)} 
          />
          <Input 
            className="h-11" 
            placeholder="Max Year" 
            value={maxYear} 
            onChange={(e) => set("maxYear", e.target.value || undefined)} 
          />
          <Input 
            className="h-11" 
            placeholder="Min Price" 
            value={minPrice} 
            onChange={(e) => set("minPrice", e.target.value || undefined)} 
          />
          <Input 
            className="h-11" 
            placeholder="Max Price" 
            value={maxPrice} 
            onChange={(e) => set("maxPrice", e.target.value || undefined)} 
          />

          <Select value={sort} onValueChange={(value) => set("sort", value)}>
            <SelectTrigger className="h-11 md:col-span-2">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border shadow-lg z-50">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="mileage_asc">Mileage: Low to High</SelectItem>
              <SelectItem value="year_desc">Year: New to Old</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="premium" onClick={() => setParams(new URLSearchParams())}>
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredListings.map((listing) => (
            <Link key={listing.id} to={`/cars/${listing.slug}`} className="block">
              <ListingCard
                id={listing.id}
                image={listing.images?.[0] || "/placeholder.svg"}
                title={`${listing.make} ${listing.model} ${listing.year}${listing.trim ? ` ${listing.trim}` : ''}`}
                priceAED={listing.price_aed}
                year={listing.year}
                location={listing.emirate}
                isPremium={listing.is_premium}
                favorite={has.has(listing.id)}
                onToggleFavorite={() => toggle(listing.id)}
              />
            </Link>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <p className="mt-10 text-muted-foreground">No cars found. Try adjusting your filters.</p>
        )}
      </main>
    </div>
  );
};

export default Cars;