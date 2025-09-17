import { create } from "zustand";

type ErrorMessage = string;

interface ErrorStoreState {
  errors: Array<ErrorMessage>;
  pushError: (error: ErrorMessage) => void;
  clearErrors: () => void;
}

export const useErrorStore = create<ErrorStoreState>((set, get) => ({
  errors: [],

  pushError: (error) => {
    const currentErrors = get().errors;
    set({ errors: [...currentErrors, error] });
  },

  clearErrors: () => set({ errors: [] }),
}));
