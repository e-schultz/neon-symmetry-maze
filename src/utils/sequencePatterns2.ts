
import * as Tone from 'tone';

interface SequencePatterns {
  kickPattern: Tone.Sequence;
  bassPattern: Tone.Sequence;
  hihatPattern: Tone.Sequence;
  padPattern: Tone.Sequence;
}

export const createSequencePatterns = (
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

export const startSequences = (patterns: SequencePatterns) => {
  patterns.kickPattern.start(0);
  patterns.bassPattern.start(0);
  patterns.hihatPattern.start(0);
  patterns.padPattern.start(0);
};

export const stopSequences = (patterns: SequencePatterns) => {
  patterns.kickPattern.stop();
  patterns.bassPattern.stop();
  patterns.hihatPattern.stop();
  patterns.padPattern.stop();
};

export const disposeSequences = (patterns: SequencePatterns) => {
  patterns.kickPattern.dispose();
  patterns.bassPattern.dispose();
  patterns.hihatPattern.dispose();
  patterns.padPattern.dispose();
};
