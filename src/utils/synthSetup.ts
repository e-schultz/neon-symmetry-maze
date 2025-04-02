
import * as Tone from 'tone';

// Create audio effects that will be used by multiple instruments
export const createAudioEffects = () => {
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
  
  return { reverb, pingPongDelay };
};

// Set up the kick drum synth
export const createKickSynth = (reverb: Tone.Reverb) => {
  const kick = new Tone.MembraneSynth({
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
  
  return kick;
};

// Set up the bass synth - enhanced for deep hypnotic feel
export const createBassSynth = (pingPongDelay: Tone.PingPongDelay) => {
  // Create a filter for the bass
  const filter = new Tone.Filter({
    type: "lowpass",
    frequency: 1000,
    rolloff: -24,
    Q: 1
  });
  
  // Add some subtle distortion
  const distortion = new Tone.Distortion({
    distortion: 0.05,
    wet: 0.1
  });
  
  // Create the bass synth with richer tone
  const bass = new Tone.Synth({
    oscillator: {
      type: "fatsawtooth",
      count: 3,
      spread: 20
    },
    envelope: {
      attack: 0.08,
      decay: 0.3,
      sustain: 0.4,
      release: 1.2
    }
  }).chain(filter, distortion, pingPongDelay);
  
  // Adjust volume
  bass.volume.value = -8;
  
  return bass;
};

// Set up hi-hat
export const createHihatSynth = (reverb: Tone.Reverb) => {
  const hihat = new Tone.MetalSynth({
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
  hihat.volume.value = -20;
  
  return hihat;
};

// Set up ambient pad
export const createPadSynth = (reverb: Tone.Reverb) => {
  const pad = new Tone.PolySynth(Tone.Synth).connect(reverb);
  pad.set({
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
  pad.volume.value = -15;
  
  return pad;
};
