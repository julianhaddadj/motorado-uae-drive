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
            viewBox="0 0 140 60" 
            className="w-full h-full text-primary"
            fill="currentColor"
            aria-hidden="true"
          >
            {/* Sports Car Body - Low and sleek */}
            <path d="M15 42 L18 38 L25 32 L35 28 L45 26 L85 26 L95 28 L105 30 L115 32 L125 35 L130 38 L132 42 L132 48 L125 48 L125 45 C125 42 122 40 119 40 L115 40 C112 40 109 42 109 45 L109 48 L75 48 L75 45 C75 42 72 40 69 40 L65 40 C62 40 59 42 59 45 L59 48 L51 48 L51 45 C51 42 48 40 45 40 L41 40 C38 40 35 42 35 45 L35 48 L25 48 L25 45 C25 42 22 40 19 40 L15 40 C12 40 9 42 9 45 L9 48 L15 48 L15 42 Z" />
            
            {/* Windshield - Angular sports car style */}
            <path d="M28 32 L40 28 L95 28 L105 30 L120 35 L120 42 L28 42 Z" fill="hsl(var(--muted))" />
            
            {/* Side Window */}
            <path d="M45 30 L85 30 L95 32 L95 40 L45 40 Z" fill="hsl(var(--muted-foreground) / 0.3)" />
            
            {/* Spoiler */}
            <path d="M8 38 L15 36 L18 38 L15 40 L8 38 Z" fill="currentColor" />
            
            {/* Front Wheel */}
            <circle cx="109" cy="45" r="9" fill="hsl(var(--muted-foreground))" className="animate-spin origin-[109px_45px]" style={{ animationDuration: '0.4s' }} />
            <circle cx="109" cy="45" r="6" fill="currentColor" />
            <circle cx="109" cy="45" r="3" fill="hsl(var(--accent))" />
            
            {/* Rear Wheel */}
            <circle cx="59" cy="45" r="9" fill="hsl(var(--muted-foreground))" className="animate-spin origin-[59px_45px]" style={{ animationDuration: '0.4s' }} />
            <circle cx="59" cy="45" r="6" fill="currentColor" />
            <circle cx="59" cy="45" r="3" fill="hsl(var(--accent))" />
            
            {/* Headlights - Sharp angular design */}
            <path d="M125 35 L130 37 L128 40 L123 38 Z" fill="hsl(var(--accent))" className="animate-pulse" />
            
            {/* Air Intake */}
            <path d="M115 40 L125 40 L125 42 L115 42 Z" fill="hsl(var(--muted-foreground))" />
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