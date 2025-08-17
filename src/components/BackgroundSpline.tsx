import Spline from '@splinetool/react-spline';
import { Suspense } from 'react';

export const BackgroundSpline = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20" />}>
        <Spline 
          scene="https://prod.spline.design/1EllGAaoydopnyYSBOvdkeOh/scene.splinecode"
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.8,
          }}
        />
      </Suspense>
    </div>
  );
};