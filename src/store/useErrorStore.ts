import { create } from "zustand";

export const AppError = {
  PLAYER_NOT_FOUND: "PLAYER_NOT_FOUND",
  API_TIMEOUT: "API_TIMEOUT",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  AUDIO_PLAYBACK_ERROR: "AUDIO_PLAYBACK_ERROR",
  WHILE_POSTING_ERROR: "WHILE_POSTING_ERRO",
  BOT_RESPONSE_ERROR: "BOT_RESPONSE_ERROR",
  UNKNOWN: "UNKNOWN",
} as const;

export type AppError = (typeof AppError)[keyof typeof AppError];

export const errorMessages: Record<AppError, string> = {
  [AppError.PLAYER_NOT_FOUND]: "Si è verificato un errore con il player della canzone. Ci stiamo lavorando",
  [AppError.API_TIMEOUT]: "La connessione è lenta, riprova tra poco",
  [AppError.INVALID_CREDENTIALS]: "Credenziali non valide, controlla email e password",
  [AppError.AUDIO_PLAYBACK_ERROR]: "Si è verificato un errore durante la riproduzione audio",
  [AppError.WHILE_POSTING_ERROR]: "Si è verificato un errore durante l'inserimento del messaggio",
  [AppError.BOT_RESPONSE_ERROR]: "Il bot non ha restituito una risposta valida. Riprova tra poco",
  [AppError.UNKNOWN]: "Si è verificato un errore inatteso",
};

interface ErrorState {
  currentError: string | null;
  addError: (error: AppError) => void;
  clearError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  currentError: null,
  addError: (error: AppError) =>
    set({
      currentError: errorMessages[error] || errorMessages[AppError.UNKNOWN],
    }),
  clearError: () => set({ currentError: null }),
}));
