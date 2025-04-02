
import React from 'react';
import { PerimeterDotsProps } from './types';

const PerimeterDots: React.FC<PerimeterDotsProps> = ({ count, size, centerPoint }) => {
  const generatePerimeterDots = () => {
    const dots = [];
    const radius = size / 2 * 0.9;
    
    for (let i = 0; i < count; i++) {
      const angle = (i * 2 * Math.PI) / count;
      const x = centerPoint.x + radius * Math.cos(angle);
      const y = centerPoint.y + radius * Math.sin(angle);
      
      dots.push(
        <circle
          key={`dot-${i}`}
          cx={x}
          cy={y}
          r={3}
          className="fill-neon-purple perimeter-dot animate-pulse-slow"
          style={{ '--index': i } as React.CSSProperties}
        />
      );
    }
    
    return dots;
  };

  return <>{generatePerimeterDots()}</>;
};

export default PerimeterDots;
