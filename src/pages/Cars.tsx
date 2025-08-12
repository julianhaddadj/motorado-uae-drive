import { SEO } from "@/components/SEO";

const Cars = () => {
  return (
    <main className="mx-auto max-w-6xl min-h-screen px-4 py-10">
      <SEO
        title="Browse Cars — Motorado"
        description="Search cars for sale across the UAE by make, model, price, year, mileage and more."
        canonical="/cars"
      />
      <h1 className="mb-6 text-3xl font-bold">Browse Cars</h1>
      <p className="text-muted-foreground">Search and filters coming soon.</p>
    </main>
  );
};

export default Cars;
