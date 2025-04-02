
import React from 'react';

interface TrackInfoProps {
  bpm: number;
  genre: string;
  className?: string;
}

const TrackInfo: React.FC<TrackInfoProps> = ({
  bpm,
  genre,
  className = "text-xs text-neon-cyan opacity-70 flex items-center gap-2"
}) => {
  return (
    <div className={className}>
      <p>{bpm} BPM {genre}</p>
    </div>
  );
};

export default TrackInfo;
