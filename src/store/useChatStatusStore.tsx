import { create } from "zustand";

type LoadingStatus = "idle" | "pending";

interface ChatStatusState {
  loading: LoadingStatus;
  setStatus: (status: LoadingStatus) => void;
}

export const useChatStatusStore = create<ChatStatusState>((set) => ({
  loading: "idle",
  setStatus: (status) => {
    set({ loading: status });
  },
}));
