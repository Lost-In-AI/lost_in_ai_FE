import { Endpoint, type BackendResponse, type Message } from "../../types/type";
import { useChatStatusStore } from "../store/useChatStatusStore";
import { useMusic } from "./useMusic";
import { useSessionStore } from "../store/useSessionStore";

export default function useHandleUserMessage() {
  const { stopMusic } = useMusic();
  const chatStatus = useChatStatusStore();
  const { sessionData, updateSession } = useSessionStore();

  async function handleUserMessage(message: Message) {
    try {
      chatStatus.setStatus("pending");
      const updatedHistory = [...(sessionData.history || []), message]; // update user message
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
      if (assistantResponse) {
        // && assistantResponse.current_responses && assistantResponse.current_responses.length > 0
        console.log("assistantResponse", assistantResponse);
        // if (!assistantResponse.music) {
        // await playMusic();
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // }

        // const parsedResponse = {
        //   ...assistantResponse.current_responses[0], // Prendi il primo messaggio dalla lista
        //   text: parsePrompt(assistantResponse.current_responses[0].text, replacePlaceholder),
        // };

        // updateSession({
        //   history: [...updatedHistory, parsedResponse],
        // });
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
