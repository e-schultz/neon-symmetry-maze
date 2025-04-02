
import { CSSProperties } from "react";
import { useAudio } from "@/contexts/AudioContext";

/**
 * Animation properties that can be derived from audio parameters
 */
export interface AnimationConfig {
  // Scale properties
  baseScale?: number;
  pulseScale?: number;
  
  // Rotation properties
  rotate?: boolean;
  rotationSpeed?: number;
  rotationDirection?: 'clockwise' | 'counterclockwise';
  
  // Opacity properties
  baseOpacity?: number;
  pulseOpacity?: number;
  
  // Custom animation properties
  customAnimationClass?: string;
  customTransition?: string;
}

/**
 * Hook to generate animation styles based on audio parameters
 */
export const useAnimationStyles = (config: AnimationConfig = {}): CSSProperties => {
  const { audioParameters } = useAudio();
  const { 
    bassEnergy = 0, 
    patternIntensity = 0.5, 
    beatActive = false,
    visualTempo = 1
  } = audioParameters;
  
  const {
    baseScale = 1,
    pulseScale = 0.2,
    rotate = false,
    rotationSpeed = 0.5,
    rotationDirection = 'clockwise',
    baseOpacity = 0.7,
    pulseOpacity = 0.3,
    customTransition = 'all 0.2s ease-out'
  } = config;
  
  // Calculate dynamic scale based on bass energy
  const dynamicScale = baseScale + (bassEnergy * pulseScale);
  
  // Calculate dynamic opacity based on pattern intensity
  const dynamicOpacity = baseOpacity + (patternIntensity * pulseOpacity);
  
  // Apply additional beat effects if beatActive is true
  const beatEffect = beatActive ? 0.1 : 0;
  
  // Build animation styles
  const styles: CSSProperties = {
    opacity: dynamicOpacity,
    transition: customTransition,
  };
  
  // Add scale transform if needed
  if (baseScale !== 1 || pulseScale !== 0) {
    styles.transform = `scale(${dynamicScale + beatEffect})`;
  }
  
  // Add rotation if enabled
  if (rotate) {
    const rotationValue = rotationDirection === 'clockwise' 
      ? `rotate(${visualTempo * rotationSpeed}deg)` 
      : `rotate(-${visualTempo * rotationSpeed}deg)`;
    
    styles.transform = styles.transform 
      ? `${styles.transform} ${rotationValue}` 
      : rotationValue;
  }
  
  return styles;
};

/**
 * Utility function to generate SVG keyframe animation styles
 */
export const generateAnimationClass = (
  type: 'pulse' | 'rotate' | 'fade' | 'move',
  intensity: number = 1,
  direction: 'normal' | 'reverse' = 'normal'
): string => {
  switch (type) {
    case 'pulse':
      return `animate-pulse-${intensity * 100}`;
    case 'rotate':
      return direction === 'normal' ? 'animate-rotate-slow' : 'animate-rotate-counter';
    case 'fade':
      return 'animate-fade';
    case 'move':
      return 'animate-h-move';
    default:
      return '';
  }
};
