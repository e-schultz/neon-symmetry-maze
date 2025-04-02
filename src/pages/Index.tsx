
import { useState, useEffect } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import GeometricVisualization from '@/components/GeometricVisualization';
import { useToast } from '@/components/ui/use-toast';
import { InfoIcon } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [beatActive, setBeatActive] = useState(false);
  
  const handleBeat = () => {
    setBeatActive(true);
    // Reset beat state after a brief period
    setTimeout(() => {
      setBeatActive(false);
    }, 100);
  };
  
  useEffect(() => {
    // Inform user about audio on page load
    toast({
      title: "Audio Information",
      description: "This experience works best with sound. Click play to start the visualization with live audio synthesis.",
      duration: 5000,
    });
  }, [toast]);
  
  const handleStartExperience = () => {
    toast({
      title: "Experience Started",
      description: "Click play to sync the visuals with the generated audio",
      duration: 5000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(121,40,202,0.1),rgba(0,0,0,0))]" />
      
      <header className="container text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-magenta text-transparent bg-clip-text">
          Geometric Symmetry
        </h1>
        <p className="text-neon-white/70 max-w-md mx-auto">
          A meditative visual experience with synchronized minimal techno at 124 BPM
        </p>
      </header>
      
      <main className="container flex-1 flex flex-col items-center justify-center">
        <div onClick={handleStartExperience} className="mb-8 cursor-pointer">
          <GeometricVisualization beatActive={beatActive} />
        </div>
        
        <div className="max-w-md text-center text-sm text-neon-white/50 mt-8">
          <p>
            This visualization features rotating geometric patterns with 4-way symmetry, synchronized to a minimal techno soundtrack.
          </p>
          
          <div className="flex items-center justify-center mt-4 p-2 rounded-md bg-gray-900/50 border border-neon-cyan/20 text-xs">
            <InfoIcon size={16} className="mr-2 text-neon-cyan" />
            <p>
              Using Tone.js to generate live minimal techno at 124 BPM.
            </p>
          </div>
        </div>
      </main>
      
      <AudioPlayer onBeat={handleBeat} />
    </div>
  );
};

export default Index;
