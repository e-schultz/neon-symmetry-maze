
import React from 'react';
import { CentralElementProps } from './types';

const CentralElement: React.FC<CentralElementProps> = ({ 
  pulse, 
  centerPoint, 
  size,
  isMobile 
}) => {
  const halfSize = size / 2;
  
  return (
    <>
      <g 
        className={`animate-rotate-slow ${pulse ? 'opacity-100' : 'opacity-80'}`} 
        style={{ transformOrigin: `${halfSize}px ${halfSize}px` }}
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
        r={pulse ? 10 : 8}
        className={`fill-neon-magenta transition-all duration-300 ${
          pulse ? 'opacity-100' : 'opacity-70'
        }`}
      />
    </>
  );
};

export default CentralElement;
