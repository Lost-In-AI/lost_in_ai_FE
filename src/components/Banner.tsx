export default function Banner() {
  return (
    <section className="relative h-64 flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('/images/money-background.png')]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-0 text-center px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
          I tuoi risparmi?
        </h1>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
          Con noi sono al sicuro! <span className="text-white-300 line-through">(forse)</span>
        </h2>
      </div>
    </section>
  );
}
