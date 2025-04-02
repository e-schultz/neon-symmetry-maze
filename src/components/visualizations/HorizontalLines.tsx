
import React from 'react';
import { HorizontalLinesProps } from './types';

const HorizontalLines: React.FC<HorizontalLinesProps> = ({ count, size }) => {
  const generateHorizontalLines = () => {
    const lines = [];
    const spacing = size / (count + 1);
    
    for (let i = 0; i < count; i++) {
      const y = spacing * (i + 1);
      const opacity = 0.3 + (i / count) * 0.7;
      
      lines.push(
        <line
          key={`line-${i}`}
          x1={0}
          y1={y}
          x2={size}
          y2={y}
          className="horizontal-line stroke-neon-cyan"
          strokeWidth="1"
          style={{ opacity }}
        />
      );
    }
    
    return lines;
  };

  return <>{generateHorizontalLines()}</>;
};

export default HorizontalLines;
