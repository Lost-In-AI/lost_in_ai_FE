import { Sender } from "../../types/type";
import ChatWrapper from "../components/chat/ChatWrapper";
import Message from "../components/chat/Message";
import { formatTimestap } from "../utils/utils";
import { useEffect } from "react";
import { useSessionStore } from "../store/useSessionStore";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import MainSection from "../components/MainSection";


export default function Home() {
  const { sessionData, isLoading, loadMockData } = useSessionStore();

  useEffect(() => {
    loadMockData();
  }, [loadMockData]);

  return (
    <>
      <Navbar />
      <Banner />
      <MainSection />
      <ChatWrapper>
        {!isLoading &&
          sessionData &&
          sessionData?.history.length > 0 &&
          sessionData.history.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              isUser={message.sender === Sender.USER}
              timestamp={formatTimestap(message.timestamp)}
            />
          ))}
      </ChatWrapper>
    </>
  );
}