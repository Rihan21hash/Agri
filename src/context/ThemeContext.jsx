import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [highContrast, setHighContrast] = useState(() => {
    try { return localStorage.getItem("high-contrast") === "true"; }
    catch { return false; }
  });

  const toggleHighContrast = useCallback(() => {
    setHighContrast((prev) => {
      const next = !prev;
      try { localStorage.setItem("high-contrast", String(next)); } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  const value = useMemo(
    () => ({ highContrast, toggleHighContrast }),
    [highContrast, toggleHighContrast]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}
