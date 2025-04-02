
import React from 'react';
import { VerticalBarsProps } from './types';
import { useAnimationStyles } from '@/utils/animationUtils';
import { useAudio } from '@/contexts/AudioContext';

const VerticalBars: React.FC<VerticalBarsProps> = ({ count, size }) => {
  const { audioParameters } = useAudio();
  const { bassEnergy, patternIntensity, visualTempo } = audioParameters;
  
  const generateVerticalBars = () => {
    const bars = [];
    const spacing = size / (count + 1);
    
    for (let i = 0; i < count; i++) {
      const x = spacing * (i + 1);
      
      // Create animation styles that vary based on index
      const barStyles = useAnimationStyles({
        baseOpacity: 0.4,
        pulseOpacity: 0.3,
        // More pronounced variation in animation properties based on position
        pulseScale: 0.05 + (i % 3) * 0.03
      });
      
      // Calculate dynamic height based on audio energy with enhanced wave effect
      // Using multiple sine waves with different frequencies for a more complex pattern
      // Make wave position a combination of index and time to create horizontal movement
      const timeOffset = Date.now() * 0.001 * visualTempo; // Time-based animation
      const scrollOffset = timeOffset * 2; // Controls horizontal scroll speed
      const wavePosition = i * 0.2 + scrollOffset; // Add scrollOffset for horizontal movement
      
      // Combine multiple sine waves with different frequencies and phases
      const wave1 = Math.sin(wavePosition + timeOffset * 0.5) * 0.3;
      const wave2 = Math.sin(wavePosition * 2 + timeOffset * 0.7) * 0.2;
      const wave3 = Math.sin(wavePosition * 0.5 - timeOffset * 0.3) * 0.15;
      
      // Combine waves and add audio reactivity
      const waveEffect = (wave1 + wave2 + wave3) * (0.6 + bassEnergy * 0.4) * patternIntensity;
      
      // Calculate height with more dramatic effect (0.5 to 1.5 times the base height)
      const heightMultiplier = 1 + waveEffect;
      const barHeight = size * 0.7 * heightMultiplier; // Base at 70% of size for more room to expand/contract
      const yPos = (size - barHeight) / 2;
      
      bars.push(
        <line
          key={`bar-${i}`}
          x1={x}
          y1={yPos}
          x2={x}
          y2={yPos + barHeight}
          className="stroke-neon-cyan vertical-bar"
          strokeWidth={1.5} // Slightly thicker lines for better visibility
          style={{ 
            ...barStyles,
            // Add index-based animation delay for wave-like movement
            animationDelay: `${i * (0.8 / count)}s`
          }}
        />
      );
    }
    
    return bars;
  };

  return <>{generateVerticalBars()}</>;
};

export default VerticalBars;
