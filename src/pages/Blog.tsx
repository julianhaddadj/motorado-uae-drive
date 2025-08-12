import { SEO } from "@/components/SEO";

const Blog = () => {
  return (
    <main className="mx-auto max-w-6xl min-h-screen px-4 py-10">
      <SEO
        title="Blog — Motorado"
        description="Car-buying guides, market insights, and UAE car ownership tips."
        canonical="/blog"
      />
      <h1 className="mb-6 text-3xl font-bold">Blog</h1>
      <p className="text-muted-foreground">Articles and guides coming soon.</p>
    </main>
  );
};

export default Blog;
