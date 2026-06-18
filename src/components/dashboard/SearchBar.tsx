"use client";

import { useLang } from "@/components/LanguageProvider";
import { SearchIcon } from "./icons";

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { t } = useLang();
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-d-border bg-d-elev px-4 py-3 text-d-faint shadow-soft transition-colors focus-within:border-d-accent/50 focus-within:ring-2 focus-within:ring-d-accent/10">
      <SearchIcon className="h-5 w-5 shrink-0" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.dash.searchLong}
        className="w-full bg-transparent text-sm text-d-ink outline-none placeholder:text-d-faint sm:text-base"
        aria-label={t.dash.searchShort}
      />
    </div>
  );
}
