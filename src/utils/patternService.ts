
import * as Tone from 'tone';

export interface SequencePatterns {
  kickPattern: Tone.Sequence;
  bassPattern: Tone.Sequence;
  hihatPattern: Tone.Sequence;
  padPattern: Tone.Sequence;
  acidPattern?: Tone.Sequence; // Optional for patterns that use it
}

export type PatternType = 'pattern1' | 'pattern2' | 'pattern3' | 'pattern4';

export interface PatternOption {
  id: PatternType;
  name: string;
  bpm: number;
  genre: string;
}

// Centralized pattern options for consistency across the app
export const patternOptions: PatternOption[] = [
  { id: 'pattern1', name: 'Classic Minimal', bpm: 124, genre: 'Minimal Techno' },
  { id: 'pattern2', name: 'Syncopated', bpm: 124, genre: 'Syncopated Minimal' },
  { id: 'pattern3', name: 'Deep Hypnotic', bpm: 118, genre: 'Deep Hypnotic' },
  { id: 'pattern4', name: 'Plastikman Inspired', bpm: 110, genre: 'Plastikman Inspired' }
];

// Classic Minimal pattern
export const createPattern1 = (
  kickSynth: Tone.MembraneSynth,
  bassSynth: Tone.Synth,
  hihatSynth: Tone.MetalSynth,
  padSynth: Tone.PolySynth,
  onBeat: () => void
): SequencePatterns => {
  // Set BPM to 124
  Tone.Transport.bpm.value = 124;
  
  // 4/4 kick pattern
  const kickPattern = new Tone.Sequence(
    (time, note) => {
      kickSynth.triggerAttackRelease(note, "8n", time);
      if (note === "C1") onBeat();
    },
    ["C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null],
    "16n"
  );
  
  // Bass pattern (C1-G0-A#0-G0)
  const bassPattern = new Tone.Sequence(
    (time, note) => {
      if (note !== null) {
        bassSynth.triggerAttackRelease(note, "8n", time);
      }
    },
    ["C1", null, null, null, "G0", null, null, null, "A#0", null, null, null, "G0", null, null, null],
    "16n"
  );
  
  // Sparse hi-hats
  const hihatPattern = new Tone.Sequence(
    (time, vel) => {
      if (vel !== null) {
        hihatSynth.triggerAttackRelease("16n", time, vel);
      }
    },
    [null, null, 0.3, null, null, null, 0.3, null, null, null, 0.3, null, null, 0.2, 0.3, null],
    "16n"
  );
  
  // Ambient pad every 4 bars in C minor
  const padPattern = new Tone.Sequence(
    (time, chord) => {
      if (chord !== null) {
        padSynth.triggerAttackRelease(chord, "2n", time);
      }
    },
    [["C3", "Eb3", "G3"], null, null, null, null, null, null, null,
     ["G2", "Bb2", "D3"], null, null, null, null, null, null, null,
     ["F2", "Ab2", "C3"], null, null, null, null, null, null, null,
     ["G2", "Bb2", "D3"], null, null, null, null, null, null, null],
    "2n"
  );
  
  return {
    kickPattern,
    bassPattern,
    hihatPattern,
    padPattern
  };
};

// Syncopated pattern
export const createPattern2 = (
  kickSynth: Tone.MembraneSynth,
  bassSynth: Tone.Synth,
  hihatSynth: Tone.MetalSynth,
  padSynth: Tone.PolySynth,
  onBeat: () => void
): SequencePatterns => {
  // Set BPM to 124
  Tone.Transport.bpm.value = 124;
  
  // Alternative kick pattern with more syncopation
  const kickPattern = new Tone.Sequence(
    (time, note) => {
      kickSynth.triggerAttackRelease(note, "8n", time);
      if (note === "C1") onBeat();
    },
    ["C1", null, null, "C1", null, null, "C1", null, "C1", null, null, "C1", null, "C1", null, null],
    "16n"
  );
  
  // Alternative bass pattern (F0-G0-A#0-C1)
  const bassPattern = new Tone.Sequence(
    (time, note) => {
      if (note !== null) {
        bassSynth.triggerAttackRelease(note, "8n", time);
      }
    },
    ["F0", null, null, null, "G0", null, "G0", null, "A#0", null, null, null, "C1", null, "A#0", null],
    "16n"
  );
  
  // More active hi-hats
  const hihatPattern = new Tone.Sequence(
    (time, vel) => {
      if (vel !== null) {
        hihatSynth.triggerAttackRelease("16n", time, vel);
      }
    },
    [0.2, null, 0.3, null, 0.2, null, 0.3, null, 0.2, null, 0.3, null, 0.2, 0.1, 0.3, 0.1],
    "16n"
  );
  
  // Alternative pad progression in C minor
  const padPattern = new Tone.Sequence(
    (time, chord) => {
      if (chord !== null) {
        padSynth.triggerAttackRelease(chord, "2n", time);
      }
    },
    [["C3", "Eb3", "G3"], null, null, null, null, null, null, null,
     ["Ab2", "C3", "Eb3"], null, null, null, null, null, null, null,
     ["Bb2", "D3", "F3"], null, null, null, null, null, null, null,
     ["G2", "Bb2", "D3"], null, null, null, null, null, null, null],
    "2n"
  );
  
  return {
    kickPattern,
    bassPattern,
    hihatPattern,
    padPattern
  };
};

// Deep Hypnotic pattern
export const createPattern3 = (
  kickSynth: Tone.MembraneSynth,
  bassSynth: Tone.Synth,
  hihatSynth: Tone.MetalSynth,
  padSynth: Tone.PolySynth,
  onBeat: () => void
): SequencePatterns => {
  // Set BPM to a slower 118 for this deep pattern
  Tone.Transport.bpm.value = 118;
  
  // Minimal kick pattern to support the bassline
  const kickPattern = new Tone.Sequence(
    (time, note) => {
      if (note !== null) {
        kickSynth.triggerAttackRelease(note, "8n", time);
        if (note === "C1") onBeat();
      }
    },
    ["C1", null, null, null, null, null, null, null, "C1", null, null, null, null, null, null, null],
    "16n"
  );
  
  // Deep, hypnotic bassline with longer notes and subtle variations
  const bassPattern = new Tone.Sequence(
    (time, note) => {
      if (note !== null) {
        // Longer bass notes for smoother, hypnotic feel
        bassSynth.triggerAttackRelease(note, "4n+8n", time, 0.8);
      }
    },
    ["D1", null, null, null, null, null, null, null, 
     "F1", null, null, null, null, null, null, null, 
     "G1", null, null, null, null, null, null, null, 
     "A0", null, "C1", null, null, null, null, null],
    "8n"
  );
  
  // Minimal hi-hat pattern
  const hihatPattern = new Tone.Sequence(
    (time, vel) => {
      if (vel !== null) {
        hihatSynth.triggerAttackRelease("32n", time, vel);
      }
    },
    [null, null, null, null, 0.15, null, null, null, null, null, null, null, 0.15, null, null, null],
    "16n"
  );
  
  // Atmospheric pad progression with slow transitions
  const padPattern = new Tone.Sequence(
    (time, chord) => {
      if (chord !== null) {
        padSynth.triggerAttackRelease(chord, "4n", time, 0.3);
      }
    },
    [["D2", "F2", "A2"], null, null, null, null, null, null, null,
     ["F2", "A2", "C3"], null, null, null, null, null, null, null,
     ["G2", "Bb2", "D3"], null, null, null, null, null, null, null,
     ["A2", "C3", "E3"], null, null, null, null, null, null, null],
    "2n"
  );
  
  return {
    kickPattern,
    bassPattern,
    hihatPattern,
    padPattern
  };
};

// Plastikman Inspired pattern
export const createPattern4 = (
  kickSynth: Tone.MembraneSynth,
  bassSynth: Tone.Synth,
  hihatSynth: Tone.MetalSynth,
  padSynth: Tone.PolySynth,
  onBeat: () => void,
  acidSynth?: Tone.MonoSynth
): SequencePatterns => {
  // Set BPM to 110 for this deeper, more hypnotic pattern
  Tone.Transport.bpm.value = 110;
  
  // Minimal, sparse kick pattern with off-beat accents
  const kickPattern = new Tone.Sequence(
    (time, note) => {
      if (note !== null) {
        // Vary velocity to create dynamic feel
        const velocity = note === "C1" ? 0.9 : 0.6;
        kickSynth.triggerAttackRelease(note, "8n", time, velocity);
        if (note === "C1") onBeat();
      }
    },
    // Plastikman-style kick pattern with subtle variations and ghost kicks
    ["C1", null, null, "C1", null, null, "C1", null, 
     "C1", null, null, "C1", null, "C1", null, null],
    "16n"
  );
  
  // Slow, deep bassline with long sustained notes
  const bassPattern = new Tone.Sequence(
    (time, note) => {
      if (note !== null) {
        // Long bass notes for hypnotic feel
        bassSynth.triggerAttackRelease(note, "2n", time, 0.7);
      }
    },
    // Deeper bassline with longer sustained notes and subtle movement
    ["C0", null, null, null, null, null, null, null, 
     "G0", null, null, null, null, null, null, null, 
     "A#0", null, null, null, null, null, null, null,
     "F0", null, null, null, "G0", null, null, null],
    "8n"
  );
  
  // Sparse, minimal hi-hat pattern
  const hihatPattern = new Tone.Sequence(
    (time, vel) => {
      if (vel !== null) {
        hihatSynth.triggerAttackRelease("32n", time, vel);
      }
    },
    // Minimal closed hihat with occasional variations
    [null, null, 0.3, null, null, null, 0.2, null,
     null, null, 0.3, null, null, null, 0.1, 0.2],
    "16n"
  );
  
  // Atmospheric pad with slow evolving texture
  const padPattern = new Tone.Sequence(
    (time, chord) => {
      if (chord !== null) {
        padSynth.triggerAttackRelease(chord, "2n", time, 0.2);
      }
    },
    // Sparse, atmospheric pad chords
    [["C2", "D#2", "G2"], null, null, null, null, null, null, null,
     null, null, null, null, null, null, null, null,
     ["G2", "A#2", "D3"], null, null, null, null, null, null, null,
     null, null, null, null, null, null, null, null],
    "2n"
  );
  
  // Create a new acid synth sequence - a key element in Plastikman's sound
  // We'll use the acid synth if provided, otherwise fall back to bassSynth
  const synthToUse = acidSynth || bassSynth;
  
  const acidPattern = new Tone.Sequence(
    (time, note) => {
      if (note !== null) {
        // Short acid notes with staccato feel
        synthToUse.triggerAttackRelease(note, "16n", time, 0.3);
      }
    },
    // Classic acid pattern with rests
    [null, null, "C2", null, "C2", null, "D#2", null,
     "C2", null, null, "C2", null, "D#2", "F2", "D#2"],
    "16n"
  );
  
  return {
    kickPattern,
    bassPattern,
    hihatPattern,
    padPattern,
    acidPattern
  };
};

// Helper function to get the appropriate pattern creator based on selection
export const getPatternCreator = (patternType: PatternType) => {
  switch(patternType) {
    case 'pattern4': return createPattern4;
    case 'pattern3': return createPattern3;
    case 'pattern2': return createPattern2;
    case 'pattern1':
    default: return createPattern1;
  }
};

// Common sequence operations applicable to all patterns
export const startSequences = (patterns: SequencePatterns) => {
  patterns.kickPattern.start(0);
  patterns.bassPattern.start(0);
  patterns.hihatPattern.start(0);
  patterns.padPattern.start(0);
  if (patterns.acidPattern) {
    patterns.acidPattern.start(0);
  }
};

export const stopSequences = (patterns: SequencePatterns) => {
  patterns.kickPattern.stop();
  patterns.bassPattern.stop();
  patterns.hihatPattern.stop();
  patterns.padPattern.stop();
  if (patterns.acidPattern) {
    patterns.acidPattern.stop();
  }
};

export const disposeSequences = (patterns: SequencePatterns) => {
  patterns.kickPattern.dispose();
  patterns.bassPattern.dispose();
  patterns.hihatPattern.dispose();
  patterns.padPattern.dispose();
  if (patterns.acidPattern) {
    patterns.acidPattern.dispose();
  }
};
