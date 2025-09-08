import useSessionStorage from "../hooks/useSessionStorage";
import Message from "../components/Message";
import { formatTimestap } from "../utils/utils";
import { Sender } from "../../types/type";
import Input from "../components/Input";
import { useEffect, useRef, type ReactNode } from "react";
import MusicTester from "../components/example/MusicTester";

export default function Home() {
  const { sessionData, isLoading, updateSession } = useSessionStorage();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  function handleRequest(text: string) {
    const newMessage = {
      sender: Sender.USER,
      text,
      timestamp: new Date().toISOString(),
    };
    const existingHistory = sessionData.history ?? [];
    updateSession({
      history: [...existingHistory, newMessage],
    });
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [sessionData.history]);

  const history = sessionData?.history ?? [];
  let content: ReactNode;
  if (isLoading) {
    content = <div className="text-center">Caricamento in corso..</div>;
  } else if (history.length > 0) {
    content = (
      <div className="space-y-1">
        {history.map((message) => (
          <Message
            key={`${message.timestamp}-${message.sender}`}
            text={message.text}
            isUser={message.sender === Sender.USER}
            timestamp={formatTimestap(message.timestamp)}
          />
        ))}
      </div>
    );
  } else {
    content = <p className="text-gray-500">Nessun messaggio</p>;
  }

  const showTester = import.meta.env.DEV;

  return (
    <section className="flex flex-col border p-2 rounded-md border-gray-300">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 max-h-[530px]">
        {content}
      </div>
      {showTester && <MusicTester />}
      <Input onSubmit={handleRequest} />
    </section>
  );
}