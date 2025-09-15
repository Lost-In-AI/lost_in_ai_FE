import { BrowserRouter, Route, Routes } from "react-router-dom";
import { navigation } from "./data/navigation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {navigation &&
          navigation.length > 0 &&
          navigation.map((route) => <Route key={route.path} path={route.path} element={route.element} />)}
      </Routes>
    </BrowserRouter>
  );
}
