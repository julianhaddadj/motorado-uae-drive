import Spline from '@splinetool/react-spline';
import { Suspense, useState } from 'react';

export const BackgroundSpline = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Visible fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/30 animate-pulse" />
      
      <Suspense fallback={
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse">
          <div className="absolute top-4 left-4 text-white text-sm bg-black/50 p-2 rounded">
            Loading Spline...
          </div>
        </div>
      }>
        <div className="relative w-full h-full">
          {!isLoaded && !hasError && (
            <div className="absolute top-4 left-4 text-white text-sm bg-black/50 p-2 rounded z-10">
              Spline Loading...
            </div>
          )}
          {hasError && (
            <div className="absolute top-4 left-4 text-red-400 text-sm bg-black/50 p-2 rounded z-10">
              Spline Failed to Load
            </div>
          )}
          <Spline 
            scene="https://prod.spline.design/1EllGAaoydopnyYSBOvdkeOh/scene.splinecode"
            onLoad={() => {
              console.log('Spline loaded successfully');
              setIsLoaded(true);
            }}
            onError={(error) => {
              console.error('Spline error:', error);
              setHasError(true);
            }}
            style={{
              width: '100%',
              height: '100%',
              opacity: isLoaded ? 0.7 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
          />
        </div>
      </Suspense>
    </div>
  );
};