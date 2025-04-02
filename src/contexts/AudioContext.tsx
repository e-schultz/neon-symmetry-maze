
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface AudioContextType {
  // Playback state
  isPlaying: boolean;
  togglePlayback: () => void;
  
  // Volume state
  volume: number;
  setVolume: (volume: number[]) => void;
  isMuted: boolean;
  toggleMute: () => void;
  
  // Track info
  bpm: number;
  genre: string;
  
  // Progress tracking
  progress: number;
  setProgress: (progress: number) => void;
  elapsedTime: string;
  totalTime: string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  
  // Track info
  const bpm = 124;
  const genre = "Minimal Techno";

  // Calculate time display - pattern repeats every 4 bars by default (16 beats)
  const patternDurationInSeconds = (60 / bpm) * 16;
  const currentSeconds = (progress * patternDurationInSeconds).toFixed(1);
  const totalSeconds = patternDurationInSeconds.toFixed(1);
  
  const elapsedTime = `${currentSeconds}s`;
  const totalTime = `${totalSeconds}s`;

  const togglePlayback = () => {
    if (!isPlaying) {
      toast({
        title: "Sound Activated",
        description: `The ${genre.toLowerCase()} soundtrack (${bpm} BPM) is now playing.`,
        duration: 3000,
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const value = {
    isPlaying,
    togglePlayback,
    volume,
    setVolume: handleVolumeChange,
    isMuted,
    toggleMute,
    bpm,
    genre,
    progress,
    setProgress,
    elapsedTime,
    totalTime
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
