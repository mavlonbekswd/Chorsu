"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ThemeChoice = "system" | "light" | "dark";

type Ctx = { theme: ThemeChoice; setTheme: (t: ThemeChoice) => void; dark: boolean };
const ThemeContext = createContext<Ctx | null>(null);

const KEY = "chorsu-theme";

export function DashboardThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeChoice>("system");
  const [dark, setDark] = useState(false);

  // restore saved choice
  useEffect(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem(KEY)) as ThemeChoice | null;
    if (saved === "light" || saved === "dark" || saved === "system") setThemeState(saved);
  }, []);

  // resolve to a concrete light/dark, following the system when "system"
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const resolve = () => setDark(theme === "dark" || (theme === "system" && mql.matches));
    resolve();
    if (theme === "system") {
      mql.addEventListener("change", resolve);
      return () => mql.removeEventListener("change", resolve);
    }
  }, [theme]);

  const setTheme = (t: ThemeChoice) => {
    setThemeState(t);
    try {
      localStorage.setItem(KEY, t);
    } catch {
      /* ignore */
    }
  };

  return <ThemeContext.Provider value={{ theme, setTheme, dark }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within DashboardThemeProvider");
  return ctx;
}
