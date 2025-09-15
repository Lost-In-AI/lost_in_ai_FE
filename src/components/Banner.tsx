export default function Banner() {
  return (
    <section className="relative h-64 flex items-center bg-cover bg-center bg-no-repeat bg-[url('/images/money-background.png')]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-0 px-4 max-w-6xl mx-auto w-full">
        <h1 className="text-white mb-2 drop-shadow-lg" style={{
          fontFamily: 'DM Serif Display',
          fontWeight: 400,
          fontSize: '48px',
          lineHeight: '100%',
          letterSpacing: '0%'
        }}>
          I tuoi risparmi?
        </h1>
        <h2 className="text-white mb-2 drop-shadow-lg" style={{
          fontFamily: 'DM Serif Display',
          fontWeight: 400,
          fontSize: '48px',
          lineHeight: '100%',
          letterSpacing: '0%'
        }}>
          Con noi sono al sicuro! <span style={{
            fontFamily: 'DM Serif Display',
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: '48px',
            lineHeight: '100%',
            letterSpacing: '0%',
            textDecoration: 'line-through'
          }}>(forse)</span>
        </h2>
      </div>
    </section>
  );
}