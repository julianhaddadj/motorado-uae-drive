import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/FavoriteButton";
import * as React from "react";

interface ListingCardListProps {
  id: string;
  image: string;
  title: string;
  trim?: string;
  priceAED: number;
  year: number;
  location: string;
  isPremium?: boolean;
  favorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const formatAED = (n: number) => new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(n);

export const ListingCardList = ({ 
  id, 
  image, 
  title, 
  trim,
  priceAED, 
  year, 
  location, 
  isPremium, 
  favorite, 
  onToggleFavorite 
}: ListingCardListProps) => {
  return (
    <Card className="group overflow-hidden transition-transform hover:shadow-lg">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="relative w-full sm:w-80 aspect-[16/10] sm:aspect-[4/3] flex-shrink-0 overflow-hidden">
            <img
              src={image}
              alt={`${title} ${year} for sale in ${location} - Motorado`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            {isPremium && (
              <div className="absolute left-3 top-3">
                <Badge className="bg-primary text-primary-foreground shadow-md">Premium</Badge>
              </div>
            )}
            <div className="absolute right-3 top-3">
              <FavoriteButton active={favorite} onClick={onToggleFavorite} />
            </div>
          </div>
          
          {/* Content Section */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between min-h-[120px]">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold line-clamp-2">
                  {title}{trim && ` - ${trim}`}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{year} • {location}</p>
              </div>
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-bold text-foreground">{formatAED(priceAED)}</div>
              </div>
            </div>
            
            {/* Additional details can be added here for list view */}
            <div className="mt-4 pt-4 border-t border-border/50 hidden sm:block">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Year: {year}</span>
                <span>•</span>
                <span>Location: {location}</span>
                {isPremium && (
                  <>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs">Premium Listing</Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};