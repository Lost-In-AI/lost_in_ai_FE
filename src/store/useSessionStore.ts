import { create } from "zustand";
import type { SessionData } from "../../types/type";
import { generateSessionID } from "../utils/utils";

interface SessionStore {
  sessionData: SessionData;
  isLoading: boolean;
  updateSession: (updates: Partial<SessionData>) => void;
  loadMockData: () => Promise<void>;
  saveToStorage: (data: SessionData) => void;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  sessionData: (() => {
    const storedData = sessionStorage.getItem("session");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return {
        sessionID: generateSessionID(),
      };
    }
  })(),
  isLoading: !sessionStorage.getItem("session"),
  saveToStorage: (data: SessionData) => {
    sessionStorage.setItem("session", JSON.stringify(data));
    set({ sessionData: data });
  },

  updateSession: (updates: Partial<SessionData>) => {
    const current = get().sessionData;
    const updated = { ...current, ...updates };
    get().saveToStorage(updated);
  },

  loadMockData: async () => {
    const { sessionData } = get();
    if (sessionData) {
      try {
        const response = await fetch("/mocks/chatbot.json");
        if (!response.ok) {
          throw new Error(`Error has occured ${response.status}`);
        }
        const mockData: SessionData = await response.json();
        get().saveToStorage(mockData);
      } catch (error) {
        console.error("Failed to load mock data:", error);
      } finally {
        set({ isLoading: false });
      }
    }
  },
}));
