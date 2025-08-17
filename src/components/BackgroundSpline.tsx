import React from 'react';

export const BackgroundSpline = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base gradient: Rebecca Purple → violet → indigo */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600 via-violet-700 to-indigo-900" />
      
      {/* 3D Grid floor extending to horizon */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          perspective: '800px',
          perspectiveOrigin: 'center 60%'
        }}
      >
        {/* Main grid floor */}
        <div 
          className="absolute bottom-0 left-0 w-full h-full"
          style={{
            background: `
              linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px),
              linear-gradient(0deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'rotateX(75deg) translateY(50%)',
            transformOrigin: 'center bottom',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)'
          }}
        />
        
        {/* Secondary finer grid */}
        <div 
          className="absolute bottom-0 left-0 w-full h-full"
          style={{
            background: `
              linear-gradient(90deg, rgba(139, 92, 246, 0.2) 1px, transparent 1px),
              linear-gradient(0deg, rgba(139, 92, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            transform: 'rotateX(75deg) translateY(50%)',
            transformOrigin: 'center bottom',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)'
          }}
        />
      </div>

      {/* Glowing pulse lines traveling along grid */}
      <div className="absolute inset-0">
        {/* Horizontal traveling pulses */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px"
            style={{
              bottom: `${15 + i * 8}%`,
              background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.8), rgba(147, 51, 234, 1), rgba(168, 85, 247, 0.8), transparent)',
              boxShadow: '0 0 10px rgba(168, 85, 247, 0.6)',
              animation: `pulse-horizontal-${i % 2} ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
              transform: `perspective(800px) rotateX(75deg) translateY(${i * 5}px)`,
              transformOrigin: 'center bottom'
            }}
          />
        ))}
        
        {/* Vertical traveling pulses */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px"
            style={{
              left: `${20 + i * 12}%`,
              background: 'linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.6), rgba(124, 58, 237, 0.8), rgba(139, 92, 246, 0.6), transparent)',
              boxShadow: '0 0 8px rgba(139, 92, 246, 0.4)',
              animation: `pulse-vertical ${3 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 1.2}s`,
              transform: `perspective(800px) rotateX(75deg)`,
              transformOrigin: 'center bottom',
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)'
            }}
          />
        ))}
      </div>

      {/* Speedometer-like rings around hero section */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer ring */}
        <div 
          className="absolute w-96 h-96 rounded-full border border-purple-400/30 animate-spin"
          style={{
            animationDuration: '20s',
            boxShadow: 'inset 0 0 20px rgba(168, 85, 247, 0.2), 0 0 20px rgba(168, 85, 247, 0.1)'
          }}
        >
          {/* Ring segments */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 bg-gradient-to-t from-purple-400/60 to-transparent"
              style={{
                top: '-16px',
                left: '50%',
                transformOrigin: '50% 208px',
                transform: `translateX(-50%) rotate(${i * 30}deg)`,
                animation: `segment-glow ${2 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
        
        {/* Middle ring */}
        <div 
          className="absolute w-72 h-72 rounded-full border border-violet-400/40 animate-spin"
          style={{
            animationDuration: '15s',
            animationDirection: 'reverse',
            boxShadow: 'inset 0 0 15px rgba(139, 92, 246, 0.3)'
          }}
        />
        
        {/* Inner ring */}
        <div 
          className="absolute w-48 h-48 rounded-full border border-indigo-400/50 animate-spin"
          style={{
            animationDuration: '10s',
            boxShadow: 'inset 0 0 10px rgba(99, 102, 241, 0.4), 0 0 15px rgba(99, 102, 241, 0.2)'
          }}
        />
      </div>

      {/* Curved arcs for extra futuristic feel */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-40">
          {/* Top left arc */}
          <path
            d="M 0,100 Q 100,50 200,100"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="2"
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          />
          {/* Top right arc */}
          <path
            d="M 100,50 Q 150,20 200,50"
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="1.5"
            className="animate-pulse"
            style={{ animationDuration: '4s', animationDelay: '1s' }}
            transform="translate(60%, 0)"
          />
          {/* Bottom arcs */}
          <path
            d="M 0,80 Q 50,60 100,80"
            fill="none"
            stroke="url(#gradient3)"
            strokeWidth="1"
            className="animate-pulse"
            style={{ animationDuration: '5s', animationDelay: '2s' }}
            transform="translate(0, 70%)"
          />
          
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
              <stop offset="50%" stopColor="rgba(99, 102, 241, 0.7)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Ambient particles for atmosphere */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(${i % 3 === 0 ? '168, 85, 247' : i % 3 === 1 ? '139, 92, 246' : '99, 102, 241'}, 0.8), transparent)`,
              boxShadow: `0 0 6px rgba(${i % 3 === 0 ? '168, 85, 247' : i % 3 === 1 ? '139, 92, 246' : '99, 102, 241'}, 0.6)`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + (i % 4)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};