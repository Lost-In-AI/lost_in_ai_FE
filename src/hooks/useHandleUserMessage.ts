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
  const chatStatus = useChatStatusStore();
  const { delayCleanup } = useDelayHandler();
  const { sendMessage } = useApiCall();
  const { processResponse } = useResponseProcessor();
  const { removeLastNMessagesFromHistory } = useSessionStore();
  const abortControllerRef = useRef<AbortController | null>(null);
  const currentResponseCountRef = useRef<number>(0);
  const botMessagesAddedRef = useRef<number>(0);

  async function handleUserMessage(message: Message) {
    try {
      abortControllerRef.current = new AbortController(); // inizializzo controller
      botMessagesAddedRef.current = 0; // inizializzo il numero dei messaggi
      chatStatus.setStatus("pending");
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
      chatStatus.setStatus("idle");
    }
  }

  function cancelRequest() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const botMessagesAdded = botMessagesAddedRef.current;
    if (botMessagesAdded > 1) {
      removeLastNMessagesFromHistory(botMessagesAdded - 1);
    }
    chatStatus.setStatus("idle");
    delayCleanup();
  }

  return { handleUserMessage, cancelRequest };
}
