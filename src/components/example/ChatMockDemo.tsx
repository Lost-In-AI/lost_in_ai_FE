import { useEffect, useRef, useState } from "react";
import Button from "../button/Button";
import { getRandomConversation, getRandomResponse } from "../../data/data";
import type { ChatMessage } from "../../data/data";

type UiMessage = ChatMessage & { id: string };

export default function ChatMockDemo() {
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const c = containerRef.current;
    if (c) c.scrollTop = c.scrollHeight;
  }, [messages, typing]);

  const toUi = (m: ChatMessage): UiMessage => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `m-${Date.now()}-${Math.random()}`;
    return { ...m, id };
  };

  const push = (m: ChatMessage | ChatMessage[]) => {
    setMessages((prev) =>
      prev.concat(Array.isArray(m) ? m.map(toUi) : [toUi(m)])
    );
  };

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const add = async (
    stage:
      | "greetings"
      | "confused"
      | "useless"
      | "operators"
      | "errors"
      | "stalling"
      | "offline"
      | "rate_limit"
      | "long"
  ) => {
    if (stage === "stalling") {
      setTyping(true);
      await sleep(900);
      const text = await getRandomResponse("stalling");
      push({ from: "bot", text });
      setTyping(false);
      return;
    }
    const text = await getRandomResponse(stage);
    push({ from: "bot", text });
  };

  const addLong = async () => {
    setTyping(true);
    await sleep(600);
    const text = await getRandomResponse("long", { preferLong: true });
    push({ from: "bot", text });
    setTyping(false);
  };

  const addConversation = async () => {
    const conv = await getRandomConversation();
    if (conv?.length) push(conv);
  };

  const clear = () => setMessages([]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800">Chat mock demo</h2>

      <div
        ref={containerRef}
        className="mt-3 h-64 overflow-y-auto border rounded p-3 bg-white/70"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-2 flex ${m.from === "bot" ? "justify-start" : "justify-end"
              }`}
          >
            <div
              className={`px-3 py-2 rounded max-w-[75%] whitespace-pre-wrap ${m.from === "bot"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-gray-200 text-gray-800"
                }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="mb-2 flex justify-start">
            <div className="px-3 py-2 rounded max-w-[75%] bg-blue-50 text-blue-800 italic">
              Il bot sta scrivendo…
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button text="Greeting" handleClick={() => add("greetings")} className="bg-blue-600" />
        <Button text="Confused" handleClick={() => add("confused")} className="bg-amber-600" />
        <Button text="Useless" handleClick={() => add("useless")} className="bg-gray-600" />
        <Button text="Operator" handleClick={() => add("operators")} className="bg-indigo-600" />
        <Button text="Error Offline" handleClick={() => add("offline")} className="bg-red-600" />
        <Button text="Rate limit" handleClick={() => add("rate_limit")} className="bg-pink-600" />
        <Button text="Stalling" handleClick={() => add("stalling")} className="bg-purple-600" />
        <Button text="Long msg" handleClick={addLong} className="bg-teal-600" />
        <Button text="Multi-turn" handleClick={addConversation} className="bg-green-600" />
        <Button text="Clear" handleClick={clear} className="bg-slate-600" />
      </div>
    </div>
  );
}