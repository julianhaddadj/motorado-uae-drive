import { SEO } from "@/components/SEO";

const Contact = () => {
  return (
    <main className="mx-auto max-w-6xl min-h-screen px-4 py-10">
      <SEO
        title="Contact — Motorado"
        description="Get in touch with the Motorado team."
        canonical="/contact"
      />
      <h1 className="mb-6 text-3xl font-bold">Contact</h1>
      <p className="text-muted-foreground">Email us at support@motorado.ae</p>
    </main>
  );
};

export default Contact;
