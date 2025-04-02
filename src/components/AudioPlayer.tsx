
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import TonePlayer from './TonePlayer';
import PlayPauseButton from './audio/PlayPauseButton';
import VolumeControl from './audio/VolumeControl';
import TrackInfo from './audio/TrackInfo';

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
        <PlayPauseButton
          isPlaying={isPlaying}
          onTogglePlayPause={togglePlayPause}
        />
        
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onVolumeChange={handleVolumeChange}
          onToggleMute={toggleMute}
        />
        
        <TrackInfo bpm={124} genre="Minimal Techno" />
      </div>
    </div>
  );
};

export default AudioPlayer;
