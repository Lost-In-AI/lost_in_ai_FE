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
      chatStatus.setStatus("pending");
      const assistantResponse = await sendMessage(message);
      if (assistantResponse && assistantResponse.current_responses) {
        await processResponse(assistantResponse);
      } else {
        // TODO: errore lato BE, mostrare un popup/qualcosa
        console.error("Error while updating response's value", assistantResponse);
      }
    } catch (error) {
      console.error("Error while posting message: ", error);
    } finally {
      delayCleanup();
      chatStatus.setStatus("idle");
    }
  }

  return { handleUserMessage };
}
