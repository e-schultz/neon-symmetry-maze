
import React, { useEffect, useState } from 'react';
import { VerticalBarsProps } from './types';
import { useAnimationStyles } from '@/utils/animationUtils';
import { useAudio } from '@/contexts/AudioContext';

const VerticalBars: React.FC<VerticalBarsProps> = ({ count, size }) => {
  const { audioParameters } = useAudio();
  const { 
    bassEnergy, 
    patternIntensity, 
    visualTempo, 
    acidResonance = 0 // New Plastikman-specific parameter
  } = audioParameters;
  
  // Use state to force regular updates for animation
  const [time, setTime] = useState(Date.now());
  
  // Set up animation frame for smooth rendering
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setTime(Date.now());
    });
    
    return () => cancelAnimationFrame(animationFrame);
  });
  
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
      const timeOffset = time * 0.001 * visualTempo; // Time-based animation
      const scrollOffset = timeOffset * 2; // Controls horizontal scroll speed
      const wavePosition = i * 0.2 + scrollOffset; // Add scrollOffset for horizontal movement
      
      // Combine multiple sine waves with different frequencies and phases
      const wave1 = Math.sin(wavePosition + timeOffset * 0.5) * 0.3;
      const wave2 = Math.sin(wavePosition * 2 + timeOffset * 0.7) * 0.2;
      const wave3 = Math.sin(wavePosition * 0.5 - timeOffset * 0.3) * 0.15;
      
      // New acid-inspired wave component (only active for Plastikman pattern)
      const acidWave = Math.sin(wavePosition * 4 - timeOffset * 2) * 0.2 * acidResonance;
      
      // Combine waves and add audio reactivity
      const waveEffect = (wave1 + wave2 + wave3 + acidWave) * (0.6 + bassEnergy * 0.4) * patternIntensity;
      
      // Calculate height with more dramatic effect (0.5 to 1.5 times the base height)
      const heightMultiplier = 1 + waveEffect;
      const barHeight = size * 0.7 * heightMultiplier; // Base at 70% of size for more room to expand/contract
      const yPos = (size - barHeight) / 2;
      
      // Determine color based on acidResonance - shift to acid green for Plastikman pattern
      const strokeClass = acidResonance > 0.5 
        ? `stroke-[rgb(${Math.floor(100 + acidResonance * 155)},${Math.floor(200 + acidResonance * 55)},${Math.floor(50 + acidResonance * 50)})]` 
        : "stroke-neon-cyan";
      
      bars.push(
        <line
          key={`bar-${i}`}
          x1={x}
          y1={yPos}
          x2={x}
          y2={yPos + barHeight}
          className={`vertical-bar ${strokeClass}`}
          strokeWidth={1.5 + (acidResonance * 0.5)} // Slightly thicker lines for acid pattern
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
