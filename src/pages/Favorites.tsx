import { SEO } from "@/components/SEO";

const Favorites = () => {
  return (
    <main className="mx-auto max-w-6xl min-h-screen px-4 py-10">
      <SEO
        title="Favorites — Motorado"
        description="Your saved cars for quick access across devices."
        canonical="/favorites"
      />
      <h1 className="mb-6 text-3xl font-bold">Favorites</h1>
      <p className="text-muted-foreground">Sign in to save and sync favorites. Coming soon.</p>
    </main>
  );
};

export default Favorites;
