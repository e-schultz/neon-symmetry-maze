
import React from 'react';
import { PerimeterDotsProps } from './types';
import { useAnimationStyles } from '@/utils/animationUtils';

const PerimeterDots: React.FC<PerimeterDotsProps> = ({ count, size, centerPoint }) => {
  const dotAnimationStyles = useAnimationStyles({
    pulseScale: 0.15,
    baseOpacity: 0.8,
    pulseOpacity: 0.2
  });
  
  const generatePerimeterDots = () => {
    const dots = [];
    const radius = size / 2 * 0.9;
    
    for (let i = 0; i < count; i++) {
      const angle = (i * 2 * Math.PI) / count;
      const x = centerPoint.x + radius * Math.cos(angle);
      const y = centerPoint.y + radius * Math.sin(angle);
      
      // Add slight delay based on index
      const delayStyle = {
        animationDelay: `${i * (0.8 / count)}s`,
        ...dotAnimationStyles
      };
      
      dots.push(
        <circle
          key={`dot-${i}`}
          cx={x}
          cy={y}
          r={3}
          className="fill-neon-purple perimeter-dot animate-pulse-slow"
          style={delayStyle}
        />
      );
    }
    
    return dots;
  };

  return <>{generatePerimeterDots()}</>;
};

export default PerimeterDots;
