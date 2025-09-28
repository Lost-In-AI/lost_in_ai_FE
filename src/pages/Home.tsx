import { Sender } from "../../types/type";
import ChatWrapper from "../components/chat/ChatWrapper";
import Message from "../components/chat/Message";
import { formatTimestap } from "../utils/utils";

import { useChatStatusStore } from "../store/useChatStatusStore";
import { useSessionStore } from "../store/useSessionStore";
import { useErrorStore } from "../store/useErrorStore";
import ErrorPopup from "../components/alerts/errorPopUp";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import MainSection from "../components/MainSection";
import { useApiCall } from "../hooks/useApiCall";
import { useEffect } from "react";

export default function Home() {
  const { getSession } = useApiCall();
  const { sessionData } = useSessionStore();
  const { shouldAnimateLastMessage } = useChatStatusStore();
  const { currentError } = useErrorStore();

  useEffect(() => {
    getSession();
  });

  return (
    <>
      {currentError && <ErrorPopup message={currentError} />}
      <Navbar />
      <Banner />
      <MainSection />
      <ChatWrapper>
        {sessionData &&
          sessionData?.history.length > 0 &&
          sessionData.history.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              personality={message.bot_personality}
              isUser={message.sender === Sender.USER}
              animate={index === sessionData?.history.length - 1 && shouldAnimateLastMessage}
              timestamp={formatTimestap(message.timestamp)}
            />
          ))}
      </ChatWrapper>
    </>
  );
}
