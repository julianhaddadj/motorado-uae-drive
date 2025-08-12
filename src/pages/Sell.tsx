import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const Sell = () => {
  return (
    <main className="mx-auto max-w-6xl min-h-screen px-4 py-10">
      <SEO
        title="Sell Your Car — Motorado"
        description="List your car in minutes. Pay-to-list with optional promo code for free listings. Secure Stripe checkout in AED."
        canonical="/sell"
      />
      <h1 className="mb-6 text-3xl font-bold">Sell Your Car</h1>
      <p className="max-w-2xl text-muted-foreground">Create a listing with photos and details, apply a promo code, and publish. Moderation ensures quality across the marketplace.</p>
      <div className="mt-8">
        <Button variant="hero" size="xl">Start listing</Button>
      </div>
    </main>
  );
};

export default Sell;
