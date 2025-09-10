export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Parte superiore */}
      <section className="relative overflow-hidden h-[420px] md:h-[520px] lg:h-[560px]">
        <div className="absolute inset-0">
          <img
            src="/images/money-background.png"
            alt="Background banconote"
            className="w-full h-full object-cover object-[50%_40%]"
          />
        </div>
        {/* Overlay orizzontale */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-transparent"></div>

        {/* Testo in alto a sinistra */}
        <div className="absolute inset-0 flex items-end">
          <div className="px-6 md:px-12 lg:px-16 pb-8 md:pb-12 text-white">
            <p className="text-3xl md:text-5xl font-semibold leading-tight">I tuoi risparmi?</p>
            <p className="text-3xl md:text-5xl font-semibold leading-tight">
              Con noi sono al sicuro! <span className="italic">(forse)</span>
            </p>
          </div>
        </div>
      </section>

      {/* Contenuto */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Colonna sinistra */}
            <div className="space-y-5">
              <h2 className="text-2xl md:text-3xl font-semibold italic text-[#2E5A3E]">
                L’unica banca che non ti frega
              </h2>

              <div className="space-y-4 text-[#1f2937] text-[15px] leading-relaxed">
                <p>
                  Da oltre 3 anni nel settore bancario, siamo l’istituto di credito che mette sempre al primo posto i
                  tuoi interessi <span className="text-gray-500 italic">(subito dopo i nostri, ovviamente)</span>.
                </p>
                <p>
                  Con le nostre innovative polizze assicurative sui depositi che coprono fino al 73% del capitale
                  versato{" "}
                  <span className="text-gray-500 italic">(in caso di condizioni meteorologiche favorevoli)</span> e
                  tassi di interesse competitivi dello 0,001% annuo{" "}
                  <span className="text-gray-500 italic">(soggetti a variazioni orarie)</span>, garantiamo la massima
                  trasparenza nelle nostre operazioni.
                </p>
                <p className="text-[#111827]">
                  I nostri consulenti esperti, freschi di diploma triennale in “Finanza Creativa”, sono sempre pronti ad
                  ascoltarti negli orari più comodi: dalle 14:23 alle 14:31 del secondo martedì di ogni mese.
                </p>
              </div>
            </div>

            {/* Colonna destra: immagine */}
            <div className="relative">
              <div className="bg-[#F6FBF8] rounded-xl p-5 shadow-lg">
                <div className="flex items-center justify-center">
                  <img
                    src="/images/cartoon-characters.png"
                    alt="cartoon characters"
                    className="max-w-full h-auto rounded-md"
                  />
                </div>
              </div>
              <div className="absolute -top-3 -right-3 bg-[#B57A1F] rounded-full p-3 shadow-lg">
                <div className="text-white text-xl">✨</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
