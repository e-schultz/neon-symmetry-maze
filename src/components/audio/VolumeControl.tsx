
import React from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (value: number[]) => void;
  onToggleMute: () => void;
  className?: string;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
  className = "flex items-center gap-4 flex-1 max-w-xs"
}) => {
  return (
    <div className={className}>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onToggleMute}
        className="text-neon-magenta hover:bg-neon-magenta/20"
      >
        {isMuted ? <VolumeX /> : <Volume2 />}
      </Button>
      <Slider 
        value={[volume]} 
        min={0} 
        max={1} 
        step={0.01} 
        onValueChange={onVolumeChange} 
        className="flex-1"
      />
    </div>
  );
};

export default VolumeControl;
