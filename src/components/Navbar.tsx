// Componente Navbar responsive 

export default function Navbar() {
  return (
    <nav className="bg-primary-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo posizionato a sinistra */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto"
              src="/logo.png"
              alt="Lost In AI"
            />
          </div>

          {/* Spazio per il menu in futuro se necessario */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Link di navigazione che verranno aggiunti in futuro */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}