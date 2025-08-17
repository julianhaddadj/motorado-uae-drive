import { useEffect, useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { useFavorites } from "@/hooks/use-favorites";
import { supabase } from "@/integrations/supabase/client";
import { FadeLoader } from "@/components/FadeLoader";
import { ListingCard } from "@/components/ListingCard";
import { Link } from "react-router-dom";

interface FavoriteListing {
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
  makes?: { name: string };
  models?: { name: string };
}

const Favorites = () => {
  const { ids, has, toggle, isLoaded } = useFavorites();
  const [favoriteListings, setFavoriteListings] = useState<FavoriteListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      fetchFavoriteListings();
    }
  }, [ids, isLoaded]);

  const fetchFavoriteListings = async () => {
    if (ids.length === 0) {
      setFavoriteListings([]);
      setLoading(false);
      return;
    }

    try {
      // First get the listings
      const { data: listings, error: listingsError } = await supabase
        .from('listings')
        .select(`
          id,
          make,
          model,
          year,
          price_aed,
          mileage_km,
          emirate,
          trim,
          images,
          is_premium,
          slug
        `)
        .in('id', ids)
        .eq('is_published', true);

      if (listingsError) throw listingsError;

      if (!listings || listings.length === 0) {
        setFavoriteListings([]);
        setLoading(false);
        return;
      }

      // Get unique make and model IDs
      const makeIds = [...new Set(listings.map(l => l.make))];
      const modelIds = [...new Set(listings.map(l => l.model))];

      // Fetch makes and models
      const [{ data: makes }, { data: models }] = await Promise.all([
        supabase.from('makes').select('id, name').in('id', makeIds),
        supabase.from('models').select('id, name').in('id', modelIds)
      ]);

      // Create lookup maps
      const makeMap = new Map(makes?.map(m => [m.id, m.name]) || []);
      const modelMap = new Map(models?.map(m => [m.id, m.name]) || []);

      // Combine the data
      const enrichedListings = listings.map(listing => ({
        ...listing,
        makes: { name: makeMap.get(listing.make) || listing.make },
        models: { name: modelMap.get(listing.model) || listing.model }
      }));

      setFavoriteListings(enrichedListings);
    } catch (error) {
      console.error('Error fetching favorite listings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !isLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <BreadcrumbNavigation />
        <main className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex justify-center items-center min-h-[400px]">
            <FadeLoader size="lg" showText={false} />
          </div>
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
          title="Favorites — Motorado"
          description="Your saved cars for quick access across devices."
          canonical="/favorites"
        />
        <h1 className="mb-6 text-3xl font-bold">Favorites</h1>
        
        {favoriteListings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No favorite cars saved yet.</p>
            <p className="text-sm text-muted-foreground">
              Browse cars and click the heart icon to save your favorites.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {favoriteListings.map((listing) => (
              <Link key={listing.id} to={`/cars/${listing.slug}`} className="block">
                <ListingCard
                  id={listing.id}
                  image={listing.images?.[0] || "/placeholder.svg"}
                  title={`${listing.makes?.name || listing.make} ${listing.models?.name || listing.model}`}
                  trim={listing.trim}
                  priceAED={listing.price_aed}
                  year={listing.year}
                  mileageKm={listing.mileage_km}
                  location={listing.emirate}
                  isPremium={listing.is_premium}
                  favorite={has.has(listing.id)}
                  onToggleFavorite={() => toggle(listing.id)}
                />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
