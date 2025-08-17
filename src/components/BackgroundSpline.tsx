import React from 'react';

export const BackgroundSpline = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50">
      
      {/* Animated dot grid pattern similar to Influint */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => {
          const row = Math.floor(i / 20);
          const col = i % 20;
          const x = (col * 5) + 2.5;
          const y = (row * 10) + 5;
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-pulse"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                background: `radial-gradient(circle, rgba(59, 130, 246, ${0.3 + Math.sin(i * 0.1) * 0.2}), transparent)`,
                boxShadow: `0 0 8px rgba(59, 130, 246, ${0.2 + Math.sin(i * 0.1) * 0.1})`,
                animationDelay: `${(i * 0.05) % 4}s`,
                animationDuration: `${3 + (i % 3)}s`,
                transform: `translateZ(${Math.sin(i * 0.3) * 20}px)`,
              }}
            />
          );
        })}
      </div>

      {/* Central 3D geometric wireframe element */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-96 h-96" style={{ perspective: '800px' }}>
          {/* Main wireframe structure */}
          <div 
            className="absolute inset-0 animate-spin"
            style={{ 
              animationDuration: '20s',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Wireframe lines creating a 3D arrow/crystal shape */}
            <div className="absolute w-full h-full">
              {/* Vertical lines */}
              <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-300/60 to-transparent transform -translate-x-0.5" />
              <div className="absolute left-1/4 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent transform -translate-x-0.5" />
              <div className="absolute right-1/4 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent transform translate-x-0.5" />
              
              {/* Horizontal lines */}
              <div className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-300/60 to-transparent transform -translate-y-0.5" />
              <div className="absolute top-1/4 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent transform -translate-y-0.5" />
              <div className="absolute bottom-1/4 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent transform translate-y-0.5" />
              
              {/* Diagonal lines creating depth */}
              <div 
                className="absolute top-0 left-1/2 w-px h-1/2 bg-gradient-to-b from-blue-300/60 to-transparent origin-bottom"
                style={{ transform: 'translateX(-0.5px) rotateZ(45deg)' }}
              />
              <div 
                className="absolute top-0 left-1/2 w-px h-1/2 bg-gradient-to-b from-blue-300/60 to-transparent origin-bottom"
                style={{ transform: 'translateX(-0.5px) rotateZ(-45deg)' }}
              />
              <div 
                className="absolute bottom-0 left-1/2 w-px h-1/2 bg-gradient-to-t from-blue-300/60 to-transparent origin-top"
                style={{ transform: 'translateX(-0.5px) rotateZ(45deg)' }}
              />
              <div 
                className="absolute bottom-0 left-1/2 w-px h-1/2 bg-gradient-to-t from-blue-300/60 to-transparent origin-top"
                style={{ transform: 'translateX(-0.5px) rotateZ(-45deg)' }}
              />
            </div>
          </div>

          {/* Rotating outer frame */}
          <div 
            className="absolute inset-8 border border-blue-200/40 animate-spin"
            style={{ 
              animationDuration: '30s',
              animationDirection: 'reverse',
              borderRadius: '50%',
              boxShadow: 'inset 0 0 20px rgba(59, 130, 246, 0.1)'
            }}
          />
          
          {/* Inner rotating ring */}
          <div 
            className="absolute inset-16 border border-blue-300/60 animate-spin"
            style={{ 
              animationDuration: '15s',
              borderRadius: '50%',
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)'
            }}
          />
        </div>
      </div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full animate-pulse"
            style={{
              left: `${10 + (i * 4.5) % 80}%`,
              top: `${15 + (i * 7.3) % 70}%`,
              background: `radial-gradient(circle, rgba(99, 102, 241, ${0.4 + Math.sin(i) * 0.2}), transparent)`,
              boxShadow: `0 0 4px rgba(99, 102, 241, ${0.3 + Math.sin(i) * 0.1})`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + (i % 3)}s`,
              transform: `translateY(${Math.sin(i * 0.5) * 10}px)`,
            }}
          />
        ))}
      </div>

      {/* Subtle connecting lines between some dots */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full">
          {[...Array(15)].map((_, i) => {
            const x1 = (i * 6.7) % 100;
            const y1 = (i * 8.3) % 100;
            const x2 = ((i + 1) * 6.7) % 100;
            const y2 = ((i + 1) * 8.3) % 100;
            
            return (
              <line
                key={i}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="rgba(59, 130, 246, 0.15)"
                strokeWidth="0.5"
                className="animate-pulse"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${5 + (i % 4)}s`
                }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};