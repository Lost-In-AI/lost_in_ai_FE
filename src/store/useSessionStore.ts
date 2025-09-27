import { create } from "zustand";
import type { Message, SessionData } from "../../types/type";

interface SessionStore {
  sessionData: SessionData;
  setSession: (data: SessionData) => void;
  updateSession: (updates: Partial<SessionData>) => void;
  pushMessageToHistory: (message: Message) => void;
  removeLastNMessagesFromHistory: (count: number) => void;
  clearSession: () => void;
}

const initialSessionData: SessionData = {
  session_id: null,
  history: [],
};

export const useSessionStore = create<SessionStore>((set, get) => ({
  sessionData: initialSessionData,
  setSession: (data: SessionData) => {
    set({ sessionData: data });
  },
  updateSession: (updates: Partial<SessionData>) => {
    const current = get().sessionData;
    set({ sessionData: { ...current, ...updates } });
  },
  pushMessageToHistory: (message: Message) => {
    const currentHistory = get().sessionData.history;
    const updatedHistory = [...currentHistory, message];
    get().updateSession({ history: updatedHistory });
  },
  removeLastNMessagesFromHistory: (count: number) => {
    const currentHistory = get().sessionData.history;
    if (currentHistory.length >= count && count > 0) {
      const updatedHistory = currentHistory.slice(0, -count);
      get().updateSession({ history: updatedHistory });
    }
  },
  clearSession: () => {
    set({ sessionData: initialSessionData });
  },
}));
