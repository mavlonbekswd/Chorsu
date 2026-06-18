"use client";

import { useEffect, useRef, useState } from "react";
import { LANGS } from "@/lib/i18n";
import { useLang } from "./LanguageProvider";

export default function LanguageSwitcher({
  className = "",
  variant = "warm",
}: {
  className?: string;
  variant?: "warm" | "neutral";
}) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const neutral = variant === "neutral";

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[2];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
          neutral
            ? "border-d-border text-d-muted hover:bg-d-hover hover:text-d-ink"
            : "border-ink/15 text-ink hover:border-clay/50"
        }`}
      >
        <GlobeIcon />
        <span>{current.label}</span>
        <svg viewBox="0 0 12 12" className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 4.5 L6 7.5 L9 4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border py-1 ${
            neutral
              ? "border-d-border bg-d-elev shadow-soft-md"
              : "border-line bg-surface shadow-[0_18px_40px_-20px_rgba(59,42,29,0.6)]"
          }`}
        >
          {LANGS.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                  neutral
                    ? `hover:bg-d-hover ${l.code === lang ? "font-semibold text-d-accent" : "text-d-muted"}`
                    : `hover:bg-clay/10 ${l.code === lang ? "font-semibold text-clay-deep" : "text-ink"}`
                }`}
              >
                <span>{l.name}</span>
                <span className={`text-xs ${neutral ? "text-d-faint" : "text-muted"}`}>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="8" cy="8" r="6.2" />
      <path d="M1.8 8 H14.2 M8 1.8 C10 4 10 12 8 14.2 C6 12 6 4 8 1.8" />
    </svg>
  );
}
