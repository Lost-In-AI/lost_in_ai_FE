import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import type { NavigationType } from "../types/type";

export default function App() {
  const navigation: NavigationType[] = [
    {
      path: "/",
      element: <Landing />, // Landing page come homepage
    },
    {
      path: "/chat",
      element: <Home />,
    },
    // aggiungi qui altre pagine, se serviranno
  ];

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
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
