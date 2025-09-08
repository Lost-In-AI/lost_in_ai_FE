import { useState } from "react";
// si tratta di un custom Hook, (ha sempre use davanti al nome)
// Questo è solo un esempio (il tema di solito è uno state globale, non locale)
export default function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  function toggleTheme() {
    setIsDarkMode(!isDarkMode);
  }

  return { toggleTheme, isDarkMode };
}
