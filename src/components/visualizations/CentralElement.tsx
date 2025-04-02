
import React from 'react';
import { CentralElementProps } from './types';
import { useAnimationStyles } from '@/utils/animationUtils';

const CentralElement: React.FC<CentralElementProps> = ({ 
  centerPoint, 
  size,
  isMobile 
}) => {
  const halfSize = size / 2;
  
  // Use the animation utility to generate styles
  const centralElementStyles = useAnimationStyles({
    baseScale: 1,
    pulseScale: 0.2,
    baseOpacity: 0.7,
    pulseOpacity: 0.3
  });
  
  // Animation for the inner patterns
  const patternStyles = useAnimationStyles({
    rotate: true,
    rotationSpeed: 0.5,
    rotationDirection: 'clockwise',
    baseOpacity: 0.8,
    pulseOpacity: 0.2
  });
  
  return (
    <>
      <g 
        className="animate-rotate-slow"
        style={{ 
          transformOrigin: `${halfSize}px ${halfSize}px`,
          ...patternStyles
        }}
      >
        <polygon
          points={`${centerPoint.x},${centerPoint.y - halfSize * 0.7} ${centerPoint.x + halfSize * 0.7},${centerPoint.y} ${centerPoint.x},${centerPoint.y + halfSize * 0.7} ${centerPoint.x - halfSize * 0.7},${centerPoint.y}`}
          className="fill-none stroke-neon-magenta"
          strokeWidth="2"
        />
        
        {/* Inner symmetric maze patterns */}
        <path
          d="M300,200 L330,230 L300,260 L270,230 Z"
          className="maze-pattern fill-none stroke-neon-cyan"
          strokeWidth="1.5"
          transform={`scale(${isMobile ? 0.5 : 1}) translate(${isMobile ? halfSize : 0}, ${isMobile ? halfSize : 0})`}
        />
        
        <path
          d="M300,200 L330,230 L300,260"
          className="maze-pattern fill-none stroke-neon-purple"
          strokeWidth="1.5"
          transform={`scale(${isMobile ? 0.5 : 1}) translate(${isMobile ? halfSize : 0}, ${isMobile ? halfSize : 0})`}
        />
      </g>
      
      {/* Central pulsing element */}
      <circle
        cx={centerPoint.x}
        cy={centerPoint.y}
        r={8}
        className="fill-neon-magenta"
        style={centralElementStyles}
      />
    </>
  );
};

export default CentralElement;
