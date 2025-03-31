
import React from 'react';
import ElevenLabsConvAI from '@/components/ElevenLabsConvAI';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="text-center py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-glow text-jarvis-teal">JARVIS</h1>
        <p className="text-muted-foreground text-sm">Voice Interface System</p>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl glass-card rounded-lg overflow-hidden h-[70vh]">
          <ElevenLabsConvAI agentId="mWbeYF3ci0AbOBoj8cmg" />
        </div>
      </div>
      
      <footer className="py-3 text-center text-xs text-muted-foreground">
        <p>Powered by ElevenLabs</p>
      </footer>
    </div>
  );
};

export default Index;
