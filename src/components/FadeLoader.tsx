import { cn } from "@/lib/utils";

interface FadeLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const FadeLoader = ({ className, size = "md", showText = false }: FadeLoaderProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24", 
    lg: "w-32 h-32"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <div 
      className={cn("flex flex-col items-center gap-4 animate-[fadeIn_0.8s_ease-out] opacity-0", className)} 
      role="status" 
      aria-label="Loading"
      style={{ 
        animation: 'fadeIn 0.8s ease-out forwards',
      }}
    >
      {/* Main loading circle with fade animation */}
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer ring with pulse */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" />
        
        {/* Inner circles with different fade timings */}
        <div className="absolute inset-4 rounded-full bg-primary/30 animate-[pulse_2s_ease-in-out_infinite]" />
        <div className="absolute inset-6 rounded-full bg-primary/50 animate-[pulse_2s_ease-in-out_infinite_0.5s]" />
        <div className="absolute inset-8 rounded-full bg-primary/70 animate-[pulse_2s_ease-in-out_infinite_1s]" />
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-primary animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>
        
        {/* Rotating gradient border */}
        <div className="absolute inset-0 rounded-full opacity-60 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-transparent to-accent opacity-50" />
        </div>
      </div>

      {/* Floating dots around the main loader */}
      <div className="absolute">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/40"
            style={{
              left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}px`,
              top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}px`,
              animation: `pulse 2s ease-in-out infinite ${i * 0.2}s`,
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