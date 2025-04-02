
import React from 'react';
import { ConcentricCirclesProps } from './types';
import { useAnimationStyles } from '@/utils/animationUtils';

const ConcentricCircles: React.FC<ConcentricCirclesProps> = ({ count, size, centerPoint }) => {
  const circleAnimationStyles = useAnimationStyles({
    baseOpacity: 0.7,
    pulseOpacity: 0.2
  });
  
  const generateConcentricCircles = () => {
    const circles = [];
    const maxRadius = size / 2 * 0.8;
    const radiusStep = maxRadius / count;
    
    for (let i = 1; i <= count; i++) {
      const radius = radiusStep * i;
      const isOddCircle = i % 2 === 1;
      
      // Set different rotation direction based on odd/even
      const rotationStyle = useAnimationStyles({
        rotate: true,
        rotationSpeed: 0.3 + (i * 0.05),
        rotationDirection: isOddCircle ? 'clockwise' : 'counterclockwise',
        baseOpacity: 0.6 + (i * 0.05),
        customTransition: 'all 0.5s ease-out'
      });
      
      circles.push(
        <circle
          key={`circle-${i}`}
          cx={centerPoint.x}
          cy={centerPoint.y}
          r={radius}
          fill="none"
          className="dashed-circle stroke-neon-white"
          strokeWidth="1"
          style={rotationStyle}
        />
      );
    }
    
    return circles;
  };

  return <>{generateConcentricCircles()}</>;
};

export default ConcentricCircles;
