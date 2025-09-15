import { replacePlaceholder, type BackendResponse, type Message } from "../../types/type";
import { useChatStatusStore } from "../store/useChatStatusStore";
import { useSessionStore } from "../store/useSessionStore";
import { parsePrompt } from "../utils/utils";
import { useDelayHandler } from "./useDelayHandler";

export function useResponseProcessor() {
  const { sessionData, updateSession } = useSessionStore();
  const chatStatus = useChatStatusStore();
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
    updateSession({ history: [...(sessionData.history || []), parseResponse(response.current_responses, 0)] });

    if (response.current_responses.length > 1) {
      for (let i = 1; i < response.current_responses.length; i++) {
        chatStatus.setStatus("pending");
        await handleDelayedExecution(response.break_reason);
        updateSession({
          history: [
            ...(sessionData.history || []),
            parseResponse(response.current_responses, 0),
            parseResponse(response.current_responses, i),
          ],
        });
      }
    }
  }

  return { processResponse };
}
