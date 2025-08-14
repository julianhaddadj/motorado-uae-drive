import { useLocation, Link } from "react-router-dom";
import { getListingBySlug } from "@/data/listings";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const BreadcrumbNavigation = () => {
  const location = useLocation();
  const path = location.pathname;

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    if (path === "/") {
      return [];
    }

    if (path === "/cars") {
      crumbs.push({ label: "Cars" });
      return crumbs;
    }

    if (path.startsWith("/cars/")) {
      const slug = path.replace("/cars/", "");
      const listing = getListingBySlug(slug);
      
      if (listing) {
        crumbs.push({ label: "Cars", href: "/cars" });
        crumbs.push({ label: listing.make, href: `/cars?make=${listing.make}` });
        crumbs.push({ label: listing.model, href: `/cars?make=${listing.make}&model=${listing.model}` });
        crumbs.push({ label: listing.year.toString() });
        return crumbs;
      }
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
                      <Link to={crumb.href} className="text-muted-foreground hover:text-foreground">
                        {crumb.label}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
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