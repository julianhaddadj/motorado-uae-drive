import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/FavoriteButton";
import * as React from "react";

interface ListingCardProps {
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

export const ListingCard = ({ id, image, title, trim, priceAED, year, location, isPremium, favorite, onToggleFavorite }: ListingCardProps) => {
  return (
    <Card className="group overflow-hidden transition-transform hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
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
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="line-clamp-1 text-base font-semibold">
              {title}{trim && ` - ${trim}`}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{year} • {location}</p>
          </div>
          <div className="text-right text-base font-bold text-foreground">{formatAED(priceAED)}</div>
        </div>
      </CardContent>
    </Card>
  );
};
