
import { CSSProperties } from "react";

export interface VisualizationElementProps {
  size: number;
  centerPoint: { x: number; y: number };
}

export interface PerimeterDotsProps extends VisualizationElementProps {
  count: number;
}

export interface VerticalBarsProps extends VisualizationElementProps {
  count: number;
}

export interface ConcentricCirclesProps extends VisualizationElementProps {
  count: number;
}

export interface HorizontalLinesProps extends VisualizationElementProps {
  count: number;
}

export interface CentralElementProps extends VisualizationElementProps {
  pulse: boolean;
  isMobile: boolean;
}

export interface CornerPatternsProps extends VisualizationElementProps {
  isMobile: boolean;
}
