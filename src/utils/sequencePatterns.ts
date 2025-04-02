
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
