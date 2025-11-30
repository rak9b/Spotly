// Configuration for AI Persona and Voice Templates

export const AI_PERSONA = {
  name: "LocalGuide AI",
  attributes: {
    rate: 0.95, // Slightly slower for clarity
    pitch: 1.0, // Neutral
    volume: 1.0, // Normalized
  },
  languages: ['en-GB', 'en-US', 'bn-BD', 'es-ES'] as const,
};

// SSML Templates for standardized responses
export const SSML_TEMPLATES = {
  booking_confirmation: (eventName: string, date: string) => `
    <speak>
      <p>Booking confirmed for <phoneme alphabet="ipa" ph="${eventName}">${eventName}</phoneme>.</p>
      <break time="300ms"/>
      <p>I've scheduled it for <say-as interpret-as="date">${date}</say-as>.</p>
    </speak>
  `,
  
  itinerary_summary: (city: string, days: number) => `
    <speak>
      <p>I've generated a ${days}-day trip for ${city}.</p>
      <break time="300ms"/>
      <p>It includes <prosody rate="medium">local food tours</prosody> and hidden gems.</p>
    </speak>
  `,

  payment_prompt: (amount: string) => `
    <speak>
      The total comes to ${amount}. 
      <break time="120ms"/>
      Please confirm to proceed with the payment.
    </speak>
  `,

  safety_alert: () => `
    <speak>
      <prosody volume="loud">Safety Notice.</prosody>
      <break time="200ms"/>
      This area has a weather alert. Would you like to share your live location?
    </speak>
  `,
  
  error_fallback: () => `
    <speak>
      I'm having trouble connecting right now. <break time="200ms"/> Please try again later.
    </speak>
  `
};

// Regex for masking sensitive data before TTS reads it
export const SENSITIVE_DATA_REGEX = [
  /\b(?:\d[ -]*?){13,16}\b/g, // Credit Card numbers
  /\b\d{3}-\d{2}-\d{4}\b/g,   // SSN-like patterns
  /passport/i                 // Keyword 'passport' context
];
