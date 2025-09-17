import React, { useState } from "react";
import { Sender } from "../../../types/type";
import useHandleUserMessage from "../../hooks/useHandleUserMessage";
import Button from "../button/Button";
import { useChatStatusStore } from "../../store/useChatStatusStore";

const MAX_CHARACTERS = 1000;

export default function Input() {
  const [message, setMessage] = useState<string | null>(null);
  const { handleUserMessage } = useHandleUserMessage();
  const { loading, cancelRequest } = useChatStatusStore();

  const isPending = loading === "pending";
  const remainingChars = MAX_CHARACTERS - (message?.length || 0);

  async function handleSubmit(e: React.FormEvent | React.KeyboardEvent) {
    e.preventDefault();
    if (message?.trim() && !isPending && message.length <= MAX_CHARACTERS) {
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

  function handleStop() {
    cancelRequest();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value.length <= MAX_CHARACTERS) {
      setMessage(value);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex sm:mr-8 gap-2 mt-auto w-full sm:max-w-7xl p-4">
      <div className="flex-1 relative">
        <input
          type="text"
          value={message ?? ""}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={isPending ? "Attendere..." : "Scrivi un messaggio..."}
          disabled={isPending}
          className={`w-full px-3 py-2 bg-primary-100/50 text-primary-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700/50 disabled:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity`}
          maxLength={MAX_CHARACTERS}
        />
        <div className={`text-xs text-right mt-1 ${remainingChars < 50 ? "text-red-500" : "text-gray-500"}`}>
          {remainingChars}/{MAX_CHARACTERS}
        </div>
      </div>

      {isPending ? (
        <Button
          onClick={handleStop}
          variant="stop"
          className="bg-red-500 text-white rounded-lg hover:bg-red-600 w-13 h-13 cursor-pointer"
          tabIndex={0}
        />
      ) : (
        <Button
          disabled={!message?.trim() || message.length > MAX_CHARACTERS}
          variant="secondary"
          className="bg-primary-300 text-white rounded-lg hover:bg-primary-700/40 disabled:bg-gray-300 disabled:cursor-not-allowed w-13 h-13 cursor-pointer"
          tabIndex={0}
        />
      )}
    </form>
  );
}
