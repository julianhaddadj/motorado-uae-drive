import React from 'react';

export const BackgroundSpline = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* White to purple gradient background */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-surface)' }} />
    </div>
  );
};