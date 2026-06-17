"use client";

import { SearchIcon } from "./icons";

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-muted transition-colors focus-within:border-clay/50">
      <SearchIcon className="h-5 w-5 shrink-0" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search ideas — name, sector, problem…"
        className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted sm:text-base"
        aria-label="Search ideas"
      />
    </div>
  );
}
