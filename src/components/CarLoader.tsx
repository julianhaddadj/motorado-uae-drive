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
            viewBox="0 0 160 80" 
            className="w-full h-full text-primary"
            fill="currentColor"
            aria-hidden="true"
          >
            {/* Main Body - Realistic car silhouette */}
            <path d="M25 55 C25 52 28 50 32 50 L35 50 C35 48 37 46 40 46 L42 46 C45 44 50 42 55 40 L65 38 L75 36 L95 36 L105 37 L115 39 L125 42 C128 43 130 45 132 47 L135 50 C138 50 140 52 140 55 L140 62 C140 64 138 66 135 66 L132 66 C132 69 129 72 125 72 L120 72 C116 72 113 69 113 66 L113 62 L85 62 L85 66 C85 69 82 72 78 72 L73 72 C69 72 66 69 66 66 L66 62 L55 62 L55 66 C55 69 52 72 48 72 L43 72 C39 72 36 69 36 66 L36 62 L32 62 C28 62 25 59 25 55 Z" />
            
            {/* Hood line */}
            <path d="M40 46 L125 42 L132 47" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" fill="none" />
            
            {/* Windshield - Realistic angle */}
            <path d="M42 46 L50 40 L110 40 L125 42 L125 55 L42 55 Z" fill="hsl(var(--muted) / 0.8)" />
            
            {/* Side Windows */}
            <path d="M52 42 L108 42 L120 44 L120 53 L52 53 Z" fill="hsl(var(--muted) / 0.6)" />
            
            {/* Door lines */}
            <path d="M70 46 L70 60" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
            <path d="M95 46 L95 60" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
            
            {/* Side mirrors */}
            <ellipse cx="45" cy="48" rx="2" ry="1.5" fill="hsl(var(--muted-foreground))" />
            <ellipse cx="118" cy="46" rx="2" ry="1.5" fill="hsl(var(--muted-foreground))" />
            
            {/* Front grille */}
            <path d="M132 50 L140 52 L140 58 L132 56 Z" fill="hsl(var(--muted-foreground))" />
            <path d="M134 52 L138 53 M134 54 L138 55 M134 56 L138 57" stroke="hsl(var(--background))" strokeWidth="0.3" />
            
            {/* Rear Wheel - More realistic */}
            <circle cx="55" cy="62" r="12" fill="hsl(var(--muted-foreground))" className="animate-spin origin-[55px_62px]" style={{ animationDuration: '0.3s' }} />
            <circle cx="55" cy="62" r="9" fill="hsl(var(--card))" />
            <circle cx="55" cy="62" r="6" fill="currentColor" />
            {/* Wheel spokes */}
            <g className="animate-spin origin-[55px_62px]" style={{ animationDuration: '0.3s' }}>
              <path d="M55 56 L55 68 M49 62 L61 62 M51 57 L59 67 M59 57 L51 67" stroke="hsl(var(--accent))" strokeWidth="1" />
            </g>
            <circle cx="55" cy="62" r="3" fill="hsl(var(--muted-foreground))" />
            
            {/* Front Wheel - More realistic */}
            <circle cx="113" cy="62" r="12" fill="hsl(var(--muted-foreground))" className="animate-spin origin-[113px_62px]" style={{ animationDuration: '0.3s' }} />
            <circle cx="113" cy="62" r="9" fill="hsl(var(--card))" />
            <circle cx="113" cy="62" r="6" fill="currentColor" />
            {/* Wheel spokes */}
            <g className="animate-spin origin-[113px_62px]" style={{ animationDuration: '0.3s' }}>
              <path d="M113 56 L113 68 M107 62 L119 62 M109 57 L117 67 M117 57 L109 67" stroke="hsl(var(--accent))" strokeWidth="1" />
            </g>
            <circle cx="113" cy="62" r="3" fill="hsl(var(--muted-foreground))" />
            
            {/* Headlights - Realistic shape */}
            <ellipse cx="135" cy="50" rx="3" ry="4" fill="hsl(var(--accent))" className="animate-pulse" />
            <ellipse cx="135" cy="58" rx="3" ry="2" fill="hsl(var(--accent) / 0.7)" />
            
            {/* Taillights */}
            <ellipse cx="30" cy="52" rx="2" ry="3" fill="hsl(var(--destructive) / 0.8)" />
            
            {/* License plate area */}
            <rect x="128" y="54" width="8" height="3" rx="0.5" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.2" />
            
            {/* Antenna */}
            <path d="M90 40 L90 35" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
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