
import React, { useEffect, useRef } from 'react';

interface ElevenLabsConvAIProps {
  agentId: string;
}

const ElevenLabsConvAI: React.FC<ElevenLabsConvAIProps> = ({ agentId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create the elevenlabs-convai element
    if (containerRef.current) {
      // Check if element already exists to prevent duplicates
      if (!containerRef.current.querySelector('elevenlabs-convai')) {
        const convaiElement = document.createElement('elevenlabs-convai');
        convaiElement.setAttribute('agent-id', agentId);
        containerRef.current.appendChild(convaiElement);
      }
    }
    
    return () => {
      // Clean up when component unmounts
      if (containerRef.current) {
        const convaiElement = containerRef.current.querySelector('elevenlabs-convai');
        if (convaiElement) {
          containerRef.current.removeChild(convaiElement);
        }
      }
    };
  }, [agentId]);

  return (
    <div ref={containerRef} className="elevenlabs-convai-container h-full w-full">
      {/* The elevenlabs-convai element will be inserted here */}
    </div>
  );
};

export default ElevenLabsConvAI;
