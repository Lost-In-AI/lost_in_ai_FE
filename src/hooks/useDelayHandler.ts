import { BreakReason } from "../../types/type";
import { useMusic } from "./useMusic";
import { randomDurationMs } from "../utils/utils";

export function useDelayHandler() {
  const { playMusic, stopMusic } = useMusic();

  async function handleDelayedExecution(breakReason: string, abortSignal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      if (abortSignal?.aborted) {
        reject(new Error("AbortError"));
        return;
      }
      let timeoutId: number | undefined;
      const cleanup = () => {
        if (timeoutId !== undefined) clearTimeout(timeoutId);
        stopMusic();
      };
      const abortHandler = () => {
        cleanup();
        reject(new Error("AbortError"));
      };
      abortSignal?.addEventListener("abort", abortHandler);
      if (breakReason === BreakReason.MUSIC) {
        //console.log("play")
        playMusic();
        timeoutId = setTimeout(() => {
          stopMusic();
          abortSignal?.removeEventListener("abort", abortHandler);
          //console.log("abort!");
          resolve();
        }, randomDurationMs());
      } else {
        timeoutId = setTimeout(() => {
          abortSignal?.removeEventListener("abort", abortHandler);
          resolve();
        }, 1000);
      }
    });
  }

  function delayCleanup() {
    stopMusic();
  }

  return {
    delayCleanup,
    handleDelayedExecution,
  };
}
