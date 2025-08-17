import React from 'react';

export const BackgroundSpline = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Premium gradient: Rebecca Purple → deep midnight purple → almost black */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600 via-purple-900 to-gray-900" />
      
      {/* Simplified floating glass panels - fewer elements */}
      <div className="absolute inset-0">
        {/* Large glass rectangles - reduced from 8 to 4 */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`glass-${i}`}
            className="absolute rounded-lg animate-pulse"
            style={{
              width: `${140 + (i % 2) * 40}px`,
              height: `${90 + (i % 2) * 20}px`,
              left: `${15 + (i * 20) % 60}%`,
              top: `${20 + (i * 15) % 50}%`,
              background: `rgba(168, 85, 247, ${0.1 + (i % 2) * 0.05})`,
              border: `1px solid rgba(168, 85, 247, ${0.2 + (i % 2) * 0.1})`,
              boxShadow: `0 8px 32px rgba(168, 85, 247, ${0.15 + (i % 2) * 0.1})`,
              transform: `rotate(${(i % 3 - 1) * 8}deg)`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${5 + (i % 2)}s`,
            }}
          />
        ))}
        
        {/* Medium glass panels - reduced from 12 to 6 */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`glass-med-${i}`}
            className="absolute rounded animate-pulse"
            style={{
              width: `${70 + (i % 2) * 15}px`,
              height: `${50 + (i % 2) * 10}px`,
              left: `${10 + (i * 12) % 70}%`,
              top: `${15 + (i * 10) % 60}%`,
              background: `rgba(147, 51, 234, ${0.08 + (i % 2) * 0.03})`,
              border: `1px solid rgba(147, 51, 234, ${0.15 + (i % 2) * 0.05})`,
              boxShadow: `0 4px 16px rgba(147, 51, 234, ${0.1 + (i % 2) * 0.05})`,
              transform: `rotate(${(i % 4 - 2) * 5}deg)`,
              animationDelay: `${i * 1}s`,
              animationDuration: `${4 + (i % 2)}s`,
            }}
          />
        ))}
      </div>

      {/* Simplified light streaks - reduced from 10 to 4 */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={`streak-${i}`}
            className="absolute opacity-30"
            style={{
              width: '1px',
              height: `${180 + i * 40}px`,
              left: `${20 + i * 20}%`,
              top: `${10 + i * 10}%`,
              background: `linear-gradient(180deg, 
                transparent, 
                rgba(168, 85, 247, 0.4), 
                transparent
              )`,
              transform: `rotate(${20 + (i % 2) * 10}deg)`,
              animation: `simple-streak ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Ambient glow spots - reduced and simplified */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={`glow-${i}`}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${120 + i * 20}px`,
              height: `${120 + i * 20}px`,
              left: `${25 + i * 20}%`,
              top: `${30 + i * 15}%`,
              background: `radial-gradient(circle, 
                rgba(168, 85, 247, 0.08), 
                transparent
              )`,
              filter: 'blur(30px)',
              animationDelay: `${i * 2}s`,
              animationDuration: `${6 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Reduced particles - from 25 to 8 */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              left: `${15 + (i * 10) % 70}%`,
              top: `${20 + (i * 8) % 60}%`,
              background: `rgba(168, 85, 247, 0.4)`,
              boxShadow: `0 0 4px rgba(168, 85, 247, 0.3)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + (i % 2)}s`,
            }}
          />
        ))}
      </div>

      {/* Simple overlay for depth */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            transparent 50%, 
            rgba(168, 85, 247, 0.02) 100%
          )`
        }}
      />
    </div>
  );
};