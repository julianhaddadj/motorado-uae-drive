import { useLocation, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListingBySlug } from "@/data/listings";
import { supabase } from "@/integrations/supabase/client";
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

  // Fetch make and model names for IDs
  useEffect(() => {
    const fetchNames = async () => {
      const makeId = searchParams.get("make");
      const modelId = searchParams.get("model");
      const newNames: {[key: string]: string} = {};

      if (makeId && !makeModelNames[`make_${makeId}`]) {
        try {
          const { data } = await supabase
            .from('makes')
            .select('name')
            .eq('id', makeId)
            .single();
          if (data) newNames[`make_${makeId}`] = data.name;
        } catch (error) {
          console.error('Error fetching make name:', error);
        }
      }

      if (modelId && !makeModelNames[`model_${modelId}`]) {
        try {
          const { data } = await supabase
            .from('models')
            .select('name')
            .eq('id', modelId)
            .single();
          if (data) newNames[`model_${modelId}`] = data.name;
        } catch (error) {
          console.error('Error fetching model name:', error);
        }
      }

      if (Object.keys(newNames).length > 0) {
        setMakeModelNames(prev => ({ ...prev, ...newNames }));
      }
    };

    fetchNames();
  }, [searchParams, makeModelNames]);

  // Fetch listing data for car details pages
  useEffect(() => {
    const fetchListingData = async () => {
      if (path.startsWith("/cars/") && path !== "/cars") {
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
      
      crumbs.push({ label: "Cars" });
      
      if (makeId) {
        const makeName = makeModelNames[`make_${makeId}`] || makeId;
        crumbs[crumbs.length - 1].href = buildFilteredUrl("/cars", ["make", "model"]);
        crumbs.push({ label: makeName });
        
        if (modelId) {
          const modelName = makeModelNames[`model_${modelId}`] || modelId;
          crumbs[crumbs.length - 1].href = buildFilteredUrl("/cars", ["model"]);
          crumbs.push({ label: modelName });
        }
      }
      
      return crumbs;
    }

    // Car details page
    if (path.startsWith("/cars/") && listingData) {
      const makeName = listingData.make_name || listingData.make;
      const modelName = listingData.model_name || listingData.model;
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
    <div className="border-b bg-muted/30">
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
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        title={crumb.label}
                      >
                        {crumb.label}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-foreground font-medium">
                      {crumb.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};