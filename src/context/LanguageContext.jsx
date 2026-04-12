import { createContext, useContext, useState, useCallback, useMemo } from "react";
import translations, { LANGUAGES } from "../data/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("app-lang") || "en"; }
    catch { return "en"; }
  });

  const changeLang = useCallback((code) => {
    setLang(code);
    try { localStorage.setItem("app-lang", code); } catch {}
  }, []);

  /** Translate key. Falls back to English, then to the key itself. */
  const t = useCallback(
    (key) => translations[lang]?.[key] || translations.en?.[key] || key,
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang: changeLang, t, LANGUAGES }), [lang, changeLang, t]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider");
  return ctx;
}
