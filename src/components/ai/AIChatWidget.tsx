import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Mic, MicOff, Volume2, VolumeX, Headphones, Minimize2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/mockApi';
import { useSpeechRecognition, useTextToSpeech } from '../../hooks/useSpeech';
import { cn } from '../../lib/utils';
import { VoiceOrb } from './VoiceOrb';

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hi! I\'m your local AI assistant. Ask me anything about events, food, or hidden gems!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice Hooks
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    resetTranscript, 
    isSupported: isSpeechSupported 
  } = useSpeechRecognition();

  const { 
    speak, 
    isEnabled: isSoundEnabled, 
    toggleSound,
    isSpeaking
  } = useTextToSpeech();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isListening]);

  // Update input with voice transcript
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Auto-send in Voice Mode when silence is detected (simulated by long pause or manual stop in this demo)
  // For this MVP, we'll rely on the user clicking send or stopping the mic manually in text mode,
  // but in Voice Mode, we can add a "Stop & Send" button.

  const handleSend = async (e?: React.FormEvent, overrideText?: string) => {
    e?.preventDefault();
    const textToSend = overrideText || input;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setInput('');
    resetTranscript();
    setIsLoading(true);

    try {
      const response = await api.ai.chat(textToSend);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
      
      // Auto-speak response if sound is enabled OR if we are in Voice Mode
      if (isSoundEnabled || isVoiceMode) {
        speak(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
    if (!isVoiceMode) {
      // Entering voice mode: ensure sound is on
      if (!isSoundEnabled) toggleSound();
    } else {
      // Exiting voice mode: stop listening
      if (isListening) stopListening();
    }
  };

  // Determine current state for the Orb
  const getOrbState = () => {
    if (isSpeaking) return 'speaking';
    if (isLoading) return 'processing';
    if (isListening) return 'listening';
    return 'idle';
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isVoiceMode ? '600px' : 'auto',
              width: isVoiceMode ? '400px' : '350px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              "fixed z-50 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-900/5 flex flex-col transition-all duration-500 ease-in-out",
              isVoiceMode 
                ? "bottom-4 right-4 sm:bottom-8 sm:right-8 h-[600px] w-[90vw] sm:w-[400px]" 
                : "bottom-20 right-4 sm:right-8 w-[350px] max-h-[600px]"
            )}
          >
            {/* Header */}
            <div className={cn(
              "flex items-center justify-between px-4 py-3 shrink-0 transition-colors duration-300",
              isVoiceMode ? "bg-gray-900 text-white" : "bg-indigo-600 text-white"
            )}>
              <div className="flex items-center gap-2">
                {isVoiceMode ? <Headphones className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                <span className="font-bold">{isVoiceMode ? "Live Conversation" : "AI Assistant"}</span>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={toggleVoiceMode}
                  className="rounded-full p-1.5 hover:bg-white/20 transition-colors"
                  title={isVoiceMode ? "Switch to Text" : "Switch to Voice Mode"}
                >
                  {isVoiceMode ? <Minimize2 className="h-4 w-4" /> : <Headphones className="h-4 w-4" />}
                </button>
                {!isVoiceMode && (
                  <button 
                    onClick={toggleSound} 
                    className="rounded-full p-1.5 hover:bg-white/20 transition-colors"
                  >
                    {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 opacity-70" />}
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="rounded-full p-1.5 hover:bg-white/20 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            {isVoiceMode ? (
              // --- VOICE MODE UI ---
              <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 relative overflow-hidden">
                {/* Background Ambient Light */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-gray-900 pointer-events-none" />
                
                {/* Orb Visualizer */}
                <div className="relative z-10 mb-8">
                  <VoiceOrb state={getOrbState()} />
                </div>

                {/* Live Status / Transcript */}
                <div className="relative z-10 w-full px-6 text-center space-y-4 min-h-[100px]">
                  <AnimatePresence mode="wait">
                    {isSpeaking ? (
                      <motion.p 
                        key="speaking"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-lg font-medium text-indigo-200"
                      >
                        {messages[messages.length - 1]?.role === 'ai' ? messages[messages.length - 1].text : "..."}
                      </motion.p>
                    ) : isListening ? (
                      <motion.p 
                        key="listening"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xl font-medium text-white"
                      >
                        "{transcript || "Listening..."}"
                      </motion.p>
                    ) : isLoading ? (
                      <motion.p 
                        key="thinking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm font-medium text-amber-400"
                      >
                        Thinking...
                      </motion.p>
                    ) : (
                      <motion.p 
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-gray-400"
                      >
                        Tap the mic to speak
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Voice Controls */}
                <div className="relative z-10 mt-8 flex items-center gap-6">
                   {/* Cancel / Clear */}
                   {isListening && (
                     <button 
                        onClick={resetTranscript}
                        className="rounded-full p-3 bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors"
                     >
                        <X className="h-5 w-5" />
                     </button>
                   )}

                   {/* Main Mic Button */}
                   <button
                    onClick={() => {
                      if (isListening) {
                        stopListening();
                        // If we have a transcript, send it immediately upon stopping
                        if (transcript.trim()) {
                          handleSend(undefined, transcript);
                        }
                      } else {
                        startListening();
                      }
                    }}
                    className={cn(
                      "h-20 w-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
                      isListening 
                        ? "bg-red-500 hover:bg-red-600 scale-110 ring-4 ring-red-500/30" 
                        : "bg-white text-gray-900 hover:scale-105"
                    )}
                   >
                     {isListening ? <MicOff className="h-8 w-8 text-white" /> : <Mic className="h-8 w-8" />}
                   </button>
                </div>
              </div>
            ) : (
              // --- TEXT CHAT MODE UI ---
              <>
                <div className="flex-1 overflow-y-auto bg-gray-50 p-4 min-h-[300px]">
                  <div className="space-y-4">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm ${
                            msg.role === 'user'
                              ? 'bg-indigo-600 text-white rounded-br-none'
                              : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-center gap-1 rounded-2xl rounded-bl-none bg-white px-4 py-2 shadow-sm border border-gray-100">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: '0ms' }} />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: '150ms' }} />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <form onSubmit={(e) => handleSend(e)} className="border-t border-gray-200 bg-white p-3 shrink-0">
                  <div className="flex gap-2 items-end">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Ask for recommendations..."
                        className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                      />
                      {isSpeechSupported && (
                        <button
                          type="button"
                          onClick={toggleVoiceMode}
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-indigo-600"
                          title="Switch to Voice Mode"
                        >
                          <Mic className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      className={cn(
                        "rounded-full h-10 w-10 p-0 shrink-0 transition-all",
                        input.trim() ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-300 hover:bg-gray-400"
                      )} 
                      disabled={isLoading || !input.trim()}
                      type="submit"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-transform hover:scale-110 hover:bg-indigo-700 sm:bottom-8 sm:right-8"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </>
  );
};
