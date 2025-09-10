import { useState } from "react";
import { Endpoint, type Message } from "../../types/type";
import { useChatStatusStore } from "../store/useChatStatusStore";
import { useMusic } from "./useMusic";
import bell from "../assets/audio/creepy-halloween-bell-trap-melody-247720.mp3";
import { useSessionStore } from "../store/useSessionStore";

interface HandleUserMessageProps {
  message: Message;
}

/**
 * Custom hook handling the user's sending process
 */
export default function useHandleUserMessage() {
  const musicController = useMusic();
  const chatStatus = useChatStatusStore();
  const { sessionData, updateSession } = useSessionStore();
  const [response, setResponse] = useState<Message>();

  const handleUserMessage = async ({ message }: HandleUserMessageProps) => {
    try {
      // Set request's state as pending
      await musicController.play(bell, 10);
      chatStatus.setStatus("pending");

      // Add the user's message to the chat history
      const updatedHistory = [...(sessionData.history || []), message];
      updateSession({
        history: updatedHistory,
      });

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
      setResponse(botResponse);

      // If the fetch succeeds, add the bot's response to the chat history
      updateSession({
        history: [...updatedHistory, botResponse],
      });
    } catch (error) {
      console.error("Error while posting message: ", error);
    } finally {
      // In any case, set the client as idle
      musicController.stop();
      chatStatus.setStatus("idle");
    }
  };

  return { handleUserMessage, response };
}
