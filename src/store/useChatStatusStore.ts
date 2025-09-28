import { create } from "zustand";

type LoadingStatus = "idle" | "pending";

interface ChatStatusState {
  loading: LoadingStatus;
  setStatus: (status: LoadingStatus) => void;
  shouldAnimateLastMessage: boolean;
  setShouldAnimateLastMessage: (value: boolean) => void;
  animationResolver: (() => void) | null;
  waitAnimation: () => Promise<void>;
  completeAnimation: () => void;
}

export const useChatStatusStore = create<ChatStatusState>((set, get) => ({
  loading: "idle",
  setStatus: (status) => {
    set({ loading: status });
  },
  shouldAnimateLastMessage: false,
  setShouldAnimateLastMessage: (value: boolean) => set({ shouldAnimateLastMessage: value }),
  animationResolver: null,
  waitAnimation: () => {
    return new Promise((resolve) => {
      set({ animationResolver: resolve });
    });
  },
  completeAnimation: () => {
    const { animationResolver } = get();
    if (animationResolver) {
      animationResolver();
      set({ animationResolver: null });
    }
  },
}));
