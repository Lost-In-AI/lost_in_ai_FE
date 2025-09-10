// Componente Navbar responsive 

export default function Navbar() {
  return (
    <nav className="bg-primary-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo posizionato a sinistra */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto"
              src="/vite.svg" // TODO: Sostituire con logo ufficiale Lost In AI
              alt="Lost In AI"
            />
            <span className="ml-2 text-xl font-bold tracking-wide">
              Lost In AI
            </span>
            <span className="ml-2 text-sm text-primary-200 hidden sm:block">
              Your Generative Banking
            </span>
          </div>

          {/* Spazio per il menu in futuro */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Link di navigazione che verranno aggiunti in futuro */}
            </div>
          </div>

          {/* Menu hamburger per mobile */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-primary-700 inline-flex items-center justify-center p-2 rounded-md text-primary-200 hover:text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
              aria-label="Apri menu principale"
            >
              {/* Icona hamburger SVG ottimizzata */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile per default */}
      <div className="md:hidden" id="mobile-menu" style={{ display: 'none' }}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-700">
          {/* Link mobile che verranno aggiunti in futuro */}
        </div>
      </div>
    </nav>
  );
}