import { create } from "zustand";
import type { SessionData } from "../../types/type";
import { generateSessionID } from "../utils/utils";

interface SessionStore {
  sessionData: SessionData;
  shouldAnimateLastMessage: boolean;
  updateSession: (updates: Partial<SessionData>) => void;
  saveToStorage: (data: SessionData) => void;
  setShouldAnimateLastMessage: (value: boolean) => void;
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

  shouldAnimateLastMessage: false,

  saveToStorage: (data: SessionData) => {
    sessionStorage.setItem("session", JSON.stringify(data));
    set({ sessionData: data });
  },

  updateSession: (updates: Partial<SessionData>) => {
    const current = get().sessionData;
    const updated = { ...current, ...updates };
    get().saveToStorage(updated);
  },

  setShouldAnimateLastMessage: (value) => set({ shouldAnimateLastMessage: value }),
}));
