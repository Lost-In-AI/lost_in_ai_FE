import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import type { NavigationType } from "../types/type";
import AuthContainer from "./pages/AuthContainer";

export default function App() {
  const navigation: NavigationType[] = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <AuthContainer isLogin />,
    },
    {
      path: "/register",
      element: <AuthContainer isLogin={false} />,
    },
    // aggiungi qui altre pagine, se serviranno
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          {navigation &&
            navigation.length > 0 &&
            navigation.map((route) => <Route key={route.path} path={route.path} element={route.element} />)}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
