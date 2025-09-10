import React, { useState, useRef } from "react";
import { useSessionStore } from "../../store/useSessionStore";
import { Sender } from "../../../types/type";
import { useChatStatusStore } from "../../store/useChatStatusStore";
import { randomDurationSec } from "../../utils/utils";

export default function Input() {
  const [message, setMessage] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { sessionData, updateSession } = useSessionStore();
  const { setStatus } = useChatStatusStore();

  /*
  - usando il timeoutRef solo l ultimo messaggio dell utente riceve risposta (es: se l utente manda 3 messaggi di seguito senza aspettare la risposta del bot)
  - dobbiamo cambiare approccio e fare una coda sequenziale in modo che ogni messaggio riceva una risposta, ma in ordine
  */
  async function handleSubmit(e: React.FormEvent | React.KeyboardEvent) {
    e.preventDefault();
    if (message?.trim()) {
      const trimmedMessage = message.trim();
      setMessage(""); // reset message
      const newMessage = {
        sender: Sender.USER,
        text: trimmedMessage,
        timestamp: new Date().toISOString(),
      };
      const updatedHistory = [...(sessionData.history || []), newMessage];
      updateSession({
        history: updatedHistory,
      });
      setStatus("pending");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        const responseBE = {
          sender: Sender.BOT,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo saepe harum delectus quis quaerat maiores ab ea similique tempore sunt, soluta vel incidunt eveniet, nemo rerum assumenda iure expedita blanditiis.",
          timestamp: new Date().toISOString(),
        };
        setStatus("idle");
        updateSession({
          history: [...updatedHistory, responseBE],
        });
        timeoutRef.current = null; // Reset del ref
      }, randomDurationSec() * 1000); // random tra 5 e 10
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex mr-8 gap-2 mt-auto max-w-7xl pl-4 pb-4 pt-4">
      <input
        type="text"
        value={message ?? ""}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={"Scrivi un messaggio..."}
        className="flex-1 px-3 py-2 bg-primary-100/50 text-primary-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700/50 disabled:bg-gray-100"
      />
      {/* TODO: Mettere il bottone vero qui  */}
      <button
        type="submit"
        disabled={!message?.trim()}
        className=" bg-primary-300 text-white rounded-lg hover:bg-primary-700/40 disabled:bg-gray-300 disabled:cursor-not-allowed w-13 h-13 cursor-pointer"
      ></button>
    </form>
  );
}
