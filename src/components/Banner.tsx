export default function Banner() {
  return (
    <section className="relative h-[45vh] flex items-center bg-cover bg-center bg-no-repeat bg-[url('/images/money-background.png')] px-4 sm:px-6 lg:px-8">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-0 max-w-6xl mx-auto w-full">
        <h1 className="text-white mb-2 drop-shadow-lg font-[var(--font-family-serif)] text-3xl xl:text-5xl leading-none">
          I tuoi risparmi?
        </h1>
        <h2 className="text-white mb-2 drop-shadow-lg font-[var(--font-family-serif)] text-3xl xl:text-5xl leading-none">
          Con noi sono al sicuro! <span className="italic line-through">(forse)</span>
        </h2>
      </div>
    </section>
  );
}