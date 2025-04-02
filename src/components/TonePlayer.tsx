import React, { useEffect } from 'react';
import { useToneAudio } from '../hooks/useToneAudio';
import { useAudio } from '@/contexts/AudioContext';

interface TonePlayerProps {
  isPlaying: boolean;
  volume: number;
  onBeat: () => void;
}

const TonePlayer: React.FC<TonePlayerProps> = ({ isPlaying, volume, onBeat }) => {
  const { setProgress } = useAudio();
  
  // Use our custom hook to handle all the audio logic
  const { currentProgress } = useToneAudio({ 
    isPlaying, 
    volume, 
    onBeat,
    onProgressUpdate: (progress) => setProgress(progress)
  });
  
  // Keep the context progress in sync with the audio engine
  useEffect(() => {
    setProgress(currentProgress);
  }, [currentProgress, setProgress]);

  // This component doesn't render anything
  return null;
};

export default TonePlayer;
