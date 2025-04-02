
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useAudio } from '@/contexts/AudioContext';

const PatternSelector = () => {
  const { selectedPattern, setSelectedPattern } = useAudio();
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white/60">Pattern:</span>
      <Select 
        value={selectedPattern} 
        onValueChange={setSelectedPattern}
      >
        <SelectTrigger className="h-8 w-32 bg-black/50 border-none text-xs">
          <SelectValue placeholder="Pattern" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pattern1">Classic Minimal</SelectItem>
          <SelectItem value="pattern2">Syncopated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PatternSelector;
