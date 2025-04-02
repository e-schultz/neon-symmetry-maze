import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import PerimeterDots from './visualizations/PerimeterDots';
import VerticalBars from './visualizations/VerticalBars';
import ConcentricCircles from './visualizations/ConcentricCircles';
import HorizontalLines from './visualizations/HorizontalLines';
import CentralElement from './visualizations/CentralElement';
import CornerPatterns from './visualizations/CornerPatterns';

const GeometricVisualization: React.FC = () => {
  const isMobile = useIsMobile();
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
