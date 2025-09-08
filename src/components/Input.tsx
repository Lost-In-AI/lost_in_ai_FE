import React, { useState } from "react";

interface InputProps {
  onSubmit: (message: string) => void;
}

export default function Input({ onSubmit }: InputProps) {
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent | React.KeyboardEvent) {
    e.preventDefault();
    if (message?.trim()) {
      onSubmit(message.trim());
      setMessage("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-gray-300">
      <input
        type="text"
        value={message ?? ""}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={"Scrivi un messaggio..."}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />
      <button
        type="submit"
        disabled={!message?.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Invia
      </button>
    </form>
  );
}
