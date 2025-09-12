import React, { useState } from "react";
import { Sender } from "../../../types/type";
import useHandleUserMessage from "../../hooks/useHandleUserMessage";

export default function Input() {
  const [message, setMessage] = useState<string | null>(null);
  const { handleUserMessage } = useHandleUserMessage();
  async function handleSubmit(e: React.FormEvent | React.KeyboardEvent) {
    e.preventDefault();
    if (message?.trim()) {
      const trimmedMessage = message.trim();
      setMessage("");
      const newMessage = {
        sender: Sender.USER,
        text: trimmedMessage,
        timestamp: new Date().toISOString(),
      };
      await handleUserMessage(newMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex sm:mr-8 gap-2 mt-auto w-full  sm:max-w-7xl p-4 ">
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
