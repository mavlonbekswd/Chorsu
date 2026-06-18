"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Ctx = { saved: Set<string>; toggle: (id: string) => void; isSaved: (id: string) => boolean };
const SavedContext = createContext<Ctx | null>(null);

const KEY = "chorsu-saved";

// Mock saved-ideas store, shared across the marketplace, idea detail, and (step 4) the Saved page.
// Persisted to localStorage so it survives reloads. // TODO: move to the DB once auth exists.
export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSaved(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = (id: string) =>
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(KEY, JSON.stringify(Array.from(next)));
      } catch {
        /* ignore */
      }
      return next;
    });

  return <SavedContext.Provider value={{ saved, toggle, isSaved: (id) => saved.has(id) }}>{children}</SavedContext.Provider>;
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSaved must be used within SavedProvider");
  return ctx;
}
