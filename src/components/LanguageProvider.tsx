"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getContent, type Lang, type Content } from "@/lib/i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Content };

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "chorsu-lang";
const SUPPORTED: Lang[] = ["en", "ru", "uz"];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore saved choice, else fall back to the browser's language.
  useEffect(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem(STORAGE_KEY)) as Lang | null;
    if (saved && SUPPORTED.includes(saved)) {
      setLangState(saved);
      return;
    }
    const nav = (typeof navigator !== "undefined" && navigator.language.slice(0, 2).toLowerCase()) || "en";
    if (SUPPORTED.includes(nav as Lang)) setLangState(nav as Lang);
  }, []);

  // Keep <html lang> in sync for a11y / SEO.
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo<Ctx>(() => ({ lang, setLang, t: getContent(lang) }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
