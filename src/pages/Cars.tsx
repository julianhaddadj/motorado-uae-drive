import { useMemo } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { ListingCard } from "@/components/ListingCard";
import { listings, allMakes, modelsByMake, Listing } from "@/data/listings";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useFavorites } from "@/hooks/use-favorites";
import { Link, useSearchParams } from "react-router-dom";

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

function applyFilters(data: Listing[], params: URLSearchParams) {
  const make = params.get("make");
  const model = params.get("model");
  const minYear = Number(params.get("minYear") || 0);
  const maxYear = Number(params.get("maxYear") || 9999);
  const minPrice = Number(params.get("minPrice") || 0);
  const maxPrice = Number(params.get("maxPrice") || 10_000_000);
  const sort = params.get("sort") || "newest";

  let res = data.filter((l) => {
    return (
      (!make || l.make === make) &&
      (!model || l.model === model) &&
      l.year >= minYear &&
      l.year <= maxYear &&
      l.priceAED >= minPrice &&
      l.priceAED <= maxPrice
    );
  });

  res = res.sort((a, b) => {
    switch (sort) {
      case "price_asc":
        return a.priceAED - b.priceAED;
      case "price_desc":
        return b.priceAED - a.priceAED;
      case "mileage_asc":
        return a.mileage - b.mileage;
      case "year_desc":
        return b.year - a.year;
      default:
        return +new Date(b.publishedAt) - +new Date(a.publishedAt);
    }
  });

  return res;
}

const Cars = () => {
  const { params, set, setParams } = useFilters();
  const { has, toggle } = useFavorites();

  const make = params.get("make") || "";
  const model = params.get("model") || "";
  const minYear = params.get("minYear") || "";
  const maxYear = params.get("maxYear") || "";
  const minPrice = params.get("minPrice") || "";
  const maxPrice = params.get("maxPrice") || "";
  const sort = params.get("sort") || "newest";

  const filtered = useMemo(() => applyFilters(listings, params), [params]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
      <SEO
        title="Browse Cars — Motorado"
        description="Search cars for sale across the UAE by make, model, price, year, mileage and more."
        canonical="/cars"
      />
      <h1 className="mb-6 text-3xl font-bold">Browse Cars</h1>

      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-6">
        <Select value={make} onValueChange={(v) => { set("make", v); set("model", undefined); }}>
          <SelectTrigger className="h-11 md:col-span-1"><SelectValue placeholder="Make" /></SelectTrigger>
          <SelectContent>
            {allMakes.map((m) => (<SelectItem key={m} value={m}>{m}</SelectItem>))}
          </SelectContent>
        </Select>

        <Select value={model} onValueChange={(v) => set("model", v)}>
          <SelectTrigger className="h-11 md:col-span-1"><SelectValue placeholder="Model" /></SelectTrigger>
          <SelectContent>
            {(modelsByMake[make] || Object.values(modelsByMake).flat()).map((m) => (<SelectItem key={m} value={m}>{m}</SelectItem>))}
          </SelectContent>
        </Select>

        <Input className="h-11" placeholder="Min Year" value={minYear} onChange={(e) => set("minYear", e.target.value || undefined)} />
        <Input className="h-11" placeholder="Max Year" value={maxYear} onChange={(e) => set("maxYear", e.target.value || undefined)} />
        <Input className="h-11" placeholder="Min Price" value={minPrice} onChange={(e) => set("minPrice", e.target.value || undefined)} />
        <Input className="h-11" placeholder="Max Price" value={maxPrice} onChange={(e) => set("maxPrice", e.target.value || undefined)} />

        <Select value={sort} onValueChange={(v) => set("sort", v)}>
          <SelectTrigger className="h-11 md:col-span-2"><SelectValue placeholder="Sort by" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="mileage_asc">Mileage: Low to High</SelectItem>
            <SelectItem value="year_desc">Year: New to Old</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="premium" onClick={() => setParams(new URLSearchParams())}>Reset</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((l) => (
          <Link key={l.id} to={`/cars/${l.slug}`} className="block">
            <ListingCard
              id={l.id}
              image={l.coverImageUrl}
              title={`${l.make} ${l.model} ${l.year}${l.trim ? ` ${l.trim}` : ''}`}
              priceAED={l.priceAED}
              year={l.year}
              location={l.emirate}
              isPremium={l.isPremium}
              favorite={has.has(l.id)}
              onToggleFavorite={() => toggle(l.id)}
            />
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-muted-foreground">No cars found. Try adjusting your filters.</p>
      )}
      </main>
    </div>
  );
};

export default Cars;
