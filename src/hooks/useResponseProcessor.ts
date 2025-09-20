import { replacePlaceholder, type BackendResponse, type Message } from "../../types/type";
import { useChatStatusStore } from "../store/useChatStatusStore";
import { useSessionStore } from "../store/useSessionStore";
import { parsePrompt } from "../utils/utils";
import { useDelayHandler } from "./useDelayHandler";

export function useResponseProcessor() {
  const { setShouldAnimateLastMessage, waitAnimation } = useChatStatusStore();
  const { pushMessageToHistory } = useSessionStore();
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

  async function processResponse(response: BackendResponse) {
    setShouldAnimateLastMessage(true);
    pushMessageToHistory(parseResponse(response.current_responses, 0));
    await waitAnimation();
    if (response.current_responses.length > 1) {
      for (let i = 1; i < response.current_responses.length; i++) {
        await handleDelayedExecution(response.break_reason);
        setShouldAnimateLastMessage(true);
        pushMessageToHistory(parseResponse(response.current_responses, i));
      }
    }
  }

  return { processResponse };
}
