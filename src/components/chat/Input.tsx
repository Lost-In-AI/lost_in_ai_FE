import React, { useState } from "react";
import { Sender } from "../../../types/type";
import useHandleUserMessage from "../../hooks/useHandleUserMessage";
import { useChatStatusStore } from "../../store/useChatStatusStore";
import Button from "../button/Button";

const MAX_MESSAGE_LENGTH = 500;

export default function Input() {
  const [message, setMessage] = useState<string>("");
  const { handleUserMessage, cancelRequest } = useHandleUserMessage();
  const { loading } = useChatStatusStore();

  const isPending = loading === "pending";
  const isMessageValid = message.trim() && message.length <= MAX_MESSAGE_LENGTH;

  async function handleSubmit(e: React.FormEvent | React.KeyboardEvent) {
    e.preventDefault();
    if (loading === "pending") {
      cancelRequest();
      return;
    }
    if (isMessageValid && !isPending) {
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
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setMessage(value);
    }
  }

  return (
    <div className="flex sm:mr-8 gap-2 mt-auto w-full sm:max-w-7xl p-4">
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder={isPending ? "Sto elaborando..." : "Scrivi un messaggio..."}
          disabled={isPending}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSubmit(e);
            }
          }}
          className={`size-full px-3 py-2 pr-16 bg-primary-100/50 text-primary-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700/50 transition-opacity ${
            isPending ? "opacity-50 cursor-not-allowed bg-gray-100" : ""
          }`}
        />
        <div className="absolute right-3 bottom-2 text-xs text-gray-500">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </div>
      </div>

      {isPending ? (
        <Button
          onClick={handleStop}
          variant="stop"
          className="text-white rounded-full hover:brightness-90 transition-colors w-13 h-13 cursor-pointer"
          tabIndex={0}
        />
      ) : (
        <form onSubmit={handleSubmit} className="contents">
          <Button
            disabled={!isMessageValid}
            variant="secondary"
            className="bg-primary-300 text-white rounded-lg hover:bg-primary-700/40 disabled:bg-gray-300 disabled:cursor-not-allowed w-13 h-13 cursor-pointer transition-colors"
            tabIndex={0}
          />
        </form>
      )}
    </div>
  );
}
