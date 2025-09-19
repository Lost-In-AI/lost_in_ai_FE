export default function Banner() {
  return (
    <section className="relative h-[45vh] flex items-end bg-cover bg-center bg-no-repeat bg-[url('/images/money-background.png')] px-4 sm:px-6 lg:px-8">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-50% via-black/60 to-black/80"></div>
      <div className="relative max-w-6xl mx-auto w-full mb-8 text-white font-serif text-4xl md:text-5xl md:leading-tight">
        <h1>I tuoi risparmi?</h1>
        <h2>
          Con noi sono al sicuro! <span className="italic line-through">(forse)</span>
        </h2>
      </div>
    </section>
  );
}