
import { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import { 
  createAudioEffects, 
  createKickSynth, 
  createBassSynth, 
  createHihatSynth, 
  createPadSynth 
} from '../utils/synthSetup';
import { 
  createSequencePatterns, 
  startSequences, 
  stopSequences, 
  disposeSequences 
} from '../utils/sequencePatterns';

interface UseToneAudioProps {
  isPlaying: boolean;
  volume: number;
  onBeat: () => void;
  onProgressUpdate?: (progress: number) => void;
}

export const useToneAudio = ({ isPlaying, volume, onBeat, onProgressUpdate }: UseToneAudioProps) => {
  const kickSynth = useRef<Tone.MembraneSynth | null>(null);
  const bassSynth = useRef<Tone.Synth | null>(null);
  const hihatSynth = useRef<Tone.MetalSynth | null>(null);
  const padSynth = useRef<Tone.PolySynth | null>(null);
  
  const sequencesRef = useRef<any>(null);
  const [initialized, setInitialized] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Progress tracking
  useEffect(() => {
    if (!isPlaying) return;
    
    // Pattern duration is 16 beats (4 bars in 4/4)
    const patternDuration = (60 / 124) * 16; // 124 is the BPM
    const intervalTime = 50; // Update every 50ms for smooth progress
    
    const progressInterval = setInterval(() => {
      // Get current position in the pattern
      const position = Tone.Transport.seconds % patternDuration;
      const progress = position / patternDuration;
      
      setCurrentProgress(progress);
      if (onProgressUpdate) {
        onProgressUpdate(progress);
      }
    }, intervalTime);
    
    return () => clearInterval(progressInterval);
  }, [isPlaying, onProgressUpdate]);

  // Initialize all instruments
  const initSynths = async () => {
    const { reverb, pingPongDelay } = createAudioEffects();
    
    kickSynth.current = createKickSynth(reverb);
    bassSynth.current = createBassSynth(pingPongDelay);
    hihatSynth.current = createHihatSynth(reverb);
    padSynth.current = createPadSynth(reverb);

    setInitialized(true);
  };

  // Set up our sequencers
  const setupSequencers = () => {
    if (!kickSynth.current || !bassSynth.current || !hihatSynth.current || !padSynth.current) return;
    
    // Clear any existing sequences
    if (sequencesRef.current) {
      disposeSequences(sequencesRef.current);
    }
    
    sequencesRef.current = createSequencePatterns(
      kickSynth.current,
      bassSynth.current,
      hihatSynth.current,
      padSynth.current,
      onBeat
    );
  };

  // Handle play/pause
  useEffect(() => {
    const startAudio = async () => {
      if (!initialized) {
        await initSynths();
      }
      
      if (isPlaying) {
        // Set up new sequences on play
        setupSequencers();
        
        // Start the transport if not already started
        if (Tone.Transport.state !== "started") {
          await Tone.start();
          Tone.Transport.start();
        }
        
        // Start all sequences
        if (sequencesRef.current) {
          startSequences(sequencesRef.current);
        }
      } else {
        // Stop all sequences
        if (sequencesRef.current) {
          stopSequences(sequencesRef.current);
        }
      }
    };
    
    startAudio();
    
    return () => {
      // Cleanup when component unmounts
      if (sequencesRef.current) {
        disposeSequences(sequencesRef.current);
      }
    };
  }, [isPlaying, initialized, onBeat]);

  // Handle volume changes
  useEffect(() => {
    if (!initialized) return;
    
    // Master volume adjustment
    Tone.Destination.volume.value = Tone.gainToDb(volume);
  }, [volume, initialized]);

  return { currentProgress };
};
