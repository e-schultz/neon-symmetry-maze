
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
