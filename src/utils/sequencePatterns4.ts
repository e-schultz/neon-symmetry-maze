
import * as Tone from 'tone';

interface SequencePatterns {
  kickPattern: Tone.Sequence;
  bassPattern: Tone.Sequence;
  hihatPattern: Tone.Sequence;
  padPattern: Tone.Sequence;
  acidPattern: Tone.Sequence; // New acid line inspired by Plastikman
}

export const createSequencePatterns = (
  kickSynth: Tone.MembraneSynth,
  bassSynth: Tone.Synth,
  hihatSynth: Tone.MetalSynth,
  padSynth: Tone.PolySynth,
  onBeat: () => void
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
  // We'll simulate this with the bassSynth for now
  const acidPattern = new Tone.Sequence(
    (time, note) => {
      if (note !== null) {
        // Short acid notes with staccato feel
        bassSynth.triggerAttackRelease(note, "16n", time, 0.3);
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

export const startSequences = (patterns: SequencePatterns) => {
  patterns.kickPattern.start(0);
  patterns.bassPattern.start(0);
  patterns.hihatPattern.start(0);
  patterns.padPattern.start(0);
  patterns.acidPattern.start(0);
};

export const stopSequences = (patterns: SequencePatterns) => {
  patterns.kickPattern.stop();
  patterns.bassPattern.stop();
  patterns.hihatPattern.stop();
  patterns.padPattern.stop();
  patterns.acidPattern.stop();
};

export const disposeSequences = (patterns: SequencePatterns) => {
  patterns.kickPattern.dispose();
  patterns.bassPattern.dispose();
  patterns.hihatPattern.dispose();
  patterns.padPattern.dispose();
  patterns.acidPattern.dispose();
};
