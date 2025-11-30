import { useState, useEffect, useCallback, useRef } from 'react';
import { AI_PERSONA, SENSITIVE_DATA_REGEX } from '../lib/ai-config';
import { VoiceLanguage } from '../types/ai.types';

// --- Speech Recognition Types ---
// We declare these locally to avoid conflicts with dom.lib.d.ts if it evolves
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

// Extend the Window interface
declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionCtor) {
      const recognition = new SpeechRecognitionCtor();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-GB'; // Default to en-GB as per project rules

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result && result[0]) {
             currentTranscript += result[0].transcript;
          }
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        // Handle specific error cases for better user feedback
        if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please allow permissions in browser settings.');
        } else if (event.error === 'no-speech') {
          setError('No speech detected. Please try again.');
        } else {
          setError(event.error);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setError('Speech recognition not supported in this browser.');
    }

    // Cleanup function to abort recognition on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        setTranscript('');
        setError(null);
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Failed to start recognition", e);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    error,
    isSupported: !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  };
};

// --- Enhanced Text To Speech ---

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const synth = window.speechSynthesis;

  // Load voices and select based on preference
  useEffect(() => {
    const loadVoices = () => {
      const voices = synth.getVoices();
      // Priority: en-GB -> en-US -> Default
      const preferredVoice = 
        voices.find(v => v.lang === 'en-GB') || 
        voices.find(v => v.lang === 'en-US') ||
        voices[0];
      
      setSelectedVoice(preferredVoice);
    };

    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, [synth]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback((text: string, language: VoiceLanguage = 'en-GB') => {
    if (!isEnabled || !synth) return;

    // Safety: Mask sensitive data before speaking
    let safeText = text;
    SENSITIVE_DATA_REGEX.forEach(regex => {
      safeText = safeText.replace(regex, '[hidden details]');
    });

    // Strip SSML tags for browser TTS (Browser TTS doesn't support SSML natively usually)
    const plainText = safeText.replace(/<[^>]*>/g, '');

    synth.cancel(); // Cancel previous

    const utterance = new SpeechSynthesisUtterance(plainText);
    
    // Apply Persona Attributes
    utterance.rate = AI_PERSONA.attributes.rate;
    utterance.pitch = AI_PERSONA.attributes.pitch;
    utterance.volume = AI_PERSONA.attributes.volume;

    // Attempt to switch voice if language requested differs from current
    if (selectedVoice && selectedVoice.lang !== language) {
       const voices = synth.getVoices();
       const newVoice = voices.find(v => v.lang.startsWith(language));
       if (newVoice) utterance.voice = newVoice;
       else utterance.voice = selectedVoice;
    } else if (selectedVoice) {
       utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error("TTS Error", e);
      setIsSpeaking(false);
    };

    synth.speak(utterance);
  }, [isEnabled, synth, selectedVoice]);

  const cancel = useCallback(() => {
    if (synth) {
      synth.cancel();
      setIsSpeaking(false);
    }
  }, [synth]);

  const toggleSound = useCallback(() => {
    setIsEnabled(prev => {
      if (prev) cancel();
      return !prev;
    });
  }, [cancel]);

  return {
    speak,
    cancel,
    isSpeaking,
    isEnabled,
    toggleSound
  };
};
