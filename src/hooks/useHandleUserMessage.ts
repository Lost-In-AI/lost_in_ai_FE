import { BreakReason, Endpoint, replacePlaceholder, type BackendResponse, type Message } from "../../types/type";
import { useChatStatusStore } from "../store/useChatStatusStore";
import { useMusic } from "./useMusic";
import { useSessionStore } from "../store/useSessionStore";
import { parsePrompt, randomDurationMs } from "../utils/utils";

export default function useHandleUserMessage() {
  const chatStatus = useChatStatusStore();

  const { sessionData, updateSession } = useSessionStore(); // aggiungere animate
  const { playMusic, stopMusic } = useMusic();


  function parseResponse(responses: Array<Message>, index: number) {
    if (!responses[index]) {
      console.error(`No data found in ${responses}[${index}]`);
    }
    return {
      ...responses[index],
      text: parsePrompt(responses[index].text, replacePlaceholder),
    };
  }

  async function handleUserMessage(message: Message) {
    try {
      chatStatus.setStatus("pending");
      let updatedHistory = [...(sessionData.history || []), message]; // update user message
      updateSession({
        history: updatedHistory,
      });
      const request = {
        ...sessionData,
        current_message: message.text,
      };
      const res = await fetch(Endpoint.SEND_MESSAGE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (!res.ok) {
        throw new Error("message POST failure");
      }
      const assistantResponse: BackendResponse = await res.json();
      if (assistantResponse && assistantResponse.current_responses) {
        updatedHistory = [...updatedHistory, parseResponse(assistantResponse.current_responses, 0)];
        updateSession({
          history: updatedHistory,
        });
        chatStatus.setStatus("idle");

        if (assistantResponse.current_responses.length > 1) {
          for (let i = 1; i < assistantResponse.current_responses.length; i++) {
            chatStatus.setStatus("pending");
            if (assistantResponse.break_reason === BreakReason.MUSIC) {
              await new Promise((resolve) => {
                playMusic();
                setTimeout(resolve, randomDurationMs());
              });
            } else {
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            updatedHistory = [...updatedHistory, parseResponse(assistantResponse.current_responses, i)];
            updateSession({
              history: updatedHistory,
            });
            chatStatus.setStatus("idle");
          }
        }
      } else {
        // TODO: errore lato BE, mostrare un popup/qualcosa
        console.error("Error while updating response's value", assistantResponse);
      }
    } catch (error) {
      console.error("Error while posting message: ", error);
    } finally {
      stopMusic();
      chatStatus.setStatus("idle");
    }
  }

  return { handleUserMessage };
}
