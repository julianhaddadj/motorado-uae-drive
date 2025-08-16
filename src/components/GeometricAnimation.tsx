import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GeometricAnimationProps {
  className?: string;
  particleCount?: number;
}

export const GeometricAnimation = ({ className, particleCount = 20 }: GeometricAnimationProps) => {
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
      particle.style.animationDuration = `${4 + Math.random() * 4}s`;
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
        className="absolute right-1/4 top-1/4 h-40 w-40 opacity-30 animate-[float_12s_ease-in-out_infinite]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M50 10 L85 70 L15 70 Z"
          stroke="hsl(var(--brand))"
          strokeWidth="0.8"
          fill="hsl(var(--brand) / 0.08)"
          className="animate-pulse"
        />
        <path
          d="M50 20 L75 60 L25 60 Z"
          stroke="hsl(var(--accent))"
          strokeWidth="0.5"
          fill="hsl(var(--accent) / 0.05)"
        />
        {/* Connection lines */}
        <line x1="50" y1="10" x2="50" y2="35" stroke="hsl(var(--brand) / 0.4)" strokeWidth="0.8" />
        <line x1="15" y1="70" x2="35" y2="50" stroke="hsl(var(--brand) / 0.4)" strokeWidth="0.8" />
        <line x1="85" y1="70" x2="65" y2="50" stroke="hsl(var(--brand) / 0.4)" strokeWidth="0.8" />
      </svg>

      {/* Additional geometric elements */}
      <div className="absolute left-3/4 top-1/2 h-20 w-20 opacity-20 animate-[spin_25s_linear_infinite]">
        <svg viewBox="0 0 50 50" fill="none">
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="hsl(var(--accent))"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
          <circle
            cx="25"
            cy="25"
            r="12"
            stroke="hsl(var(--brand))"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Dots pattern */}
      <div className="absolute left-1/3 bottom-1/3 grid grid-cols-4 gap-3 opacity-25">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse"
            style={{ animationDelay: `${i * 0.3}s`, animationDuration: '3s' }}
          />
        ))}
      </div>
    </div>
  );
};