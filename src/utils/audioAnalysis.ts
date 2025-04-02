
import * as Tone from 'tone';

// Types for audio parameters that will be exposed to visualization components
export interface AudioParameters {
  // Beat detection
  beatActive: boolean;
  
  // Pattern-specific parameters
  patternIntensity: number;
  
  // Derived audio parameters
  bassEnergy: number;
  highFrequencyEnergy: number;
  
  // Pattern-specific visualization mapping
  visualTempo: number;
  colorIntensity: number;
  rotationSpeed: number;
  
  // New parameters for Plastikman-style visualizations
  acidResonance: number;   // For filter sweep visualizations
  spatialDepth: number;    // For depth perception in visuals
}

// Default parameters when audio is not playing
export const defaultAudioParameters: AudioParameters = {
  beatActive: false,
  patternIntensity: 0.5,
  bassEnergy: 0,
  highFrequencyEnergy: 0,
  visualTempo: 1,
  colorIntensity: 0.5,
  rotationSpeed: 0.5,
  acidResonance: 0,
  spatialDepth: 0.5
};

// Create an analyzer to extract frequency data from Tone.js
export const createAudioAnalyzer = () => {
  // Create an analyzer node to extract frequency data
  const analyzer = new Tone.Analyser("fft", 32);
  Tone.Destination.connect(analyzer);
  
  return analyzer;
};

// Map audio pattern to visualization parameters
export const mapPatternToVisualParameters = (
  pattern: string,
  analyzer: Tone.Analyser | null
): Partial<AudioParameters> => {
  // Extract frequency data if analyzer is available
  let bassEnergy = 0;
  let highFrequencyEnergy = 0;
  
  if (analyzer) {
    const frequencyData = analyzer.getValue() as Float32Array;
    
    // Calculate bass energy (first 1/4 of frequency bins)
    const bassRange = Math.floor(frequencyData.length / 4);
    for (let i = 0; i < bassRange; i++) {
      bassEnergy += Math.abs(frequencyData[i]);
    }
    bassEnergy = bassEnergy / bassRange;
    
    // Calculate high frequency energy (last 1/4 of frequency bins)
    const highRange = Math.floor(frequencyData.length / 4);
    const highStart = frequencyData.length - highRange;
    for (let i = highStart; i < frequencyData.length; i++) {
      highFrequencyEnergy += Math.abs(frequencyData[i]);
    }
    highFrequencyEnergy = highFrequencyEnergy / highRange;
  }
  
  // Define pattern-specific parameters
  switch (pattern) {
    case 'pattern4': // Plastikman Inspired
      return {
        visualTempo: 0.6, // very slow for hypnotic feel
        colorIntensity: 0.9 + (bassEnergy * 0.1), // higher contrast
        rotationSpeed: 0.2, // very slow rotation 
        patternIntensity: 0.95, // very intense pattern
        acidResonance: 0.7 + (highFrequencyEnergy * 0.3), // acid filter sweep parameter
        spatialDepth: 0.8 // enhanced depth perception
      };
    case 'pattern3': // Deep Hypnotic
      return {
        visualTempo: 0.7, // slower for the hypnotic feel
        colorIntensity: 0.8 + (bassEnergy * 0.2),
        rotationSpeed: 0.3, // slower rotation
        patternIntensity: 0.9
      };
    case 'pattern2': // Syncopated
      return {
        visualTempo: 1.2,
        colorIntensity: 0.6 + (bassEnergy * 0.4),
        rotationSpeed: 0.8,
        patternIntensity: 0.85
      };
    case 'pattern1': // Classic Minimal
      return {
        visualTempo: 1,
        colorIntensity: 0.5 + (bassEnergy * 0.5),
        rotationSpeed: 0.5,
        patternIntensity: 0.7
      };
    default:
      return {
        visualTempo: 1,
        colorIntensity: 0.5,
        rotationSpeed: 0.5,
        patternIntensity: 0.7
      };
  }
};
