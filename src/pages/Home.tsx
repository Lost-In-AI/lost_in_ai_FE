import { useEffect, useRef, type ReactNode } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import Message from "../components/Message";
import { formatTimestap } from "../utils/utils";
import { Sender } from "../../types/type";
import Input from "../components/Input";
import Navbar from "../components/Navbar";

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
      history: [...(sessionData.history || []), newMessage],
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

  const history = sessionData.history || [];

  let chatContent: ReactNode;
  if (isLoading) {
    chatContent = <div className="text-center">Caricamento in corso..</div>;
  } else if (history.length > 0) {
    chatContent = (
      <div className="space-y-1">
        {history.map((message) => (
          <Message
            key={message.timestamp || `${message.sender}-${message.text}`}
            text={message.text}
            isUser={message.sender === Sender.USER}
            timestamp={formatTimestap(message.timestamp)}
          />
        ))}
      </div>
    );
  } else {
    chatContent = <p className="text-gray-500">Nessun messaggio</p>;
  }

  return (
    <div className="min-h-screen bg-base-background">
      {/* Navbar */}
      <Navbar />

      {/* Banner principale */}
      <section
        className="relative h-64 flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('/images/money-background.png')]"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
            I tuoi risparmi?
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
            Con noi sono al sicuro! <span className="text-white-300 line-through">(forse)</span>
          </h2>
        </div>
      </section>

      {/* Sezione testo + immagine sulla sinistra */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Titolo e descrizione */}
            <div className="lg:col-span-3 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-600 mb-4">
                L'unica banca che non ti frega
              </h2>

              <div className="space-y-3 text-sm md:text-base text-black leading-relaxed">
                <p>
                  Da oltre 3 anni nel settore bancario, siamo l'istituto di
                  credito che mette sempre al primo posto la trasparenza{" "}
                  <em>(subito dopo i nostri, ovviamente)</em>.
                </p>

                <p>
                  Con le nostre innovative polizze assicurative sui depositi
                  che coprono fino al 73% del capitale sociale <em>(in caso di
                    condizioni meteorologiche favorevoli)</em> e tassi di interesse
                  competitivi dello 0,001% annuo <em>(soggetti a variazioni
                    orarie)</em>, garantiamo la massima trasparenza nelle nostre
                  operazioni.
                </p>

                <p>
                  I nostri consulenti esperti, freschi di diploma triennale in
                  "Finanza Creativa", sono sempre pronti ad ascoltarti negli
                  orari più comodi: dalle 14:23 alle 14:31 del secondo
                  martedì di ogni mese.
                </p>
              </div>
            </div>

            {/* Colonna immagine sulla destra */}
            <div className="lg:col-span-2 flex justify-center">
              <div className="max-w-sm">
                <img
                  src="/images/cartoon-characters.png"
                  alt="Personaggi cartoon che rappresentano la nostra banca"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat container */}
      <section className="max-w-4xl mx-auto p-4 pt-6">
        <div className="flex flex-col border p-2 rounded-md border-gray-300">
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 max-h-[530px]">
            {chatContent}
          </div>
          <Input onSubmit={handleRequest} />
        </div>
      </section>
    </div>
  );
}