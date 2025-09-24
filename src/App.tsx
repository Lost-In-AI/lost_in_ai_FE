import { BrowserRouter, Route, Routes } from "react-router-dom";
import { navigation } from "./data/navigation";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Routes>
          {navigation &&
            navigation.length > 0 &&
            navigation.map((route) => <Route key={route.path} path={route.path} element={route.element} />)}
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}
