import Hero from "@/components/Hero";
import { Header } from "@/components/Header";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { SEO } from "@/components/SEO";
import { ListingCard } from "@/components/ListingCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { listings as allListings } from "@/data/listings";
import { useFavorites } from "@/hooks/use-favorites";
import { useMakesAndModels } from "@/hooks/use-makes-models";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const { has, toggle } = useFavorites();
  const { makes, loading, fetchModelsForMake, getModelsByMake, isLoadingModelsForMake } = useMakesAndModels();
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  
  const featured = allListings
    .filter((l) => l.isPremium)
    .concat(allListings.filter((l) => !l.isPremium))
    .slice(0, 6);

  const availableModels = selectedMake ? getModelsByMake(selectedMake) : [];

  const handleMakeChange = async (value: string) => {
    setSelectedMake(value);
    setSelectedModel(""); // Reset model when make changes
    if (value) {
      await fetchModelsForMake(value);
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
            <Select value={selectedMake} onValueChange={handleMakeChange}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="">All Makes</SelectItem>
                {makes.map((make) => (
                  <SelectItem key={make.id} value={make.id}>
                    {make.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedMake}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder={isLoadingModelsForMake(selectedMake) ? "Loading..." : "Model"} />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="">All Models</SelectItem>
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
          {featured.map((l) => (
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
                onToggleFavorite={(e?: any) => {
                  // Prevent link navigation when toggling favorite
                  if (e && e.preventDefault) e.preventDefault();
                  toggle(l.id);
                }}
              />
            </Link>
          ))}
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
