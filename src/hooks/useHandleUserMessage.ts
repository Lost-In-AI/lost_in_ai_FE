import { type Message } from "../../types/type";
import { useChatStatusStore } from "../store/useChatStatusStore";
import { useApiCall } from "./useApiCall";
import { useDelayHandler } from "./useDelayHandler";
import { useResponseProcessor } from "./useResponseProcessor";

export default function useHandleUserMessage() {
  const chatStatus = useChatStatusStore();
  const { delayCleanup } = useDelayHandler();
  const { sendMessage } = useApiCall();
  const { processResponse } = useResponseProcessor();

  async function handleUserMessage(message: Message) {
    try {
      // Crea un nuovo AbortController per questa richiesta
      const abortController = new AbortController();
      chatStatus.setStatus("pending");
      const assistantResponse = await sendMessage(message);
      if (assistantResponse && assistantResponse.current_responses) {
        await processResponse(assistantResponse);
        chatStatus.setAbortController(abortController);
      } else {
        // TODO: errore lato BE, mostrare un popup/qualcosa
        console.error("Error while updating response's value", assistantResponse);
      }
    } catch (error) {
      // Gestisce sia errori di rete che cancellazioni
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request was cancelled");
      } else {
        console.error("Error while posting message: ", error);
      }
    } finally {
      delayCleanup();
      chatStatus.setStatus("idle");
      chatStatus.setAbortController(null);
    }
  }

  return { handleUserMessage };
}
