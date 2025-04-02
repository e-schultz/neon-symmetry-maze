
import React from 'react';
import { useToneAudio } from '../hooks/useToneAudio';
import { useAudio } from '@/contexts/AudioContext';

interface TonePlayerProps {
  isPlaying: boolean;
  volume: number;
  onBeat: () => void;
  selectedPattern: string;
}

const TonePlayer: React.FC<TonePlayerProps> = ({ isPlaying, volume, onBeat, selectedPattern }) => {
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

  // This component doesn't render anything
  return null;
};

export default TonePlayer;
