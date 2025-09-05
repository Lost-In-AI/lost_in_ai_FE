import useSessionStorage from "../hooks/useSessionStorage";
import Message from "../components/Message";
import { formatTimestap } from "../utils/utils";
import { Sender } from "../../types/type";
import Input from "../components/Input";
import { useEffect, useRef } from "react";

export default function Home() {
  const { sessionData, isLoading, updateSession } = useSessionStorage();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  function handleRequest(text: string) {
    const newMessage = {
      sender: Sender.USER,
      text,
      timestamp: new Date().toISOString(),
    };
    updateSession({
      history: [...sessionData.history, newMessage],
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

  return (
    <section className="flex flex-col border p-2 rounded-md border-gray-300">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 max-h-[530px]">
        {isLoading ? (
          <div className="text-center">Caricamento in corso..</div>
        ) : sessionData && sessionData?.history.length > 0 ? (
          <div className="space-y-1">
            {sessionData.history.map((message, index) => (
              <Message
                key={index}
                text={message.text}
                isUser={message.sender === Sender.USER}
                timestamp={formatTimestap(message.timestamp)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nessun messaggio</p>
        )}
      </div>
      <Input onSubmit={handleRequest} />
    </section>
  );
}
