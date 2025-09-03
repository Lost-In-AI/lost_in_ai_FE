import { create } from "zustand";
// Interfaccia per lo state dello store, definisce tipi e metodi disponibili
interface BearState {
  bears: number;
  maxBears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  setBears: (count: number) => void;
  doublePopulation: () => void;
  resetToMax: () => void;
}

export const useBearStore = create<BearState>((set, get) => ({
  bears: 0,
  maxBears: 10,
  // Esempio di SET semplice
  setBears: (count: number) => set({ bears: count }),
  removeAllBears: () => set({ bears: 0 }),
  // Esempio di SET con stato precedente
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // Esempio di SET con GET - raddoppia popolazione usando get()
  doublePopulation: () => {
    const currentBears = get().bears;
    set({ bears: currentBears * 2 });
  },
  // Esempio di SET con GET - resetta al massimo usando get()
  resetToMax: () => {
    const maxBears = get().maxBears;
    set({ bears: maxBears });
  },
}));
