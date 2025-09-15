import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import type { NavigationType } from "../types/type";

export default function App() {
  const navigation: NavigationType[] = [
    {
      path: "/",
      element: <Home />,
    },
    // aggiungi qui altre pagine, se serviranno
  ];

  return (
    <BrowserRouter>
      {/* Layout principale */}
      <div className="min-h-screen bg-white">
        {/* Main content area */}
        <main className="relative">
          <Routes>
            <Route>
              {navigation &&
                navigation.length > 0 &&
                navigation.map((route) => <Route key={route.path} path={route.path} element={route.element} />)}
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}