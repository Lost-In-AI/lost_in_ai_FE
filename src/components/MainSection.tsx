export default function MainSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Titolo e descrizione */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-600 mb-4">L'unica banca che non ti frega</h2>

            <div className="space-y-3 text-sm md:text-base text-black leading-relaxed">
              <p>
                Da oltre 3 anni nel settore bancario, siamo l'istituto di credito che mette sempre al primo posto la
                trasparenza <em>(subito dopo i nostri, ovviamente)</em>.
              </p>

              <p>
                Con le nostre innovative polizze assicurative sui depositi che coprono fino al 73% del capitale sociale{" "}
                <em>(in caso di condizioni meteorologiche favorevoli)</em> e tassi di interesse competitivi dello 0,001%
                annuo <em>(soggetti a variazioni orarie)</em>, garantiamo la massima trasparenza nelle nostre
                operazioni.
              </p>

              <p>
                I nostri consulenti esperti, freschi di diploma triennale in "Finanza Creativa", sono sempre pronti ad
                ascoltarti negli orari più comodi: dalle 14:23 alle 14:31 del secondo martedì di ogni mese.
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
  );
}
