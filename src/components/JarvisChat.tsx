
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import MessageList from "./MessageList";
import AudioWave from "./AudioWave";

interface Message {
  id: string;
  text: string;
  sender: "user" | "jarvis";
  timestamp: Date;
}

const JarvisChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello, I am Jarvis. How can I assist you today?",
      sender: "jarvis",
      timestamp: new Date(),
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // ElevenLabs API key - in a production app, this should be stored securely
  const ELEVENLABS_API_KEY = ""; // You will need to provide this
  const WEBHOOK_URL = "https://echo.zuplo.io"; // Replace with your actual webhook
  
  useEffect(() => {
    // Scroll to bottom of messages on new message
    const messagesContainer = document.getElementById("messages-container");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        await processAudioBlob(audioBlob);
        
        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast({
        title: "Microphone Error",
        description: "Could not access your microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const processAudioBlob = async (audioBlob: Blob) => {
    try {
      // First, use ElevenLabs to transcribe the audio
      const formData = new FormData();
      formData.append("audio", audioBlob);
      
      // This is a mock implementation - you would use the actual ElevenLabs API
      // For demo purposes, we'll simulate successful transcription
      // const transcriptionResponse = await fetch(
      //   "https://api.elevenlabs.io/v1/speech-to-text",
      //   {
      //     method: "POST",
      //     headers: {
      //       "xi-api-key": ELEVENLABS_API_KEY,
      //     },
      //     body: formData,
      //   }
      // );
      
      // Simulate transcription for demo (remove in production)
      await new Promise(resolve => setTimeout(resolve, 1000));
      const transcribedText = "What's the weather today?"; // In production, get from transcriptionResponse
      
      // Add user message to chat
      const userMessageId = Date.now().toString();
      const userMessage = {
        id: userMessageId,
        text: transcribedText,
        sender: "user" as const,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      
      // Send to webhook
      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: transcribedText, userId: "user123" }),
      });
      
      if (!webhookResponse.ok) {
        throw new Error("Webhook request failed");
      }
      
      // Get webhook response
      const responseData = await webhookResponse.json();
      
      // For demo, we'll use a hardcoded response
      const jarvisResponse = {
        id: (Date.now() + 1).toString(),
        text: responseData.message || "I've processed your request. The current weather is sunny and 72°F.",
        sender: "jarvis" as const,
        timestamp: new Date(),
      };
      
      // Add Jarvis response to chat
      setMessages((prev) => [...prev, jarvisResponse]);
      
      // In production, use ElevenLabs to synthesize speech from jarvisResponse.text
      // and play it back to the user
      
      setIsProcessing(false);
    } catch (error) {
      console.error("Error processing audio:", error);
      toast({
        title: "Processing Error",
        description: "There was an error processing your request.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-glow text-jarvis-teal">JARVIS</h1>
        <p className="text-muted-foreground text-sm">Voice Interface System</p>
      </header>
      
      <div className="flex-1 glass-card rounded-lg p-4 overflow-hidden flex flex-col">
        <MessageList messages={messages} />
        
        <div className="pt-4 border-t border-jarvis-blue/20 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {isRecording && (
                <AudioWave />
              )}
              {isProcessing && (
                <div className="text-center text-sm text-muted-foreground animate-pulse">
                  Processing your request...
                </div>
              )}
            </div>
            
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              size="lg"
              variant={isRecording ? "destructive" : "default"}
              className={`rounded-full p-3 ${isRecording ? '' : 'bg-jarvis-blue hover:bg-jarvis-blue/90 animate-pulse-glow'}`}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {isRecording ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>
          </div>
          
          <p className="text-xs text-center mt-2 text-muted-foreground">
            {isRecording
              ? "Listening... Click the button to stop."
              : "Click the microphone to speak to Jarvis"}
          </p>
        </div>
      </div>
      
      <footer className="py-3 text-center text-xs text-muted-foreground">
        <p>Powered by ElevenLabs</p>
      </footer>
    </div>
  );
};

export default JarvisChat;
