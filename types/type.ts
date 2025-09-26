// Qui puoi inserire le tipizzazioni globali dell'applicazione

export interface NavigationType {
  path: string;
  element: React.ReactElement;
  name: string;
}

export interface ExampleBtn {
  handleClick: () => void;
  text: string;
  className: string;
}

export const Endpoint = {
  SEND_MESSAGE: (import.meta.env.VITE_BE_BASE_URL as string) + "/api/chat",
} as const;

// Tipizzazione per il mock delle API responses che simulano la chat

export type ValueOf<T> = T[keyof T];
export type KeysOf<T> = keyof T;

export const Sender = {
  ASSISTANT: "assistant",
  USER: "user",
} as const;

export const replacePlaceholder = {
  BANK_NAME: "Lost in AI",
  CHATBOT_NAME: "Bankly",
  // aggiungere le altre variabili
} as const;

export type Placeholders = Record<KeysOf<typeof replacePlaceholder>, string>;

export interface Message {
  sender: ValueOf<typeof Sender>;
  text: string;
  timestamp?: string;
}

export interface SessionData {
  session_id: string;
  history: Message[];
  current_message?: string;
  summary?: string;
}

export const BreakReason = {
  MUSIC: "music",
} as const;

export const BotPersonalities = {
  WITTY: "witty",
} as const;

export interface BackendResponse {
  response_code: number;
  session_id: string;
  current_responses: Array<Message>;
  summary: string;
  history: Array<Message>;
  break_reason: (typeof BreakReason)[keyof typeof BreakReason];
  bot_personality?: (typeof BotPersonalities)[keyof typeof BotPersonalities];
}


export  interface FormData {
  email: string | null
  password: string | null
  name: string | null
  surname: string | null
}