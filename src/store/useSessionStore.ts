import { create } from "zustand";
import type { Message, SessionData } from "../../types/type";
import { generateSessionID } from "../utils/utils";

interface SessionStore {
  sessionData: SessionData;
  updateSession: (updates: Partial<SessionData>) => void;
  saveToStorage: (data: SessionData) => void;
  pushMessageToHistory: (message: Message) => void;
  removeLastNMessagesFromHistory: (count: number) => void;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  sessionData: (() => {
    const storedData = sessionStorage.getItem("session");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return {
        session_id: generateSessionID(),
        history: [],
      };
    }
  })(),
  updateSession: (updates: Partial<SessionData>) => {
    const current = get().sessionData;
    const updated = { ...current, ...updates };
    get().saveToStorage(updated);
  },
  saveToStorage: (data: SessionData) => {
    sessionStorage.setItem("session", JSON.stringify(data));
    set({ sessionData: data });
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
}));
