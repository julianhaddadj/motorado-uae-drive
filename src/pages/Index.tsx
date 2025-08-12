import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { ListingCard } from "@/components/ListingCard";
import camryImg from "@/assets/listing-camry.jpg";
import lexusImg from "@/assets/listing-lexus-rx.jpg";
import p911Img from "@/assets/listing-911.jpg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Index = () => {
  const listings = [
    { image: camryImg, title: "Toyota Camry 2020 SE", priceAED: 55900, year: 2020, location: "Dubai", isPremium: true },
    { image: lexusImg, title: "Lexus RX 2021 F Sport", priceAED: 174000, year: 2021, location: "Abu Dhabi", isPremium: true },
    { image: p911Img, title: "Porsche 911 Carrera 2019", priceAED: 349000, year: 2019, location: "Dubai", isPremium: false },
  ];

  return (
    <div className="min-h-screen bg-background">
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
            <Select>
              <SelectTrigger className="h-11"><SelectValue placeholder="Make" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="lexus">Lexus</SelectItem>
                <SelectItem value="porsche">Porsche</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="h-11"><SelectValue placeholder="Model" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="camry">Camry</SelectItem>
                <SelectItem value="rx">RX</SelectItem>
                <SelectItem value="911">911</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="h-11"><SelectValue placeholder="Year" /></SelectTrigger>
              <SelectContent>
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
          {listings.concat(listings).map((l, i) => (
            <ListingCard key={i} {...l} />
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
