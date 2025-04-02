
import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  AudioParameters, 
  defaultAudioParameters, 
  createAudioAnalyzer, 
  mapPatternToVisualParameters 
} from '@/utils/audioAnalysis';
import * as Tone from 'tone';
import { PatternType, patternOptions } from '@/utils/patternService';

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
  
  // Audio analysis parameters for visualization
  audioParameters: AudioParameters;
  beatActive: boolean;
  setBeatActive: (active: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<PatternType>('pattern1');
  const [beatActive, setBeatActive] = useState(false);
  const [audioParameters, setAudioParameters] = useState<AudioParameters>(defaultAudioParameters);
  const { toast } = useToast();
  
  // Reference to the audio analyzer
  const analyzerRef = useRef<Tone.Analyser | null>(null);
  
  // Initialize the audio analyzer
  useEffect(() => {
    analyzerRef.current = createAudioAnalyzer();
    
    return () => {
      // Clean up analyzer on unmount if needed
      if (analyzerRef.current) {
        analyzerRef.current.dispose();
      }
    };
  }, []);
  
  // Update audio parameters based on pattern and analyzer data
  useEffect(() => {
    // Only update when playing
    if (!isPlaying) {
      setAudioParameters(defaultAudioParameters);
      return;
    }
    
    // Update parameters based on the current pattern
    const patternParams = mapPatternToVisualParameters(selectedPattern, analyzerRef.current);
    
    setAudioParameters(prev => ({
      ...prev,
      ...patternParams,
      beatActive,
      bassEnergy: patternParams.patternIntensity || 0.5,
    }));
    
    // Set up an interval to regularly update frequency-based parameters
    const intervalId = setInterval(() => {
      const updatedParams = mapPatternToVisualParameters(selectedPattern, analyzerRef.current);
      setAudioParameters(prev => ({
        ...prev,
        ...updatedParams,
        beatActive,
      }));
    }, 100); // Update 10 times per second
    
    return () => clearInterval(intervalId);
  }, [isPlaying, selectedPattern, beatActive]);

  // Find the currently selected pattern from our options
  const currentPatternOption = patternOptions.find(p => p.id === selectedPattern) || patternOptions[0];
  const bpm = currentPatternOption.bpm;
  const genre = currentPatternOption.genre;

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
      const newPattern = patternOptions.find(p => p.id === pattern);
      if (newPattern) {
        toast({
          title: "Pattern Changed",
          description: `Switched to ${newPattern.name} pattern`,
          duration: 3000,
        });
      }
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
    genre,
    // Add audio parameters for visualization
    audioParameters,
    beatActive,
    setBeatActive
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
