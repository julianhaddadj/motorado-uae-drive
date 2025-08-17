import React from 'react';

export const BackgroundSpline = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Premium gradient: Rebecca Purple → deep midnight purple → almost black */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600 via-purple-900 to-gray-900" />
      
      {/* Floating glass panels with backdrop blur */}
      <div className="absolute inset-0">
        {/* Large floating glass rectangles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`glass-${i}`}
            className="absolute rounded-lg backdrop-blur-sm animate-pulse"
            style={{
              width: `${120 + (i % 3) * 40}px`,
              height: `${80 + (i % 2) * 30}px`,
              left: `${10 + (i * 12) % 75}%`,
              top: `${15 + (i * 8) % 70}%`,
              background: `linear-gradient(135deg, 
                rgba(168, 85, 247, ${0.1 + (i % 3) * 0.05}), 
                rgba(236, 72, 153, ${0.08 + (i % 2) * 0.04}),
                rgba(147, 51, 234, ${0.12 + (i % 4) * 0.03})
              )`,
              border: `1px solid rgba(168, 85, 247, ${0.2 + (i % 3) * 0.1})`,
              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 8px 32px rgba(168, 85, 247, ${0.15 + (i % 2) * 0.1}),
                0 0 0 1px rgba(168, 85, 247, 0.05)
              `,
              transform: `rotate(${(i % 4 - 2) * 8}deg) translateZ(${i * 5}px)`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          />
        ))}
        
        {/* Medium floating glass panels */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`glass-med-${i}`}
            className="absolute rounded backdrop-blur-sm animate-pulse"
            style={{
              width: `${60 + (i % 2) * 20}px`,
              height: `${40 + (i % 3) * 15}px`,
              left: `${5 + (i * 8) % 85}%`,
              top: `${10 + (i * 7) % 80}%`,
              background: `linear-gradient(45deg, 
                rgba(147, 51, 234, ${0.08 + (i % 2) * 0.04}), 
                rgba(168, 85, 247, ${0.06 + (i % 3) * 0.03})
              )`,
              border: `1px solid rgba(147, 51, 234, ${0.15 + (i % 2) * 0.08})`,
              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.08),
                0 4px 16px rgba(147, 51, 234, ${0.1 + (i % 2) * 0.05})
              `,
              transform: `rotate(${(i % 6 - 3) * 5}deg)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 4)}s`,
            }}
          />
        ))}
        
        {/* Small accent glass pieces */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`glass-small-${i}`}
            className="absolute rounded-sm backdrop-blur-sm animate-pulse"
            style={{
              width: `${20 + (i % 2) * 10}px`,
              height: `${15 + (i % 3) * 8}px`,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 85}%`,
              background: `rgba(168, 85, 247, ${0.05 + (i % 3) * 0.02})`,
              border: `1px solid rgba(168, 85, 247, ${0.1 + (i % 2) * 0.05})`,
              boxShadow: `0 2px 8px rgba(168, 85, 247, ${0.08 + (i % 2) * 0.04})`,
              transform: `rotate(${(i % 8 - 4) * 10}deg)`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* Diagonal light streaks - glass reflections */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`streak-${i}`}
            className="absolute opacity-40"
            style={{
              width: '2px',
              height: `${200 + i * 50}px`,
              left: `${15 + i * 15}%`,
              top: `${-10 + i * 5}%`,
              background: `linear-gradient(180deg, 
                transparent, 
                rgba(168, 85, 247, 0.6), 
                rgba(236, 72, 153, 0.4), 
                transparent
              )`,
              transform: `rotate(${25 + (i % 3) * 5}deg)`,
              boxShadow: `0 0 8px rgba(168, 85, 247, 0.4)`,
              animation: `streak-move-${i % 2} ${6 + i}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
        
        {/* Additional crossing streaks */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`cross-streak-${i}`}
            className="absolute opacity-30"
            style={{
              width: '1px',
              height: `${150 + i * 30}px`,
              right: `${10 + i * 20}%`,
              top: `${5 + i * 10}%`,
              background: `linear-gradient(180deg, 
                transparent, 
                rgba(147, 51, 234, 0.5), 
                rgba(168, 85, 247, 0.3), 
                transparent
              )`,
              transform: `rotate(${-20 - (i % 2) * 10}deg)`,
              boxShadow: `0 0 6px rgba(147, 51, 234, 0.3)`,
              animation: `streak-move-cross ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Ambient glow spots for showroom lighting */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={`glow-${i}`}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${100 + i * 20}px`,
              height: `${100 + i * 20}px`,
              left: `${20 + i * 15}%`,
              top: `${25 + i * 12}%`,
              background: `radial-gradient(circle, 
                rgba(168, 85, 247, ${0.1 + (i % 2) * 0.05}), 
                rgba(147, 51, 234, ${0.05 + (i % 3) * 0.02}), 
                transparent
              )`,
              filter: 'blur(20px)',
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${4 + (i % 2)}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle floating particles for premium atmosphere */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, 
                rgba(${i % 3 === 0 ? '168, 85, 247' : i % 3 === 1 ? '147, 51, 234' : '236, 72, 153'}, 0.6), 
                transparent
              )`,
              boxShadow: `0 0 4px rgba(${i % 3 === 0 ? '168, 85, 247' : i % 3 === 1 ? '147, 51, 234' : '236, 72, 153'}, 0.4)`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + (i % 4)}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Premium glass overlay for extra depth */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            transparent 50%, 
            rgba(168, 85, 247, 0.02) 100%
          )`,
          backdropFilter: 'blur(1px)',
        }}
      />
    </div>
  );
};