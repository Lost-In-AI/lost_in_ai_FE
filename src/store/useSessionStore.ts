import { create } from "zustand";
import type { BotPersonalities, Message, SessionData } from "../../types/type";

interface SessionStore {
  sessionData: SessionData;
  currentPersonality: BotPersonalities;
  lastMessagePersonality: () => BotPersonalities | undefined;
  setCurrentPersonality: (personality: BotPersonalities) => void;
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
  currentPersonality: "witty" as BotPersonalities,
  lastMessagePersonality: () => {
    const current = get().sessionData;
    return current.history.at(-1)?.bot_personality;
  },
  setCurrentPersonality: (personality: BotPersonalities) => {
    set({ currentPersonality: personality });
  },
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

    // Update current personality if message has bot_personality
    if (message.bot_personality) {
      get().setCurrentPersonality(message.bot_personality);
    }
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
