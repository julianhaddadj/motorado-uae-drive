import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { useAdmin } from "@/hooks/use-admin";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, X, Eye, Phone, MessageCircle } from "lucide-react";
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
  contact_phone_country_code?: string;
  contact_phone_number?: string;
  contact_phone_has_whatsapp?: boolean;
  description?: string;
  images?: string[];
  trim?: string;
  body_type?: string;
  regional_spec?: string;
}

interface ListingPerSeller {
  user_id: string;
  email: string;
  display_name: string | null;
  listing_count: number;
}

export function Admin() {
  const { isAdmin, adminLoading } = useAdmin();
  const [listings, setListings] = useState<Listing[]>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [listingsPerSeller, setListingsPerSeller] = useState<ListingPerSeller[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!adminLoading && isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin, adminLoading]);

  const fetchAdminData = async () => {
    try {
      // Fetch all listings
      const { data: listingsData, error: listingsError } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (listingsError) throw listingsError;
      setListings(listingsData || []);

      // Fetch user count from profiles table
      const { count: userCountData, error: userCountError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (userCountError) throw userCountError;
      setUserCount(userCountData || 0);

      // Fetch listings per seller with user details
      const { data: sellersData, error: sellersError } = await supabase
        .from('listings')
        .select(`
          user_id,
          profiles!inner(display_name)
        `);

      if (sellersError) throw sellersError;

      // Process listings per seller
      const sellerMap = new Map<string, { count: number; display_name: string | null; email: string }>();
      
      sellersData?.forEach((listing: any) => {
        const userId = listing.user_id;
        const displayName = listing.profiles?.display_name || null;
        const email = `User-${userId.substring(0, 8)}`; // Simplified identifier
        
        if (sellerMap.has(userId)) {
          sellerMap.get(userId)!.count++;
        } else {
          sellerMap.set(userId, { count: 1, display_name: displayName, email });
        }
      });

      const sellersArray: ListingPerSeller[] = Array.from(sellerMap.entries()).map(([userId, data]) => ({
        user_id: userId,
        email: data.email,
        display_name: data.display_name,
        listing_count: data.count
      })).sort((a, b) => b.listing_count - a.listing_count);

      setListingsPerSeller(sellersArray);

    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch admin data"
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{userCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{listings.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Listings per Seller */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Listings per Seller</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : listingsPerSeller.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">No sellers found</div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {listingsPerSeller.map((seller) => (
                    <div key={seller.user_id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{seller.display_name || 'Anonymous'}</p>
                        <p className="text-sm text-muted-foreground">{seller.email}</p>
                      </div>
                      <Badge variant="secondary">
                        {seller.listing_count} listing{seller.listing_count !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Average listings per seller</span>
                  <span className="text-sm text-muted-foreground">
                    {listingsPerSeller.length > 0 ? 
                      (listings.length / listingsPerSeller.length).toFixed(1) : '0'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Active sellers</span>
                  <span className="text-sm text-muted-foreground">{listingsPerSeller.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Approval rate</span>
                  <span className="text-sm text-muted-foreground">
                    {listings.length > 0 ? 
                      ((approvedCount / listings.length) * 100).toFixed(1) : '0'}%
                  </span>
                </div>
              </div>
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
                        {listing.contact_phone_number && (
                          <p className="text-xs text-muted-foreground">
                            Contact: {listing.contact_phone_country_code} {listing.contact_phone_number}
                            {listing.contact_phone_has_whatsapp && " (WhatsApp)"}
                          </p>
                        )}
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
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>
                                  {listing.year} {listing.make} {listing.model}
                                  {listing.trim && ` ${listing.trim}`}
                                </DialogTitle>
                              </DialogHeader>
                              
                              <div className="space-y-6">
                                {/* Images */}
                                {listing.images && listing.images.length > 0 && (
                                  <div className="space-y-2">
                                    <h4 className="font-semibold">Images</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                      {listing.images.map((image, index) => (
                                        <img
                                          key={index}
                                          src={image}
                                          alt={`Car image ${index + 1}`}
                                          className="w-full h-32 object-cover rounded-lg border"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Basic Details */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <h4 className="font-semibold">Vehicle Details</h4>
                                    <div className="space-y-1 text-sm">
                                      <p><span className="font-medium">Year:</span> {listing.year}</p>
                                      <p><span className="font-medium">Make:</span> {listing.make}</p>
                                      <p><span className="font-medium">Model:</span> {listing.model}</p>
                                      {listing.trim && <p><span className="font-medium">Trim:</span> {listing.trim}</p>}
                                      {listing.body_type && <p><span className="font-medium">Body Type:</span> {listing.body_type}</p>}
                                      {listing.regional_spec && <p><span className="font-medium">Regional Spec:</span> {listing.regional_spec}</p>}
                                      <p><span className="font-medium">Mileage:</span> {listing.mileage_km.toLocaleString()} km</p>
                                      <p><span className="font-medium">Emirate:</span> {listing.emirate}</p>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <h4 className="font-semibold">Price & Contact</h4>
                                    <div className="space-y-1 text-sm">
                                      <p><span className="font-medium">Price:</span> AED {listing.price_aed.toLocaleString()}</p>
                                      
                                      {listing.contact_phone_number && (
                                        <div className="space-y-1">
                                          <p className="font-medium">Contact:</p>
                                          <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            <span>{listing.contact_phone_country_code} {listing.contact_phone_number}</span>
                                            {listing.contact_phone_has_whatsapp && (
                                              <Badge variant="secondary" className="text-xs">
                                                <MessageCircle className="h-3 w-3 mr-1" />
                                                WhatsApp
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                      
                                      <p><span className="font-medium">Submitted:</span> {new Date(listing.created_at).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Description */}
                                {listing.description && (
                                  <div className="space-y-2">
                                    <h4 className="font-semibold">Description</h4>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                      {listing.description}
                                    </p>
                                  </div>
                                )}

                                {/* Action Buttons */}
                                {listing.approval_status === 'pending' && (
                                  <div className="flex justify-end gap-2 pt-4 border-t">
                                    <Button 
                                      variant="destructive"
                                      onClick={() => handleApproval(listing.id, false)}
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                    <Button 
                                      onClick={() => handleApproval(listing.id, true)}
                                    >
                                      <Check className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          
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