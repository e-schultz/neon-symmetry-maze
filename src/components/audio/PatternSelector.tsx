
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
        <SelectContent className="bg-black/90 border-gray-800">
          <SelectItem value="pattern1" className="text-white/90 hover:bg-white/10">Classic Minimal</SelectItem>
          <SelectItem value="pattern2" className="text-white/90 hover:bg-white/10">Syncopated</SelectItem>
          <SelectItem value="pattern3" className="text-white/90 hover:bg-white/10">Deep Hypnotic</SelectItem>
          <SelectItem value="pattern4" className="text-white/90 hover:bg-white/10">Plastikman Inspired</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PatternSelector;
