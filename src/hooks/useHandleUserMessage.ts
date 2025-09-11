import { Endpoint, type Message } from "../../types/type";
import { useChatStatusStore } from "../store/useChatStatusStore";
import { useMusic } from "./useMusic";
import bell from "../assets/audio/creepy-halloween-bell-trap-melody-247720.mp3";
import { useSessionStore } from "../store/useSessionStore";
import { randomDurationSec } from "../utils/utils";

/**
 * Custom hook handling the user's sending process
 */
export default function useHandleUserMessage() {
  const { play, stop } = useMusic();
  const chatStatus = useChatStatusStore();
  const { sessionData, updateSession } = useSessionStore();

  async function handleUserMessage(message: Message) {
    try {
      // Set request's state as pending
      await play(bell, randomDurationSec());
      chatStatus.setStatus("pending");

      // Add the user's message to the chat history
      const updatedHistory = [...(sessionData.history || []), message];
      updateSession({
        history: updatedHistory,
      });

      // Timer to make the user wait more then necessary
      await new Promise((resolve) => setTimeout(resolve, randomDurationSec() * 1000));

      // Handle fetching
      const response = await fetch(Endpoint.SEND_MESSAGE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      // 404 error handling
      if (!response.ok) {
        throw new Error("message POST failure");
      }

      const botResponse: Message = await response.json();

      // If the fetch succeeds, add the bot's response to the chat history
      if (botResponse) {
        updateSession({
          history: [...updatedHistory, botResponse],
        });
      } else {
        console.error("Error while updating response's value", botResponse);
      }
    } catch (error) {
      console.error("Error while posting message: ", error);
    } finally {
      // In any case, set the client as idle
      stop();
      chatStatus.setStatus("idle");
    }
  }

  return { handleUserMessage };
}
