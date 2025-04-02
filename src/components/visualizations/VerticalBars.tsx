
import React from 'react';
import { VerticalBarsProps } from './types';
import { useAnimationStyles } from '@/utils/animationUtils';
import { useAudio } from '@/contexts/AudioContext';

const VerticalBars: React.FC<VerticalBarsProps> = ({ count, size }) => {
  const { audioParameters } = useAudio();
  const { bassEnergy, patternIntensity } = audioParameters;
  
  const generateVerticalBars = () => {
    const bars = [];
    const spacing = size / (count + 1);
    
    for (let i = 0; i < count; i++) {
      const x = spacing * (i + 1);
      
      // Create animation styles that vary based on index
      const barStyles = useAnimationStyles({
        baseOpacity: 0.3,
        pulseOpacity: 0.2,
        // Slight variation in animation properties based on position
        pulseScale: 0.05 + (i % 3) * 0.02
      });
      
      // Calculate dynamic height based on audio energy
      const heightMultiplier = 1 + (Math.sin(i * 0.5 + bassEnergy * 5) * patternIntensity * 0.2);
      const barHeight = size * heightMultiplier;
      const yPos = (size - barHeight) / 2;
      
      bars.push(
        <line
          key={`bar-${i}`}
          x1={x}
          y1={yPos}
          x2={x}
          y2={yPos + barHeight}
          className="stroke-neon-cyan vertical-bar"
          strokeWidth="1"
          style={{ 
            ...barStyles,
            // Add index-based animation delay
            animationDelay: `${i * (0.5 / count)}s`
          }}
        />
      );
    }
    
    return bars;
  };

  return <>{generateVerticalBars()}</>;
};

export default VerticalBars;
