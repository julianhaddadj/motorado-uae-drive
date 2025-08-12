import { Button } from "@/components/ui/button";
import heroImage from "@/assets/motorado-hero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-20%,hsl(var(--brand)/0.12),transparent_60%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--background)))] animate-bg-pan" />
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-6 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-glow)]" aria-hidden />
          <span className="text-xl font-extrabold tracking-tight">Motorado</span>
        </Link>
        <div className="hidden gap-6 sm:flex">
          <Link to="/cars" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Buy Cars</Link>
          <Link to="/sell" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sell</Link>
          <Link to="/favorites" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Favorites</Link>
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
        </div>
        <div className="hidden sm:block">
          <Link to="/sell"><Button variant="hero" size="sm">Sell your car</Button></Link>
        </div>
      </nav>

      <main className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-6 md:grid-cols-2 md:py-16">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            UAE's premium car marketplace
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Pay-to-list with promo codes. Sellers publish in minutes. Buyers browse, filter and contact directly.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/sell"><Button variant="hero" size="xl">Start selling</Button></Link>
            <Link to="/cars"><Button variant="premium" size="xl">Browse cars</Button></Link>
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
    </header>
  );
};

export default Hero;
