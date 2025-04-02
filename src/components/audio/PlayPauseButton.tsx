
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause } from 'lucide-react';

interface PlayPauseButtonProps {
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  className?: string;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ 
  isPlaying, 
  onTogglePlayPause,
  className = "border-neon-cyan hover:bg-neon-cyan/20 text-neon-cyan"
}) => {
  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={onTogglePlayPause}
      className={className}
    >
      {isPlaying ? <Pause /> : <Play />}
    </Button>
  );
};

export default PlayPauseButton;
