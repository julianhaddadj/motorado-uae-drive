import React from 'react';

export const BackgroundSpline = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" style={{ perspective: '1000px' }}>
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-pink-600/30 animate-pulse" />
      
      {/* 3D Floating geometric shapes - Layer 1 */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-20 left-20 w-32 h-32 rounded-full animate-bounce"
          style={{ 
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.4))',
            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)',
            animationDelay: '0s', 
            animationDuration: '6s',
            transform: 'rotateX(15deg) rotateY(15deg)',
            filter: 'blur(1px)'
          }} 
        />
        <div 
          className="absolute top-40 right-32 w-24 h-24 rounded-full animate-bounce"
          style={{ 
            background: 'linear-gradient(225deg, rgba(147, 51, 234, 0.7), rgba(236, 72, 153, 0.5))',
            boxShadow: '0 15px 35px rgba(147, 51, 234, 0.4), 0 0 50px rgba(236, 72, 153, 0.3)',
            animationDelay: '2s', 
            animationDuration: '8s',
            transform: 'rotateX(-10deg) rotateY(20deg)',
            filter: 'blur(0.5px)'
          }} 
        />
        <div 
          className="absolute bottom-32 left-32 w-40 h-40 rounded-full animate-bounce"
          style={{ 
            background: 'linear-gradient(315deg, rgba(236, 72, 153, 0.5), rgba(59, 130, 246, 0.6))',
            boxShadow: '0 25px 50px rgba(236, 72, 153, 0.3), 0 0 80px rgba(59, 130, 246, 0.2)',
            animationDelay: '4s', 
            animationDuration: '10s',
            transform: 'rotateX(20deg) rotateY(-15deg)',
            filter: 'blur(2px)'
          }} 
        />
        <div 
          className="absolute bottom-20 right-20 w-28 h-28 rounded-full animate-bounce"
          style={{ 
            background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.6))',
            boxShadow: '0 18px 42px rgba(59, 130, 246, 0.4), 0 0 65px rgba(147, 51, 234, 0.3)',
            animationDelay: '1s', 
            animationDuration: '7s',
            transform: 'rotateX(-20deg) rotateY(10deg)',
            filter: 'blur(1.5px)'
          }} 
        />
      </div>
      
      {/* 3D Floating geometric shapes - Layer 2 (smaller, more depth) */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-60 left-60 w-16 h-16 rounded-lg animate-pulse rotate-45"
          style={{ 
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.7), rgba(168, 85, 247, 0.5))',
            boxShadow: '0 12px 25px rgba(99, 102, 241, 0.4), inset 0 0 20px rgba(168, 85, 247, 0.2)',
            animationDelay: '3s', 
            animationDuration: '5s',
            transform: 'rotateX(30deg) rotateY(-25deg) rotateZ(45deg)',
          }} 
        />
        <div 
          className="absolute top-80 right-60 w-20 h-20 rounded-lg animate-pulse rotate-12"
          style={{ 
            background: 'linear-gradient(225deg, rgba(168, 85, 247, 0.6), rgba(236, 72, 153, 0.7))',
            boxShadow: '0 14px 30px rgba(168, 85, 247, 0.3), inset 0 0 25px rgba(236, 72, 153, 0.2)',
            animationDelay: '1.5s', 
            animationDuration: '6s',
            transform: 'rotateX(-25deg) rotateY(30deg) rotateZ(12deg)',
          }} 
        />
        <div 
          className="absolute bottom-60 left-60 w-12 h-12 rounded-full animate-spin"
          style={{ 
            background: 'linear-gradient(315deg, rgba(236, 72, 153, 0.8), rgba(59, 130, 246, 0.6))',
            boxShadow: '0 8px 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
            animationDelay: '2.5s', 
            animationDuration: '4s',
            transform: 'rotateX(45deg) rotateY(-10deg)',
          }} 
        />
      </div>
      
      {/* Enhanced 3D grid pattern with depth */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.4) 2px, transparent 2px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.4) 2px, transparent 2px),
            linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          animation: 'drift 20s ease-in-out infinite, gridPulse 8s ease-in-out infinite',
          transform: 'rotateX(60deg) translateZ(-50px)',
          transformOrigin: 'center center'
        }} />
      </div>
      
      {/* Floating particles for extra depth */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, rgba(${Math.random() > 0.5 ? '59, 130, 246' : '147, 51, 234'}, 0.8), transparent)`,
              boxShadow: `0 0 20px rgba(${Math.random() > 0.5 ? '59, 130, 246' : '147, 51, 234'}, 0.6)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              transform: `translateZ(${Math.random() * 100 - 50}px)`
            }}
          />
        ))}
      </div>
    </div>
  );
};