export interface AICard {
  type: 'event' | 'itinerary_summary' | 'booking_confirmation';
  data: any;
}

export interface AIAction {
  type: 'navigate' | 'open_modal' | 'trigger_booking';
  payload: any;
}

export interface AIResponse {
  reply_text: string; // The spoken/displayed text
  ssml?: string; // Optional SSML for advanced TTS engines
  cards?: AICard[]; // Visual widgets to display
  actions?: AIAction[]; // System actions to trigger
  confidence_score?: number;
  trace_id?: string;
}

export type VoiceLanguage = 'en-US' | 'en-GB' | 'bn-BD' | 'es-ES';
