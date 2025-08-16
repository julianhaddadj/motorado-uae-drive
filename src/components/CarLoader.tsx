import { cn } from "@/lib/utils";

interface CarLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const CarLoader = ({ className, size = "md", showText = true }: CarLoaderProps) => {
  const sizeClasses = {
    sm: "w-16 h-8",
    md: "w-24 h-12", 
    lg: "w-32 h-16"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)} role="status" aria-label="Loading">
      {/* Road Line */}
      <div className="relative w-full max-w-[200px] h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent animate-pulse" />
        {/* Dashed line effect */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="flex w-full h-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="flex-1 border-r border-muted-foreground/30 last:border-r-0" 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Car Animation Container */}
      <div className={cn("relative", sizeClasses[size])}>
        {/* Car moving left to right */}
        <div className="absolute inset-0 animate-[slide-left-right_3s_ease-in-out_infinite]">
          <svg 
            viewBox="0 0 120 60" 
            className="w-full h-full text-primary"
            fill="currentColor"
            aria-hidden="true"
          >
            {/* Car Body */}
            <path d="M20 35 L25 25 L35 20 L80 20 L90 25 L95 35 L95 45 L85 45 L85 40 C85 37 82 35 79 35 L75 35 C72 35 69 37 69 40 L69 45 L51 45 L51 40 C51 37 48 35 45 35 L41 35 C38 35 35 37 35 40 L35 45 L25 45 L20 35 Z" />
            
            {/* Windows */}
            <path d="M30 25 L35 25 L40 30 L75 30 L80 25 L85 25 L85 35 L30 35 Z" fill="hsl(var(--muted))" />
            
            {/* Front Wheel */}
            <circle cx="77" cy="40" r="8" fill="hsl(var(--muted-foreground))" className="animate-spin origin-[77px_40px]" style={{ animationDuration: '0.5s' }} />
            <circle cx="77" cy="40" r="5" fill="currentColor" />
            
            {/* Rear Wheel */}
            <circle cx="43" cy="40" r="8" fill="hsl(var(--muted-foreground))" className="animate-spin origin-[43px_40px]" style={{ animationDuration: '0.5s' }} />
            <circle cx="43" cy="40" r="5" fill="currentColor" />
            
            {/* Headlight */}
            <circle cx="92" cy="30" r="3" fill="hsl(var(--accent))" className="animate-pulse" />
          </svg>
        </div>
      </div>

      {/* Loading Text */}
      {showText && (
        <span className={cn("text-muted-foreground animate-pulse font-medium", textSizes[size])}>
          Loading...
        </span>
      )}

      {/* Screen reader only text */}
      <span className="sr-only">Loading cars</span>
    </div>
  );
};