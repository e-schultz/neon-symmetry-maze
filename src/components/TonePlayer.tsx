
import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

interface TonePlayerProps {
  isPlaying: boolean;
  volume: number;
  onBeat: () => void;
}

const TonePlayer: React.FC<TonePlayerProps> = ({ isPlaying, volume, onBeat }) => {
  const kickSynth = useRef<Tone.MembraneSynth | null>(null);
  const bassSynth = useRef<Tone.Synth | null>(null);
  const hihatSynth = useRef<Tone.MetalSynth | null>(null);
  const padSynth = useRef<Tone.PolySynth | null>(null);
  
  const sequencerRef = useRef<Tone.Sequence | null>(null);
  const bassSequencerRef = useRef<Tone.Sequence | null>(null);
  const hihatSequencerRef = useRef<Tone.Sequence | null>(null);
  const padSequencerRef = useRef<Tone.Sequence | null>(null);
  
  const [initialized, setInitialized] = useState(false);

  // Initialize all instruments
  const initSynths = async () => {
    // Create a reverb effect
    const reverb = new Tone.Reverb({
      decay: 2.5,
      wet: 0.15
    }).toDestination();
    
    // Create a delay effect
    const pingPongDelay = new Tone.PingPongDelay({
      delayTime: "8n",
      feedback: 0.2,
      wet: 0.1
    }).toDestination();
    
    // Set up the kick drum synth
    kickSynth.current = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 5,
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.01,
        release: 1.4,
      }
    }).connect(reverb);
    
    // Set up the bass synth using a triangle wave
    bassSynth.current = new Tone.Synth({
      oscillator: {
        type: "triangle"
      },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.3,
        release: 0.8
      }
    }).connect(pingPongDelay);
    
    // Set up hi-hat - Updated to use correct MetalSynth properties
    hihatSynth.current = new Tone.MetalSynth({
      // Remove 'frequency' property as it's not in the MetalSynthOptions type
      envelope: {
        attack: 0.001,
        decay: 0.1,
        release: 0.01
      },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5
    }).connect(reverb);
    hihatSynth.current.volume.value = -20;
    
    // Set up ambient pad
    padSynth.current = new Tone.PolySynth(Tone.Synth).connect(reverb);
    padSynth.current.set({
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.8,
        decay: 2,
        sustain: 0.5,
        release: 3
      }
    });
    padSynth.current.volume.value = -15;

    setInitialized(true);
  };

  // Set up our sequencers
  const setupSequencers = () => {
    if (!kickSynth.current || !bassSynth.current || !hihatSynth.current || !padSynth.current) return;
    
    // Clear any existing sequences
    if (sequencerRef.current) sequencerRef.current.dispose();
    if (bassSequencerRef.current) bassSequencerRef.current.dispose();
    if (hihatSequencerRef.current) hihatSequencerRef.current.dispose();
    if (padSequencerRef.current) padSequencerRef.current.dispose();
    
    // Set BPM to 124
    Tone.Transport.bpm.value = 124;
    
    // 4/4 kick pattern
    sequencerRef.current = new Tone.Sequence(
      (time, note) => {
        kickSynth.current?.triggerAttackRelease(note, "8n", time);
        if (note === "C1") onBeat();
      },
      ["C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null],
      "16n"
    );
    
    // Bass pattern (C1-G0-A#0-G0)
    bassSequencerRef.current = new Tone.Sequence(
      (time, note) => {
        if (note !== null) {
          bassSynth.current?.triggerAttackRelease(note, "8n", time);
        }
      },
      ["C1", null, null, null, "G0", null, null, null, "A#0", null, null, null, "G0", null, null, null],
      "16n"
    );
    
    // Sparse hi-hats
    hihatSequencerRef.current = new Tone.Sequence(
      (time, vel) => {
        if (vel !== null) {
          hihatSynth.current?.triggerAttackRelease("16n", time, vel);
        }
      },
      [null, null, 0.3, null, null, null, 0.3, null, null, null, 0.3, null, null, 0.2, 0.3, null],
      "16n"
    );
    
    // Ambient pad every 4 bars in C minor
    padSequencerRef.current = new Tone.Sequence(
      (time, chord) => {
        if (chord !== null) {
          padSynth.current?.triggerAttackRelease(chord, "2n", time);
        }
      },
      [["C3", "Eb3", "G3"], null, null, null, null, null, null, null,
       ["G2", "Bb2", "D3"], null, null, null, null, null, null, null,
       ["F2", "Ab2", "C3"], null, null, null, null, null, null, null,
       ["G2", "Bb2", "D3"], null, null, null, null, null, null, null],
      "2n"
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
        sequencerRef.current?.start(0);
        bassSequencerRef.current?.start(0);
        hihatSequencerRef.current?.start(0);
        padSequencerRef.current?.start(0);
      } else {
        // Stop all sequences
        sequencerRef.current?.stop();
        bassSequencerRef.current?.stop();
        hihatSequencerRef.current?.stop();
        padSequencerRef.current?.stop();
      }
    };
    
    startAudio();
    
    return () => {
      // Cleanup when component unmounts
      sequencerRef.current?.dispose();
      bassSequencerRef.current?.dispose();
      hihatSequencerRef.current?.dispose();
      padSequencerRef.current?.dispose();
    };
  }, [isPlaying, initialized]);

  // Handle volume changes
  useEffect(() => {
    if (!initialized) return;
    
    // Master volume adjustment
    Tone.Destination.volume.value = Tone.gainToDb(volume);
  }, [volume, initialized]);

  return null; // This component doesn't render anything
};

export default TonePlayer;
