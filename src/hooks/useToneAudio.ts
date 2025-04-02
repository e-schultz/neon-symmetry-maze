
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
  createSequencePatterns as createSequencePatterns1, 
  startSequences, 
  stopSequences, 
  disposeSequences 
} from '../utils/sequencePatterns';
import {
  createSequencePatterns as createSequencePatterns2
} from '../utils/sequencePatterns2';
import {
  createSequencePatterns as createSequencePatterns3
} from '../utils/sequencePatterns3';
import {
  createSequencePatterns as createSequencePatterns4
} from '../utils/sequencePatterns4';

interface UseToneAudioProps {
  isPlaying: boolean;
  volume: number;
  onBeat: () => void;
  selectedPattern: string;
}

export const useToneAudio = ({ isPlaying, volume, onBeat, selectedPattern }: UseToneAudioProps) => {
  const kickSynth = useRef<Tone.MembraneSynth | null>(null);
  const bassSynth = useRef<Tone.Synth | null>(null);
  const hihatSynth = useRef<Tone.MetalSynth | null>(null);
  const padSynth = useRef<Tone.PolySynth | null>(null);
  
  const sequencesRef = useRef<any>(null);
  const [initialized, setInitialized] = useState(false);
  const prevPatternRef = useRef(selectedPattern);

  // Initialize all instruments
  const initSynths = async () => {
    const { reverb, pingPongDelay } = createAudioEffects();
    
    kickSynth.current = createKickSynth(reverb);
    bassSynth.current = createBassSynth(pingPongDelay);
    hihatSynth.current = createHihatSynth(reverb);
    padSynth.current = createPadSynth(reverb);

    setInitialized(true);
  };

  // Set up our sequencers based on selected pattern
  const setupSequencers = () => {
    if (!kickSynth.current || !bassSynth.current || !hihatSynth.current || !padSynth.current) return;
    
    // Clear any existing sequences
    if (sequencesRef.current) {
      disposeSequences(sequencesRef.current);
    }
    
    // Choose the correct pattern based on selection
    let createSequences;
    switch(selectedPattern) {
      case 'pattern4':
        createSequences = createSequencePatterns4;
        break;
      case 'pattern3':
        createSequences = createSequencePatterns3;
        break;
      case 'pattern2':
        createSequences = createSequencePatterns2;
        break;
      case 'pattern1':
      default:
        createSequences = createSequencePatterns1;
    }
    
    sequencesRef.current = createSequences(
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

  // Handle pattern changes
  useEffect(() => {
    // Only recreate sequences if pattern changed and we're currently playing
    if (initialized && isPlaying && prevPatternRef.current !== selectedPattern) {
      // Stop current sequences
      if (sequencesRef.current) {
        stopSequences(sequencesRef.current);
      }
      
      // Setup new sequences with the new pattern
      setupSequencers();
      
      // Start the new sequences
      if (sequencesRef.current) {
        startSequences(sequencesRef.current);
      }
      
      prevPatternRef.current = selectedPattern;
    }
  }, [selectedPattern, initialized, isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (!initialized) return;
    
    // Master volume adjustment
    Tone.Destination.volume.value = Tone.gainToDb(volume);
  }, [volume, initialized]);
};
