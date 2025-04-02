
import React from 'react';
import { VerticalBarsProps } from './types';

const VerticalBars: React.FC<VerticalBarsProps> = ({ count, size }) => {
  const generateVerticalBars = () => {
    const bars = [];
    const spacing = size / (count + 1);
    
    for (let i = 0; i < count; i++) {
      const x = spacing * (i + 1);
      
      bars.push(
        <line
          key={`bar-${i}`}
          x1={x}
          y1={0}
          x2={x}
          y2={size}
          className="stroke-neon-cyan opacity-30 vertical-bar animate-h-move"
          strokeWidth="1"
          style={{ '--index': i } as React.CSSProperties}
        />
      );
    }
    
    return bars;
  };

  return <>{generateVerticalBars()}</>;
};

export default VerticalBars;
