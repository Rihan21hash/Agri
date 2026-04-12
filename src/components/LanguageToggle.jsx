import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";

export default function LanguageToggle({ className }) {
  const { lang, setLang, LANGUAGES } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-xl border border-soil-dark-200 bg-white px-3 py-2 text-sm font-bold text-soil-dark-700 transition-all hover:bg-soil-dark-50 hover:border-soil-dark-300"
      >
        <Globe className="h-4 w-4 text-agri-green-600" />
        <span>{current.shortLabel}</span>
        <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-soil-dark-100 bg-white shadow-card">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
                l.code === lang
                  ? "bg-agri-green-50 text-agri-green-800 font-bold"
                  : "text-soil-dark-700 hover:bg-soil-dark-50"
              )}
            >
              <span className="text-base">{l.shortLabel}</span>
              <span>{l.label}</span>
              {l.code === lang && <span className="ml-auto text-agri-green-600">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
