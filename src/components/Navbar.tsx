import { Link } from "react-router-dom";

export default function Navbar() {
  const navigation = [
    {
      path: "/login",
      label: "Login",
    },
    {
      path: "/register",
      label: "Registrati",
    },
  ];
  return (
    <nav className="bg-primary-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img className="h-8 w-auto" src="/logo.png" alt="Lost In AI" />
          </Link>
          <div className="flex items-center space-x-4">
            {navigation &&
              navigation.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="px-3 py-2 rounded-md text-sm font-medi hover:bg-primary-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
