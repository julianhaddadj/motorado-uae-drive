import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import * as React from "react";

interface FavoriteButtonProps {
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const FavoriteButton = ({ active, onClick }: FavoriteButtonProps) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.(e);
      }}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "inline-flex items-center justify-center rounded-full border p-2 shadow-sm transition-colors",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background/80 backdrop-blur text-foreground hover:bg-accent"
      )}
    >
      <Heart className={cn("h-4 w-4", active && "fill-current")} />
    </button>
  );
};
