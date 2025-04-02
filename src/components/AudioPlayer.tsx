
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { useToast } from '@/components/ui/use-toast';
import TonePlayer from './TonePlayer';

interface AudioPlayerProps {
  onBeat: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ onBeat }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  const togglePlayPause = () => {
    if (!isPlaying) {
      toast({
        title: "Sound Activated",
        description: "The minimal techno soundtrack (124 BPM) is now playing.",
        duration: 3000,
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const effectiveVolume = isMuted ? 0 : volume;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/80 to-transparent">
      <TonePlayer 
        isPlaying={isPlaying} 
        volume={effectiveVolume}
        onBeat={onBeat}
      />
      
      <div className="container flex items-center justify-between gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={togglePlayPause}
          className="border-neon-cyan hover:bg-neon-cyan/20 text-neon-cyan"
        >
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        
        <div className="flex items-center gap-4 flex-1 max-w-xs">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMute}
            className="text-neon-magenta hover:bg-neon-magenta/20"
          >
            {isMuted ? <VolumeX /> : <Volume2 />}
          </Button>
          <Slider 
            value={[volume]} 
            min={0} 
            max={1} 
            step={0.01} 
            onValueChange={handleVolumeChange} 
            className="flex-1"
          />
        </div>
        
        <div className="text-xs text-neon-cyan opacity-70 flex items-center gap-2">
          <p>124 BPM Minimal Techno</p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
