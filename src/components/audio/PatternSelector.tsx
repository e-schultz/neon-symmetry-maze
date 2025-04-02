
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useAudio } from '@/contexts/AudioContext';
import { patternOptions } from '@/utils/patternService';

/**
 * PatternSelector - A component for selecting audio patterns
 * Uses the AudioContext for state management to avoid prop drilling
 * Uses centralized pattern data from patternService for consistency
 */
const PatternSelector = () => {
  const { selectedPattern, setSelectedPattern } = useAudio();
  
  // Ensure we have a valid pattern selected
  const currentPattern = selectedPattern || 'pattern1';
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white/60">Pattern:</span>
      <Select 
        value={currentPattern} 
        onValueChange={setSelectedPattern}
      >
        <SelectTrigger className="h-8 w-32 bg-black/50 border-none text-xs">
          <SelectValue placeholder="Pattern" />
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-gray-800">
          {patternOptions.map(pattern => (
            <SelectItem 
              key={pattern.id} 
              value={pattern.id} 
              className="text-white/90 hover:bg-white/10"
            >
              {pattern.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PatternSelector;
