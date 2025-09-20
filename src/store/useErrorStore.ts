import { create } from "zustand";

export const AppError = {
  PLAYER_NOT_FOUND: "PLAYER_NOT_FOUND",
  API_TIMEOUT: "API_TIMEOUT",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  UNKNOWN: "UNKNOWN",
} as const;

export type AppError = typeof AppError[keyof typeof AppError];


export const errorMessages: Record<AppError, string> = {
  [AppError.PLAYER_NOT_FOUND]:
    "Si è verificato un errore con il player della canzone. Ci stiamo lavorando",
  [AppError.API_TIMEOUT]: "La connessione è lenta, riprova tra poco",
  [AppError.INVALID_CREDENTIALS]:
    "Credenziali non valide, controlla email e password",
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
      currentError:
        errorMessages[error] || errorMessages[AppError.UNKNOWN],
    }),
  clearError: () => set({ currentError: null }),
}));
