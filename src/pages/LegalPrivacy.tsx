import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";

const LegalPrivacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbNavigation />
      <main className="mx-auto max-w-6xl px-4 py-10">
      <SEO
        title="Privacy Policy — Motorado"
        description="How we collect and use your data at Motorado."
        canonical="/legal/privacy"
      />
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="text-muted-foreground">Content coming soon.</p>
      </main>
    </div>
  );
};

export default LegalPrivacy;
