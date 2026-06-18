"use client";

import { SECTORS, STACKS, PLANS } from "@/lib/mock-ideas";
import { useLang } from "@/components/LanguageProvider";
import { ChevronIcon } from "./icons";

export type SortKey = "featured" | "newest" | "trending" | "saved";

const selectBase =
  "appearance-none rounded-xl border bg-d-surface py-2 pl-3 pr-8 text-sm shadow-soft outline-none transition-colors hover:border-d-border-strong focus:border-d-accent/60 focus:ring-2 focus:ring-d-accent/10";

function Select({
  label,
  value,
  onChange,
  options,
  active,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  active: boolean;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className={`${selectBase} ${active ? "border-d-accent/50 text-d-ink" : "border-d-border text-d-muted"}`}
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-d-faint" />
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
  const { t } = useLang();
  const sorts: { key: SortKey; label: string }[] = [
    { key: "featured", label: t.dash.sort.featured },
    { key: "newest", label: t.dash.sort.newest },
    { key: "trending", label: t.dash.sort.trending },
    { key: "saved", label: t.dash.sort.saved },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select label={t.dash.filters.sector} value={sector} active={!!sector} onChange={onSector} options={SECTORS.map((s) => ({ value: s, label: t.sectors[s] }))} />
      <Select label={t.dash.filters.stack} value={stack} active={!!stack} onChange={onStack} options={STACKS.map((s) => ({ value: s, label: s }))} />
      <Select label={t.dash.filters.plan} value={plan} active={!!plan} onChange={onPlan} options={PLANS.map((p) => ({ value: p, label: t.dash.plan[p] }))} />

      <div className="ml-auto flex items-center gap-2">
        <span className="hidden text-xs text-d-faint sm:inline">{t.dash.sortLabel}</span>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            aria-label={t.dash.sortLabel}
            className={`${selectBase} border-d-border text-d-ink`}
          >
            {sorts.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
          <ChevronIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-d-faint" />
        </div>
      </div>
    </div>
  );
}
