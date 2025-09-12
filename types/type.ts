// Qui puoi inserire le tipizzazioni globali dell'applicazione

export interface NavigationType {
  path: string;
  element: React.ReactNode;
}

export interface ExampleBtn {
  handleClick: () => void;
  text: string;
  className: string;
}

export const Endpoint = {
  SEND_MESSAGE: import.meta.env.VITE_BE_BASE_URL as string + "/api/test/chat"
} as const;

// Tipizzazione per il mock delle API responses che simulano la chat

export type ValueOf<T> = T[keyof T];

export const Sender = {
  BOT: "bot",
  USER: "user",
} as const;

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

export interface BackendResponse {
  response_code: number;
  session_id: string;
  current_response: Message;
  summary: string;
  history: Message;
  music: boolean;
}
