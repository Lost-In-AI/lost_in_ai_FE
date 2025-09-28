import { useRef } from "react";
import { type Message } from "../../types/type";
import { useChatStatusStore } from "../store/useChatStatusStore";
import { useSessionStore } from "../store/useSessionStore";
import { useApiCall } from "./useApiCall";
import { useDelayHandler } from "./useDelayHandler";
import { useResponseProcessor } from "./useResponseProcessor";
import { useErrorStore, AppError } from "../store/useErrorStore";

const addError = useErrorStore.getState().addError;

export default function useHandleUserMessage() {
  const { setStatus, setShouldAnimateLastMessage } = useChatStatusStore();
  const { delayCleanup } = useDelayHandler();
  const { sendMessage, patchSession } = useApiCall();
  const { processResponse } = useResponseProcessor();
  const { removeLastNMessagesFromHistory, sessionData } = useSessionStore();
  const abortControllerRef = useRef<AbortController | null>(null);
  const currentResponseCountRef = useRef<number>(0);
  const botMessagesAddedRef = useRef<number>(0);

  async function patchSessionAsync(history: Message[]) {
    try {
      if (sessionData.session_id && history) {
        console.log("patch");
        const res = await patchSession(sessionData.session_id, history);
        console.log("res patch", res);
      }
    } catch (error) {
      console.error("Error patching session in background:", error);
    }
  }

  async function handleUserMessage(message: Message) {
    try {
      abortControllerRef.current = new AbortController(); // inizializzo controller
      botMessagesAddedRef.current = 0; // inizializzo il numero dei messaggi
      setStatus("pending");
      const assistantResponse = await sendMessage(message, abortControllerRef.current.signal);
      if (assistantResponse && assistantResponse.current_responses) {
        currentResponseCountRef.current = assistantResponse.current_responses.length;
        await processResponse(assistantResponse, abortControllerRef.current?.signal, botMessagesAddedRef);
      } else {
        addError(AppError.BOT_RESPONSE_ERROR);
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request was cancelled");
      } else {
        addError(AppError.WHILE_POSTING_ERROR);
      }
    } finally {
      abortControllerRef.current = null;
      currentResponseCountRef.current = 0;
      botMessagesAddedRef.current = 0;
      delayCleanup();
      setStatus("idle");
    }
  }

  async function cancelRequest() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    delayCleanup();
    setShouldAnimateLastMessage(false);
    setStatus("idle");

    const botMessagesAdded = botMessagesAddedRef.current;
    console.log("botMessagesAdded", botMessagesAdded);
    if (botMessagesAdded >= 1) {
      // Creo la history finale prima di modificare lo stato
      const updatedHistory = sessionData.history.slice(0, -(botMessagesAdded - 1));

      removeLastNMessagesFromHistory(botMessagesAdded - 1);
      await patchSessionAsync(updatedHistory);
    }
  }

  return { handleUserMessage, cancelRequest };
}
