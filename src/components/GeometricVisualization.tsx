
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface GeometricVisualizationProps {
  beatActive: boolean;
}

const GeometricVisualization: React.FC<GeometricVisualizationProps> = ({ beatActive }) => {
  const isMobile = useIsMobile();
  const [pulse, setPulse] = useState(false);
  
  // Set up temporary beat effect
  useEffect(() => {
    if (beatActive) {
      setPulse(true);
      const timer = setTimeout(() => {
        setPulse(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [beatActive]);

  const size = isMobile ? 300 : 600;
  const halfSize = size / 2;
  const centerPoint = { x: halfSize, y: halfSize };
  
  // Generate perimeter dots
  const generatePerimeterDots = (count: number) => {
    const dots = [];
    const radius = halfSize * 0.9;
    
    for (let i = 0; i < count; i++) {
      const angle = (i * 2 * Math.PI) / count;
      const x = centerPoint.x + radius * Math.cos(angle);
      const y = centerPoint.y + radius * Math.sin(angle);
      
      dots.push(
        <circle
          key={`dot-${i}`}
          cx={x}
          cy={y}
          r={3}
          className="fill-neon-purple perimeter-dot animate-pulse-slow"
          style={{ '--index': i } as React.CSSProperties}
        />
      );
    }
    
    return dots;
  };

  // Generate vertical bars
  const generateVerticalBars = (count: number) => {
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

  // Generate concentric circles
  const generateConcentricCircles = (count: number) => {
    const circles = [];
    const maxRadius = halfSize * 0.8;
    const radiusStep = maxRadius / count;
    
    for (let i = 1; i <= count; i++) {
      const radius = radiusStep * i;
      const isOddCircle = i % 2 === 1;
      
      circles.push(
        <circle
          key={`circle-${i}`}
          cx={centerPoint.x}
          cy={centerPoint.y}
          r={radius}
          fill="none"
          className={`dashed-circle stroke-neon-white opacity-70 ${
            isOddCircle ? 'animate-rotate-slow' : 'animate-rotate-counter'
          }`}
          strokeWidth="1"
        />
      );
    }
    
    return circles;
  };

  // Generate horizontal lines
  const generateHorizontalLines = (count: number) => {
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

  return (
    <div className="flex justify-center items-center w-full">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Background elements */}
        {generateHorizontalLines(8)}
        {generateVerticalBars(20)}
        
        {/* Concentric circles */}
        {generateConcentricCircles(5)}
        
        {/* Perimeter dots */}
        {generatePerimeterDots(16)}
        
        {/* Central diamond with rotation */}
        <g 
          className={`animate-rotate-slow ${pulse ? 'opacity-100' : 'opacity-80'}`} 
          style={{ transformOrigin: `${halfSize}px ${halfSize}px` }}
        >
          <polygon
            points={`${centerPoint.x},${centerPoint.y - halfSize * 0.7} ${centerPoint.x + halfSize * 0.7},${centerPoint.y} ${centerPoint.x},${centerPoint.y + halfSize * 0.7} ${centerPoint.x - halfSize * 0.7},${centerPoint.y}`}
            className="fill-none stroke-neon-magenta"
            strokeWidth="2"
          />
          
          {/* Inner symmetric maze patterns */}
          <path
            d="M300,200 L330,230 L300,260 L270,230 Z"
            className="maze-pattern fill-none stroke-neon-cyan"
            strokeWidth="1.5"
            transform={`scale(${isMobile ? 0.5 : 1}) translate(${isMobile ? halfSize : 0}, ${isMobile ? halfSize : 0})`}
          />
          
          <path
            d="M300,200 L330,230 L300,260"
            className="maze-pattern fill-none stroke-neon-purple"
            strokeWidth="1.5"
            transform={`scale(${isMobile ? 0.5 : 1}) translate(${isMobile ? halfSize : 0}, ${isMobile ? halfSize : 0})`}
          />
        </g>
        
        {/* Corner maze patterns */}
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
        
        {/* Central pulsing element */}
        <circle
          cx={centerPoint.x}
          cy={centerPoint.y}
          r={pulse ? 10 : 8}
          className={`fill-neon-magenta transition-all duration-300 ${
            pulse ? 'opacity-100' : 'opacity-70'
          }`}
        />
      </svg>
    </div>
  );
};

export default GeometricVisualization;
