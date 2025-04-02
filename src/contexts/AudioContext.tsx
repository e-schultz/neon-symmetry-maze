
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

type PatternType = 'pattern1' | 'pattern2' | 'pattern3';

interface AudioContextType {
  // Playback state
  isPlaying: boolean;
  togglePlayback: () => void;
  
  // Volume state
  volume: number;
  setVolume: (volume: number[]) => void;
  isMuted: boolean;
  toggleMute: () => void;
  
  // Pattern selection
  selectedPattern: PatternType;
  setSelectedPattern: (pattern: PatternType) => void;
  
  // Track info
  bpm: number;
  genre: string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<PatternType>('pattern1');
  const { toast } = useToast();
  
  // Track info - this will now change based on the pattern
  const getBPM = () => {
    switch(selectedPattern) {
      case 'pattern3': return 118;
      default: return 124;
    }
  };
  
  const getGenre = () => {
    switch(selectedPattern) {
      case 'pattern3': return "Deep Hypnotic";
      case 'pattern2': return "Syncopated Minimal";
      default: return "Minimal Techno";
    }
  };

  const bpm = getBPM();
  const genre = getGenre();

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
  
  // Handle pattern selection
  const handlePatternChange = (pattern: PatternType) => {
    setSelectedPattern(pattern);
    
    if (isPlaying) {
      let patternName = "";
      switch(pattern) {
        case 'pattern3':
          patternName = "Deep Hypnotic";
          break;
        case 'pattern2':
          patternName = "Syncopated";
          break;
        default:
          patternName = "Classic Minimal";
      }
      
      toast({
        title: "Pattern Changed",
        description: `Switched to ${patternName} pattern`,
        duration: 3000,
      });
    }
  };

  const value = {
    isPlaying,
    togglePlayback,
    volume,
    setVolume: handleVolumeChange,
    isMuted,
    toggleMute,
    selectedPattern,
    setSelectedPattern: handlePatternChange,
    bpm,
    genre
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
