import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { useAdmin } from "@/hooks/use-admin";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";

interface Listing {
  id: string;
  make: string;
  model: string;
  year: number;
  price_aed: number;
  approval_status: string;
  created_at: string;
  user_id: string;
  emirate: string;
  mileage_km: number;
}

export function Admin() {
  const { isAdmin, adminLoading } = useAdmin();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!adminLoading && isAdmin) {
      fetchPendingListings();
    }
  }, [isAdmin, adminLoading]);

  const fetchPendingListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch listings"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (listingId: string, approved: boolean) => {
    try {
      const updates = approved 
        ? { 
            approval_status: 'approved', 
            approved_at: new Date().toISOString(),
            is_published: true 
          }
        : { 
            approval_status: 'rejected',
            is_published: false 
          };

      const { error } = await supabase
        .from('listings')
        .update(updates)
        .eq('id', listingId);

      if (error) throw error;

      setListings(prev => 
        prev.map(listing => 
          listing.id === listingId 
            ? { ...listing, ...updates }
            : listing
        )
      );

      toast({
        title: "Success",
        description: `Listing ${approved ? 'approved' : 'rejected'} successfully`
      });
    } catch (error) {
      console.error('Error updating listing:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update listing"
      });
    }
  };

  if (adminLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const pendingCount = listings.filter(l => l.approval_status === 'pending').length;
  const approvedCount = listings.filter(l => l.approval_status === 'approved').length;
  const rejectedCount = listings.filter(l => l.approval_status === 'rejected').length;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Admin Dashboard - Motorado"
        description="Manage car listings and user submissions"
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <BreadcrumbNavigation />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage car listings and user submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Listings Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Listings</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading listings...</div>
            ) : listings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No listings found</div>
            ) : (
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div key={listing.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">
                          {listing.year} {listing.make} {listing.model}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          AED {listing.price_aed.toLocaleString()} • {listing.mileage_km.toLocaleString()} km • {listing.emirate}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Submitted: {new Date(listing.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge variant={
                          listing.approval_status === 'approved' ? 'default' :
                          listing.approval_status === 'rejected' ? 'destructive' : 'secondary'
                        }>
                          {listing.approval_status}
                        </Badge>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <a href={`/listings/${listing.id}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                          
                          {listing.approval_status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="default"
                                onClick={() => handleApproval(listing.id, true)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleApproval(listing.id, false)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}