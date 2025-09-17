import { create } from "zustand";

type LoadingStatus = "idle" | "pending";

interface ChatStatusState {
  loading: LoadingStatus;
  setStatus: (status: LoadingStatus) => void;
  abortController: AbortController | null;
  setAbortController: (controller: AbortController | null) => void;
  cancelRequest: () => void;
}

export const useChatStatusStore = create<ChatStatusState>((set, get) => ({
  loading: "idle",
  abortController: null,
  setStatus: (status) => {
    set({ loading: status });
  },
  setAbortController: (controller) => {
    set({ abortController: controller });
  },
  cancelRequest: () => {
    const { abortController } = get();
    if (abortController) {
      abortController.abort();
      set({
        loading: "idle",
        abortController: null,
      });
    }
  },
}));
