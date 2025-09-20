import { BreakReason } from "../../types/type";
import { useMusic } from "./useMusic";
import { randomDurationMs } from "../utils/utils";

export function useDelayHandler() {
  const { playMusic, stopMusic } = useMusic();

  async function handleDelayedExecution(breakReason: string): Promise<void> {
    if (breakReason === BreakReason.MUSIC) {
      playMusic();
      await new Promise((resolve) => setTimeout(resolve, randomDurationMs()));
      stopMusic();
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  function delayCleanup() {
    stopMusic();
  }

  return {
    delayCleanup,
    handleDelayedExecution,
  };
}
