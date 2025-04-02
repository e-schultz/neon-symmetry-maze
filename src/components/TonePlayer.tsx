
import React from 'react';
import { useToneAudio } from '../hooks/useToneAudio';

interface TonePlayerProps {
  isPlaying: boolean;
  volume: number;
  onBeat: () => void;
}

const TonePlayer: React.FC<TonePlayerProps> = ({ isPlaying, volume, onBeat }) => {
  // Use our custom hook to handle all the audio logic
  useToneAudio({ isPlaying, volume, onBeat });

  // This component doesn't render anything
  return null;
};

export default TonePlayer;
