import { cn } from "@/lib/utils";

interface FadeLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const FadeLoader = ({ className, size = "md", showText = false }: FadeLoaderProps) => {
  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32", 
    lg: "w-48 h-48"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <div 
      className={cn("flex flex-col items-center gap-6 animate-[fadeIn_0.8s_ease-out] opacity-0", className)} 
      role="status" 
      aria-label="Loading"
      style={{ 
        animation: 'fadeIn 0.8s ease-out forwards',
      }}
    >
      {/* Main loading circle with fade animation */}
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer ring with pulse */}
        <div className="absolute inset-0 rounded-full border-8 border-primary/20 animate-pulse" />
        
        {/* Inner circles with different fade timings */}
        <div className="absolute inset-6 rounded-full bg-primary/30 animate-[pulse_2s_ease-in-out_infinite]" />
        <div className="absolute inset-10 rounded-full bg-primary/50 animate-[pulse_2s_ease-in-out_infinite_0.5s]" />
        <div className="absolute inset-14 rounded-full bg-primary/70 animate-[pulse_2s_ease-in-out_infinite_1s]" />
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-primary animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>
        
        {/* Rotating gradient border */}
        <div className="absolute inset-0 rounded-full opacity-70 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-transparent to-accent opacity-60" />
        </div>
      </div>

      {/* Floating dots around the main loader */}
      <div className="absolute">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-primary/50"
            style={{
              left: `${75 + 60 * Math.cos((i * Math.PI * 2) / 8)}px`,
              top: `${75 + 60 * Math.sin((i * Math.PI * 2) / 8)}px`,
              animation: `pulse 2s ease-in-out infinite ${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Loading Text with fade */}
      {showText && (
        <span className={cn("text-muted-foreground font-medium animate-[pulse_1.8s_ease-in-out_infinite]", textSizes[size])}>
          Loading cars...
        </span>
      )}

      {/* Screen reader only text */}
      <span className="sr-only">Loading car listings</span>
    </div>
  );
};