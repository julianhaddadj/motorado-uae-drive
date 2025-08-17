import React from 'react';

export const BackgroundSpline = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-pink-900/10 animate-pulse" />
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '6s' }} />
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-lg animate-bounce" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-r from-pink-500/15 to-blue-500/15 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '4s', animationDuration: '10s' }} />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-blue-500/25 to-purple-500/25 rounded-full blur-xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '7s' }} />
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'drift 20s ease-in-out infinite'
        }} />
      </div>
    </div>
  );
};