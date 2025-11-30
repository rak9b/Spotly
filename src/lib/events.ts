// Simple event bus for app-wide signals
export const AI_EVENTS = {
  OPEN_CHAT: 'ai:open-chat',
  START_VOICE_MODE: 'ai:start-voice-mode',
  VOICE_SEARCH_RESULT: 'ai:voice-search-result'
};

export const triggerAI = {
  openChat: () => window.dispatchEvent(new CustomEvent(AI_EVENTS.OPEN_CHAT)),
  startVoiceMode: () => window.dispatchEvent(new CustomEvent(AI_EVENTS.START_VOICE_MODE)),
  emitVoiceResult: (text: string) => window.dispatchEvent(new CustomEvent(AI_EVENTS.VOICE_SEARCH_RESULT, { detail: text }))
};
