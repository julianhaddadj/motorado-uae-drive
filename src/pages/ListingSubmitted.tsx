import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";

const ListingSubmitted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-background to-muted/20 px-4 py-8">
      <SEO 
        title="Listing Submitted | Motorado"
        description="Your car listing has been successfully submitted for review"
        canonical="/listing-submitted"
      />
      
      <div className="mx-auto max-w-2xl">
        <Card className="text-center">
          <CardHeader className="pb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-semibold text-foreground">
              Thank You for Your Submission!
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Your listing has been successfully submitted to Motorado.
              </p>
              
              <div className="rounded-lg bg-muted/50 p-4">
                <h3 className="mb-2 font-medium text-foreground">What happens next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Your listing is now pending approval by our team</li>
                  <li>• You'll receive an email confirmation shortly</li>
                  <li>• We'll review your listing within 24-48 hours</li>
                  <li>• Once approved, your listing will go live on our platform</li>
                  <li>• You'll be notified via email when your listing is published</li>
                </ul>
              </div>
              
              <p className="text-sm text-muted-foreground">
                You can check the status of your listing anytime in your dashboard.
              </p>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button 
                onClick={() => navigate("/dashboard")}
                className="flex-1"
              >
                View My Listings
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                className="flex-1"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ListingSubmitted;