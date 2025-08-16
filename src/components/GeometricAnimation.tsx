import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GeometricAnimationProps {
  className?: string;
  particleCount?: number;
}

export const GeometricAnimation = ({ className, particleCount = 15 }: GeometricAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 6}s`;
      container.appendChild(particle);
    }

    return () => {
      container.innerHTML = '';
    };
  }, [particleCount]);

  return (
    <div className={cn("particles", className)} ref={containerRef}>
      {/* Geometric triangle shape inspired by Influint */}
      <svg
        className="absolute right-1/4 top-1/4 h-32 w-32 opacity-20 animate-[float_8s_ease-in-out_infinite]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M50 10 L85 70 L15 70 Z"
          stroke="hsl(var(--brand))"
          strokeWidth="0.5"
          fill="hsl(var(--brand) / 0.05)"
          className="animate-pulse"
        />
        <path
          d="M50 20 L75 60 L25 60 Z"
          stroke="hsl(var(--accent))"
          strokeWidth="0.3"
          fill="hsl(var(--accent) / 0.03)"
        />
        {/* Connection lines */}
        <line x1="50" y1="10" x2="50" y2="35" stroke="hsl(var(--brand) / 0.3)" strokeWidth="0.5" />
        <line x1="15" y1="70" x2="35" y2="50" stroke="hsl(var(--brand) / 0.3)" strokeWidth="0.5" />
        <line x1="85" y1="70" x2="65" y2="50" stroke="hsl(var(--brand) / 0.3)" strokeWidth="0.5" />
      </svg>

      {/* Additional geometric elements */}
      <div className="absolute left-3/4 top-1/2 h-16 w-16 opacity-10 animate-[spin_20s_linear_infinite]">
        <svg viewBox="0 0 50 50" fill="none">
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="hsl(var(--accent))"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
          <circle
            cx="25"
            cy="25"
            r="12"
            stroke="hsl(var(--brand))"
            strokeWidth="0.3"
          />
        </svg>
      </div>

      {/* Dots pattern */}
      <div className="absolute left-1/3 bottom-1/3 grid grid-cols-4 gap-2 opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-1 w-1 rounded-full bg-brand animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};