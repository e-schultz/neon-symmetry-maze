
import React from 'react';
import { CentralElementProps } from './types';
import { useAudio } from '@/contexts/AudioContext';

const CentralElement: React.FC<CentralElementProps> = ({ 
  centerPoint, 
  size,
  isMobile 
}) => {
  const { audioParameters } = useAudio();
  const { patternIntensity, bassEnergy } = audioParameters;
  
  const halfSize = size / 2;
  
  // Dynamic sizing and opacity based on bass energy
  const pulseScale = 1 + (bassEnergy * 0.2);
  const opacity = 0.7 + (patternIntensity * 0.3);
  
  return (
    <>
      <g 
        className={`animate-rotate-slow`} 
        style={{ 
          transformOrigin: `${halfSize}px ${halfSize}px`,
          opacity: opacity,
          transform: `scale(${pulseScale})`,
          transition: 'all 0.2s ease-out'
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
        r={8 + (bassEnergy * 4)}
        className="fill-neon-magenta transition-all duration-300"
        style={{
          opacity: opacity,
          transition: 'all 0.2s ease-out'
        }}
      />
    </>
  );
};

export default CentralElement;
