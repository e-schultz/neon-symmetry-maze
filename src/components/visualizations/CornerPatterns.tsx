
import React from 'react';
import { CornerPatternsProps } from './types';

const CornerPatterns: React.FC<CornerPatternsProps> = ({ isMobile }) => {
  return (
    <g className="opacity-60">
      <path
        d="M50,50 L80,80 L50,110 L20,80 Z"
        className="maze-pattern fill-none stroke-neon-white"
        strokeWidth="1"
      />
      
      <path
        d="M550,50 L520,80 L550,110 L580,80 Z"
        className="maze-pattern fill-none stroke-neon-white"
        strokeWidth="1"
        style={{ display: isMobile ? 'none' : 'block' }}
      />
      
      <path
        d="M50,550 L80,520 L50,490 L20,520 Z"
        className="maze-pattern fill-none stroke-neon-white"
        strokeWidth="1"
        style={{ display: isMobile ? 'none' : 'block' }}
      />
      
      <path
        d="M550,550 L520,520 L550,490 L580,520 Z"
        className="maze-pattern fill-none stroke-neon-white"
        strokeWidth="1"
        style={{ display: isMobile ? 'none' : 'block' }}
      />
    </g>
  );
};

export default CornerPatterns;
