
import React from 'react';
import { ConcentricCirclesProps } from './types';

const ConcentricCircles: React.FC<ConcentricCirclesProps> = ({ count, size, centerPoint }) => {
  const generateConcentricCircles = () => {
    const circles = [];
    const maxRadius = size / 2 * 0.8;
    const radiusStep = maxRadius / count;
    
    for (let i = 1; i <= count; i++) {
      const radius = radiusStep * i;
      const isOddCircle = i % 2 === 1;
      
      circles.push(
        <circle
          key={`circle-${i}`}
          cx={centerPoint.x}
          cy={centerPoint.y}
          r={radius}
          fill="none"
          className={`dashed-circle stroke-neon-white opacity-70 ${
            isOddCircle ? 'animate-rotate-slow' : 'animate-rotate-counter'
          }`}
          strokeWidth="1"
        />
      );
    }
    
    return circles;
  };

  return <>{generateConcentricCircles()}</>;
};

export default ConcentricCircles;
