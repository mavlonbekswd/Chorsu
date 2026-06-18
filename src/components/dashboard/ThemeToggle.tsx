"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { useTheme, type ThemeChoice } from "./ThemeProvider";
import { SunIcon, MoonIcon, MonitorIcon } from "./icons";

export default function ThemeToggle() {
  const { theme, setTheme, dark } = useTheme();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const options: { key: ThemeChoice; label: string; icon: React.ReactNode }[] = [
    { key: "system", label: t.dash.theme.system, icon: <MonitorIcon className="h-4 w-4" /> },
    { key: "light", label: t.dash.theme.light, icon: <SunIcon className="h-4 w-4" /> },
    { key: "dark", label: t.dash.theme.dark, icon: <MoonIcon className="h-4 w-4" /> },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.dash.theme.label}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-d-border text-d-muted transition-colors hover:bg-d-hover hover:text-d-ink"
      >
        {theme === "system" ? <MonitorIcon className="h-[18px] w-[18px]" /> : dark ? <MoonIcon className="h-[18px] w-[18px]" /> : <SunIcon className="h-[18px] w-[18px]" />}
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-d-border bg-d-elev py-1 shadow-soft-md"
        >
          {options.map((o) => (
            <li key={o.key} role="option" aria-selected={theme === o.key}>
              <button
                onClick={() => {
                  setTheme(o.key);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors hover:bg-d-hover ${
                  theme === o.key ? "font-semibold text-d-accent" : "text-d-muted"
                }`}
              >
                {o.icon}
                <span>{o.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
