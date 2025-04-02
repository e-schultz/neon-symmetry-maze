
import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { useToast } from '@/components/ui/use-toast';

interface AudioPlayerProps {
  onBeat: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ onBeat }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const beatInterval = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // BPM calculation
  const bpm = 124;
  const beatTime = 60000 / bpm; // in milliseconds

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    // Clean up on unmount
    return () => {
      if (beatInterval.current) {
        clearInterval(beatInterval.current);
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioError) {
        toast({
          title: "Audio Unavailable",
          description: "The audio file could not be loaded. Using beat simulation instead.",
          variant: "destructive"
        });
        
        // Even without audio, we can still simulate beats for visualization
        if (!isPlaying) {
          beatInterval.current = setInterval(() => {
            onBeat();
          }, beatTime);
          setIsPlaying(true);
        } else {
          if (beatInterval.current) {
            clearInterval(beatInterval.current);
            beatInterval.current = null;
          }
          setIsPlaying(false);
        }
        return;
      }
      
      if (isPlaying) {
        audioRef.current.pause();
        if (beatInterval.current) {
          clearInterval(beatInterval.current);
          beatInterval.current = null;
        }
      } else {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Audio playback failed:", error);
            setAudioError(true);
            toast({
              title: "Audio Playback Failed",
              description: "There was an error playing the audio. Using beat simulation instead.",
              variant: "destructive"
            });
            
            // Start beat simulation anyway
            beatInterval.current = setInterval(() => {
              onBeat();
            }, beatTime);
          });
        }
        
        // Start beat detection
        beatInterval.current = setInterval(() => {
          onBeat();
        }, beatTime);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleAudioError = () => {
    console.error("Audio file could not be loaded");
    setAudioError(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/80 to-transparent">
      <div className="container flex items-center justify-between gap-4">
        <audio 
          ref={audioRef} 
          src="/techno-beat.mp3" 
          loop 
          onError={handleAudioError}
          onEnded={() => setIsPlaying(false)}
        />
        
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
          {audioError && (
            <AlertCircle size={16} className="text-red-400" />
          )}
          <p>124 BPM {audioError ? "Simulated" : "Minimal Techno"}</p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
