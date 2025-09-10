import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo posizionato a sinistra */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/vite.svg"
                alt="Lost In AI"
              />
              <span className="ml-2 text-xl font-bold tracking-wide">Lost In AI</span>
              <span className="ml-2 text-sm text-primary-200 hidden sm:block">Your Generative Banking</span>
            </Link>
          </div>

          {/* Menu di navigazione */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-primary-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/chat"
                className="text-primary-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Assistenza
              </Link>
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
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div className="md:hidden" id="mobile-menu" style={{ display: "none" }}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-700">
          <Link
            to="/"
            className="text-primary-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/chat"
            className="text-primary-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Assistenza
          </Link>
        </div>
      </div>
    </nav>
  );
}
