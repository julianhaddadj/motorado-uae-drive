import { useLocation, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListingBySlug } from "@/data/listings";
import { supabase } from "@/integrations/supabase/client";
import { FadeLoader } from "@/components/FadeLoader";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface ListingData {
  make: string;
  model: string;
  make_name?: string;
  model_name?: string;
  year: number;
  trim?: string;
}

export const BreadcrumbNavigation = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const path = location.pathname;
  const [makeModelNames, setMakeModelNames] = useState<{[key: string]: string}>({});
  const [listingData, setListingData] = useState<ListingData | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Clear navigation state after route changes  
  useEffect(() => {
    // Reset navigation state when route changes
    setIsNavigating(false);
  }, [location.pathname]);

  // Fetch make and model names for IDs - with better caching
  useEffect(() => {
    const fetchNames = async () => {
      const makeId = searchParams.get("make");
      const modelId = searchParams.get("model");
      const newNames: {[key: string]: string} = {};

      try {
        if (makeId && !makeModelNames[`make_${makeId}`]) {
          const { data } = await supabase
            .from('makes')
            .select('name')
            .eq('id', makeId)
            .single();
          if (data) newNames[`make_${makeId}`] = data.name;
        }

        if (modelId && !makeModelNames[`model_${modelId}`]) {
          const { data } = await supabase
            .from('models')
            .select('name')
            .eq('id', modelId)
            .single();
          if (data) newNames[`model_${modelId}`] = data.name;
        }

        if (Object.keys(newNames).length > 0) {
          setMakeModelNames(prev => ({ ...prev, ...newNames }));
        }
      } catch (error) {
        console.error('Error fetching make/model names:', error);
      }
    };

    fetchNames();
  }, [searchParams.get("make"), searchParams.get("model")]);

  // Fetch listing data for car details pages
  useEffect(() => {
    const fetchListingData = async () => {
      if (path.startsWith("/cars/") && path !== "/cars") {
        // Clear previous data immediately when route changes
        setListingData(null);
        
        const slug = path.replace("/cars/", "");
        
        try {
          const { data, error } = await supabase
            .from('listings')
            .select('make, model, year, trim')
            .eq('slug', slug)
            .single();

          if (error || !data) {
            // Fallback to static data
            const listing = getListingBySlug(slug);
            if (listing) {
              setListingData({
                make: listing.make,
                model: listing.model,
                year: listing.year,
                trim: listing.trim
              });
            }
            return;
          }

          // Fetch make and model names
          const [makeData, modelData] = await Promise.all([
            supabase.from('makes').select('name').eq('id', data.make).single(),
            supabase.from('models').select('name').eq('id', data.model).single()
          ]);

          setListingData({
            ...data,
            make_name: makeData.data?.name,
            model_name: modelData.data?.name
          });
        } catch (error) {
          console.error('Error fetching listing data:', error);
        }
      } else {
        setListingData(null);
      }
    };

    fetchListingData();
  }, [path]);

  const buildFilteredUrl = (baseUrl: string, excludeParams: string[] = []) => {
    const currentParams = new URLSearchParams(searchParams);
    excludeParams.forEach(param => currentParams.delete(param));
    const queryString = currentParams.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  const generateBreadcrumbs = (): BreadcrumbItemType[] => {
    const crumbs: BreadcrumbItemType[] = [{ label: "Home", href: "/" }];

    if (path === "/") {
      return [];
    }

    // Cars page with filtering
    if (path === "/cars") {
      const makeId = searchParams.get("make");
      const modelId = searchParams.get("model");
      
      if (makeId) {
        const makeName = makeModelNames[`make_${makeId}`];
        // Only show make breadcrumb if we have the actual name
        if (makeName) {
          // "Cars" link should clear make and model filters
          crumbs.push({ label: "Cars", href: buildFilteredUrl("/cars", ["make", "model"]) });
          
          if (modelId) {
            const modelName = makeModelNames[`model_${modelId}`];
            if (modelName) {
              // "Make" link should keep make but clear model
              crumbs.push({ label: makeName, href: buildFilteredUrl("/cars", ["model"]) });
              // Current model is not a link
              crumbs.push({ label: modelName });
            } else {
              // Model name not loaded yet, show make only
              crumbs.push({ label: makeName });
            }
          } else {
            // Current make is not a link
            crumbs.push({ label: makeName });
          }
        } else {
          // Make name not loaded yet, show minimal breadcrumb
          crumbs.push({ label: "Cars" });
        }
      } else {
        // No filters applied, current page
        crumbs.push({ label: "Cars" });
      }
      
      return crumbs;
    }

    // Car details page - only show full breadcrumb if we have complete listing data AND we're not navigating
    if (path.startsWith("/cars/") && listingData && listingData.make_name && listingData.model_name && !isNavigating) {
      const makeName = listingData.make_name;
      const modelName = listingData.model_name;
      const carTitle = `${makeName} ${modelName}${listingData.trim ? ` - ${listingData.trim}` : ""} ${listingData.year}`;
      
      crumbs.push({ label: "Cars", href: "/cars" });
      crumbs.push({ 
        label: makeName, 
        href: `/cars?make=${listingData.make}` 
      });
      crumbs.push({ 
        label: modelName, 
        href: `/cars?make=${listingData.make}&model=${listingData.model}` 
      });
      crumbs.push({ label: carTitle });
      
      return crumbs;
    }

    // For ALL other car detail pages (loading, navigating, or incomplete data), show minimal breadcrumbs
    if (path.startsWith("/cars/")) {
      crumbs.push({ label: "Cars", href: "/cars" });
      // Don't show loading in breadcrumbs - handled by overlay
      return crumbs;
    }

    if (path === "/sell") {
      crumbs.push({ label: "Sell Your Car" });
      return crumbs;
    }

    if (path === "/favorites") {
      crumbs.push({ label: "Favorites" });
      return crumbs;
    }

    if (path === "/blog") {
      crumbs.push({ label: "Blog" });
      return crumbs;
    }

    if (path === "/contact") {
      crumbs.push({ label: "Contact" });
      return crumbs;
    }

    if (path === "/auth") {
      crumbs.push({ label: "Sign In" });
      return crumbs;
    }

    if (path === "/admin") {
      crumbs.push({ label: "Admin Dashboard" });
      return crumbs;
    }

    if (path === "/legal/terms") {
      crumbs.push({ label: "Legal", href: "/legal/terms" });
      crumbs.push({ label: "Terms of Service" });
      return crumbs;
    }

    if (path === "/legal/privacy") {
      crumbs.push({ label: "Legal", href: "/legal/privacy" });
      crumbs.push({ label: "Privacy Policy" });
      return crumbs;
    }

    return crumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-border/20">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink asChild>
                      <Link 
                        to={crumb.href} 
                        className="text-white/80 hover:text-white transition-colors"
                        title={crumb.label}
                        onClick={() => {
                          // Clear listing data immediately for smoother transition
                          if (path.startsWith("/cars/") && path !== "/cars") {
                            setListingData(null);
                            setIsNavigating(true);
                          }
                        }}
                      >
                        {crumb.label}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-white font-medium">
                      {crumb.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Loading overlay during navigation */}
        {isNavigating && (
          <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50">
            <FadeLoader size="lg" showText={false} />
          </div>
        )}
      </div>
    </div>
  );
};