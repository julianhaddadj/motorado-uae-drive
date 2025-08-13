import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbNavigation />
      <main className="mx-auto max-w-6xl px-4 py-10">
      <SEO
        title="Blog — Motorado"
        description="Car-buying guides, market insights, and UAE car ownership tips."
        canonical="/blog"
      />
      <h1 className="mb-6 text-3xl font-bold">Blog</h1>
      <p className="text-muted-foreground">Articles and guides coming soon.</p>
      </main>
    </div>
  );
};

export default Blog;
