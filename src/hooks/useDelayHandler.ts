import { BreakReason } from "../../types/type";
import { useMusic } from "./useMusic";
import { randomDurationMs } from "../utils/utils";

export function useDelayHandler() {
  const { playMusic, stopMusic } = useMusic();

  async function handleDelayedExecution(breakReason: string): Promise<void> {
    return new Promise((resolve) => {
      if (breakReason === BreakReason.MUSIC) {
        playMusic();
        setTimeout(() => {
          stopMusic();
          resolve();
        }, randomDurationMs());
      } else {
        setTimeout(resolve, 1000);
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
