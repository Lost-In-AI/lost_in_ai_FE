import { Endpoint, type BackendResponse, type Message } from "../../types/type";
import { useChatStatusStore } from "../store/useChatStatusStore";
import { useMusic } from "./useMusic";
import bell from "../assets/audio/creepy-halloween-bell-trap-melody-247720.mp3";
import { useSessionStore } from "../store/useSessionStore";
import { randomDurationSec } from "../utils/utils";

export default function useHandleUserMessage() {
  const { play, stop } = useMusic();
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
      const botResponse: BackendResponse = await res.json();
      if (botResponse && botResponse.current_response) {
        let totalDelayMs = 2000; // delay music default
        if (botResponse.music) {
          // Se BE ci manda la musica, aggiungiamo il tempo della musica al delay base
          const musicDuration = randomDurationSec();
          await play(bell, totalDelayMs + totalDelayMs);
          totalDelayMs += musicDuration * 1000;
        }
        await new Promise((resolve) => setTimeout(resolve, totalDelayMs));

        updateSession({
          history: [...updatedHistory, botResponse.current_response],
        });
      } else {
        // TODO: errore lato BE, mostrare un popup/qualcosa
        console.error("Error while updating response's value", botResponse);
      }
    } catch (error) {
      console.error("Error while posting message: ", error);
    } finally {
      stop();
      chatStatus.setStatus("idle");
    }
  }

  return { handleUserMessage };
}
