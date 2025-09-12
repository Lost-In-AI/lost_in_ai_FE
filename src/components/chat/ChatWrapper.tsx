import { useEffect, useRef, useState, type ReactNode } from "react";
import Header from "./Header";
import { useSessionStore } from "../../store/useSessionStore";
import { useChatStatusStore } from "../../store/useChatStatusStore";
import Input from "./Input";
import MessageLoading from "./MessageLoading";

interface ChatWrapperProps {
  children?: ReactNode;
}

export default function ChatWrapper({ children }: ChatWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { sessionData } = useSessionStore();
  const { loading } = useChatStatusStore();

  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [children, sessionData]);

  return (
    <section className="fixed inset-0 flex pointer-events-none flex-col mt-20 sm:mt-0">
      {isVisible && (
        <div
          tabIndex={0}
          className="flex flex-col w-[95%] h-[80vh] sm:max-w-[1199px] sm:absolute sm:right-6 sm:bottom-0 mx-auto  mb-24 backdrop-blur-sm bg-white p-0.5 rounded-lg pointer-events-auto shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-700/50"
        >
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
            <Header onClose={() => setIsVisible(!isVisible)} />
            {children}
            {loading === "pending" && <MessageLoading />}
          </div>
          <Input />
        </div>
      )}
      {/* TODO: mettere il botton vero */}
      <button
        className="bg-primary-700 absolute bottom-4 text-white right-4 md:bottom-4 md:right-5 px-4 w-16 h-16 rounded-lg pointer-events-auto "
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Close" : "Open"}
      </button>
    </section>
  );
}
