"use client";

import { SECTORS, STACKS, PLANS } from "@/lib/mock-ideas";
import { ChevronIcon } from "./icons";

export type SortKey = "featured" | "newest" | "trending" | "saved";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "trending", label: "Trending" },
  { key: "saved", label: "Most saved" },
];

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className={`appearance-none rounded-lg border bg-surface py-2 pl-3 pr-8 text-sm outline-none transition-colors hover:border-clay/40 focus:border-clay/50 ${
          value ? "border-clay/40 text-ink" : "border-line text-muted"
        }`}
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-muted" />
    </div>
  );
}

export default function FilterBar({
  sector,
  stack,
  plan,
  sort,
  onSector,
  onStack,
  onPlan,
  onSort,
}: {
  sector: string;
  stack: string;
  plan: string;
  sort: SortKey;
  onSector: (v: string) => void;
  onStack: (v: string) => void;
  onPlan: (v: string) => void;
  onSort: (v: SortKey) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select label="Sector" value={sector} onChange={onSector} options={SECTORS.map((s) => ({ value: s, label: s }))} />
      <Select label="Stack" value={stack} onChange={onStack} options={STACKS.map((s) => ({ value: s, label: s }))} />
      <Select
        label="Plan"
        value={plan}
        onChange={onPlan}
        options={PLANS.map((p) => ({ value: p, label: p[0].toUpperCase() + p.slice(1) }))}
      />

      <div className="ml-auto flex items-center gap-2">
        <span className="hidden text-xs text-muted sm:inline">Sort</span>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            aria-label="Sort ideas"
            className="appearance-none rounded-lg border border-line bg-surface py-2 pl-3 pr-8 text-sm text-ink outline-none transition-colors hover:border-clay/40 focus:border-clay/50"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
          <ChevronIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-muted" />
        </div>
      </div>
    </div>
  );
}
