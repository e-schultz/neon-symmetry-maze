
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import PerimeterDots from './visualizations/PerimeterDots';
import VerticalBars from './visualizations/VerticalBars';
import ConcentricCircles from './visualizations/ConcentricCircles';
import HorizontalLines from './visualizations/HorizontalLines';
import CentralElement from './visualizations/CentralElement';
import CornerPatterns from './visualizations/CornerPatterns';

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

  return (
    <div className="flex justify-center items-center w-full">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Background elements */}
        <HorizontalLines count={8} size={size} centerPoint={centerPoint} />
        <VerticalBars count={20} size={size} centerPoint={centerPoint} />
        
        {/* Concentric circles */}
        <ConcentricCircles count={5} size={size} centerPoint={centerPoint} />
        
        {/* Perimeter dots */}
        <PerimeterDots count={16} size={size} centerPoint={centerPoint} />
        
        {/* Central diamond with rotation */}
        <CentralElement 
          pulse={pulse} 
          size={size} 
          centerPoint={centerPoint}
          isMobile={isMobile} 
        />
        
        {/* Corner maze patterns */}
        <CornerPatterns size={size} centerPoint={centerPoint} isMobile={isMobile} />
      </svg>
    </div>
  );
};

export default GeometricVisualization;
