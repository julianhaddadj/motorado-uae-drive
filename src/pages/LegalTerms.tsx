import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";

const LegalTerms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbNavigation />
      <main className="mx-auto max-w-6xl px-4 py-10">
      <SEO
        title="Terms of Service — Motorado"
        description="The rules and terms for using Motorado."
        canonical="/legal/terms"
      />
      <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>
      <p className="text-muted-foreground">Content coming soon.</p>
      </main>
    </div>
  );
};

export default LegalTerms;
