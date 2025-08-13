import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";

const Favorites = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
      <SEO
        title="Favorites — Motorado"
        description="Your saved cars for quick access across devices."
        canonical="/favorites"
      />
      <h1 className="mb-6 text-3xl font-bold">Favorites</h1>
      <p className="text-muted-foreground">Sign in to save and sync favorites. Coming soon.</p>
      </main>
    </div>
  );
};

export default Favorites;
