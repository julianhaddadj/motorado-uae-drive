import { Button } from "@/components/ui/button";
import heroImage from "@/assets/motorado-hero.jpg";
import { Link } from "react-router-dom";
import { GeometricAnimation } from "@/components/GeometricAnimation";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <GeometricAnimation className="absolute inset-0 -z-5" />

      <main className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 relative z-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            UAE's premium car marketplace
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Pay-to-list with promo codes. Sellers publish in minutes. Buyers browse, filter and contact directly.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/sell"><Button variant="hero" size="xl" className="magnetic-btn shimmer">Start selling</Button></Link>
            <Link to="/cars"><Button variant="premium" size="xl" className="magnetic-btn">Browse cars</Button></Link>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Apple Pay enabled after domain verification. Secure Stripe checkout in AED.</p>
        </div>
        <div className="relative">
          <img
            src={heroImage}
            alt="Luxury car with Dubai skyline - Motorado UAE car marketplace"
            className="mx-auto w-full max-w-xl rounded-xl border border-border shadow-xl animate-float"
            loading="eager"
          />
        </div>
      </main>
    </section>
  );
};

export default Hero;
