import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { BackgroundSpline } from "@/components/BackgroundSpline";
import { CreateListingWizard } from "@/components/CreateListingWizard/CreateListingWizard";

const CreateListing = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundSpline />
      <div className="relative z-10">
        <Header />
        <BreadcrumbNavigation />
        <main className="mx-auto max-w-4xl px-4 py-10">
          <SEO
            title="Create Car Listing — Motorado"
            description="Create a detailed listing for your car with photos, specifications and pricing information."
            canonical="/create-listing"
          />
          
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-white">Create Your Car Listing</h1>
            <p className="text-white/80">Follow the step-by-step guide to create your car listing</p>
          </div>

          <CreateListingWizard />
        </main>
      </div>
    </div>
  );
};

export default CreateListing;