
import React from 'react';
import { useToneAudio } from '../hooks/useToneAudio';
import { useAudio } from '@/contexts/AudioContext';

interface TonePlayerProps {
  isPlaying: boolean;
  volume: number;
  onBeat: () => void;
  selectedPattern: string;
}

/**
 * TonePlayer - Responsible for managing audio engine interactions
 * Uses custom hook to encapsulate audio logic and reduce component complexity
 * Follows container component pattern - no UI, just business logic
 */
const TonePlayer: React.FC<TonePlayerProps> = ({ 
  isPlaying, 
  volume, 
  onBeat, 
  selectedPattern 
}) => {
  const { setBeatActive } = useAudio();
  
  // Enhanced beat handler that updates both the visualization and context
  const handleBeat = () => {
    // Trigger the visualization beat
    onBeat();
    
    // Update the audio context
    setBeatActive(true);
    setTimeout(() => setBeatActive(false), 100);
  };
  
  // Use our custom hook to handle all the audio logic
  useToneAudio({ 
    isPlaying, 
    volume, 
    onBeat: handleBeat, 
    selectedPattern 
  });

  // This component doesn't render anything - it's a pure logic component
  return null;
};

export default TonePlayer;
