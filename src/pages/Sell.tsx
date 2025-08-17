import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { BackgroundSpline } from "@/components/BackgroundSpline";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const Sell = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundSpline />
      <div className="relative z-10">
        <Header />
        <BreadcrumbNavigation />
        <main className="mx-auto max-w-6xl px-4 py-10">
      <SEO
        title="Sell Your Car — Motorado"
        description="List your car in minutes. Pay-to-list with optional promo code for free listings. Secure Stripe checkout in AED."
        canonical="/sell"
      />
      <h1 className="mb-6 text-3xl font-bold">Sell Your Car</h1>
      <p className="max-w-2xl text-muted-foreground">Create a listing with photos and details, apply a promo code, and publish. Moderation ensures quality across the marketplace.</p>
      <div className="mt-8">
        <Button variant="hero" size="xl" asChild>
          <Link to={user ? "/create-listing" : "/auth"}>Start listing</Link>
        </Button>
      </div>
      </main>
      </div>
    </div>
  );
};

export default Sell;
