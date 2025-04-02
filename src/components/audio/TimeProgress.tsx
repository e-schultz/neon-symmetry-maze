
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface TimeProgressProps {
  progress: number;
  elapsedTime: string;
  totalTime: string;
  className?: string;
}

const TimeProgress: React.FC<TimeProgressProps> = ({
  progress,
  elapsedTime,
  totalTime,
  className = "flex items-center gap-2 flex-1"
}) => {
  // Convert progress from 0-1 to 0-100 for the Progress component
  const progressPercentage = progress * 100;
  
  return (
    <div className={className}>
      <span className="text-xs text-neon-purple min-w-12">{elapsedTime}</span>
      <Progress 
        value={progressPercentage} 
        className="h-2 flex-1" 
        indicatorClassName="bg-gradient-to-r from-neon-purple to-neon-cyan" 
      />
      <span className="text-xs text-neon-purple min-w-12 text-right">{totalTime}</span>
    </div>
  );
};

export default TimeProgress;
