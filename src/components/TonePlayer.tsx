
import React from 'react';
import { useToneAudio } from '../hooks/useToneAudio';

interface TonePlayerProps {
  isPlaying: boolean;
  volume: number;
  onBeat: () => void;
  selectedPattern: string;
}

const TonePlayer: React.FC<TonePlayerProps> = ({ isPlaying, volume, onBeat, selectedPattern }) => {
  // Use our custom hook to handle all the audio logic
  useToneAudio({ isPlaying, volume, onBeat, selectedPattern });

  // This component doesn't render anything
  return null;
};

export default TonePlayer;
