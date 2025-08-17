import Spline from '@splinetool/react-spline';
import { Suspense } from 'react';

export const BackgroundSpline = () => {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
      <Suspense fallback={null}>
        <Spline 
          scene="https://prod.spline.design/1EllGAaoydopnyYSBOvdkeOh/scene.splinecode"
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.6,
          }}
        />
      </Suspense>
    </div>
  );
};