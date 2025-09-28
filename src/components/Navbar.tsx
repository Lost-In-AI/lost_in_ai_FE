// import { SignOutButton, useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
// import { navigation } from "../data/navigation";

export default function Navbar() {
  // const { isLoaded, isSignedIn } = useAuth();
  return (
    <nav className="bg-primary-700 text-white shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={"/"} className="flex-shrink-0 flex items-center">
            <img className="h-8 w-auto" src="/logo.png" alt="Lost In AI" />
          </Link>
          {/* {isLoaded && (
            <div className="flex items-center space-x-4">
              {!isSignedIn ? (
                navigation.map((item) =>
                  item.path !== "/" ? (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="px-3 py-2 rounded-md text-sm hover:bg-primary-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ) : null,
                )
              ) : (
                <SignOutButton>
                  <button className="px-3 py-2 rounded-md text-sm hover:bg-primary-600 transition-colors cursor-pointer">
                    Sign out
                  </button>
                </SignOutButton>
              )}
            </div>
          )} */}
        </div>
      </div>
    </nav>
  );
}
