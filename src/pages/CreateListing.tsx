import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CreateListing = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbNavigation />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <SEO
          title="Create Car Listing — Motorado"
          description="Create a detailed listing for your car with photos, specifications and pricing information."
          canonical="/create-listing"
        />
        
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Create Your Car Listing</h1>
          <p className="text-muted-foreground">Fill out the details below to create your car listing</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Car Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="camry">Camry</SelectItem>
                    <SelectItem value="x5">X5</SelectItem>
                    <SelectItem value="c-class">C-Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" placeholder="2024" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage (km)</Label>
                <Input id="mileage" placeholder="50000" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price (AED)</Label>
                <Input id="price" placeholder="150000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your car's condition, features, and any additional information..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Car Images</Label>
              <Input id="images" type="file" multiple accept="image/*" />
              <p className="text-sm text-muted-foreground">Upload up to 10 images of your car</p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button size="lg" className="flex-1">
                Create Listing
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/sell")}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateListing;