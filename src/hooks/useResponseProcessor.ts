import React from "react";
import { replacePlaceholder, type BackendResponse, type Message } from "../../types/type";
import { useChatStatusStore } from "../store/useChatStatusStore";
import { useSessionStore } from "../store/useSessionStore";
import { parsePrompt } from "../utils/utils";
import { useDelayHandler } from "./useDelayHandler";

export function useResponseProcessor() {
  const chatStatus = useChatStatusStore();
  const { pushMessageToHistory, setShouldAnimateLastMessage } = useSessionStore();
  const { handleDelayedExecution } = useDelayHandler();

  function parseResponse(responses: Array<Message>, index: number) {
    if (!responses[index]) {
      console.error(`No data found in ${responses}[${index}]`);
    }
    return {
      ...responses[index],
      text: parsePrompt(responses[index].text, replacePlaceholder),
    };
  }

  async function processResponse(
    response: BackendResponse,
    abortSignal?: AbortSignal,
    botMessagesCountRef?: React.RefObject<number>,
  ) {
    pushMessageToHistory(parseResponse(response.current_responses, 0)); // pusho la prima risposta
    setShouldAnimateLastMessage(true); // animazione
    if (botMessagesCountRef) {
      botMessagesCountRef.current = 1;
    }
    if (response.current_responses.length > 1) {
      // se ci arrivano più risposte lato BE
      for (let i = 1; i < response.current_responses.length; i++) {
        if (abortSignal?.aborted) {
          // stop se l utente ha annullato
          return;
        }
        chatStatus.setStatus("pending");
        try {
          await handleDelayedExecution(response.break_reason, abortSignal);
          if (abortSignal?.aborted) {
            // stop se l utente ha annullato
            return;
          }
          setShouldAnimateLastMessage(true);
          pushMessageToHistory(parseResponse(response.current_responses, i));
          if (botMessagesCountRef) {
            botMessagesCountRef.current++;
          }
        } catch (error) {
          // Se il delay viene cancellato, annullo il loop
          if (error instanceof Error && error.message === "AbortError") {
            return;
          }
          throw error;
        }
      }
    }
  }

  return { processResponse };
}
