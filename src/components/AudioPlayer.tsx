
import React from 'react';
import TonePlayer from './TonePlayer';
import PlayPauseButton from './audio/PlayPauseButton';
import VolumeControl from './audio/VolumeControl';
import TrackInfo from './audio/TrackInfo';
import TimeProgress from './audio/TimeProgress';
import { useAudio } from '@/contexts/AudioContext';

interface AudioPlayerProps {
  onBeat: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ onBeat }) => {
  const { 
    isPlaying, 
    togglePlayback, 
    volume, 
    setVolume, 
    isMuted, 
    toggleMute,
    bpm,
    genre,
    progress,
    elapsedTime,
    totalTime
  } = useAudio();

  // Calculate effective volume (considering mute state)
  const effectiveVolume = isMuted ? 0 : volume;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/80 to-transparent">
      <TonePlayer 
        isPlaying={isPlaying} 
        volume={effectiveVolume}
        onBeat={onBeat}
      />
      
      <div className="container flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <PlayPauseButton
            isPlaying={isPlaying}
            onTogglePlayPause={togglePlayback}
          />
          
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={setVolume}
            onToggleMute={toggleMute}
          />
          
          <TrackInfo bpm={bpm} genre={genre} />
        </div>
        
        <TimeProgress 
          progress={progress}
          elapsedTime={elapsedTime}
          totalTime={totalTime}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
