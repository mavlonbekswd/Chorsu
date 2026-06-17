"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ideas as ALL_IDEAS, SECTORS } from "@/lib/mock-ideas";
import SearchBar from "./SearchBar";
import FilterBar, { type SortKey } from "./FilterBar";
import QuickTabs, { type TabKey } from "./QuickTabs";
import IdeaGrid from "./IdeaGrid";

const PAGE = 9;

export default function IdeasMarketplace() {
  const params = useSearchParams();
  const initialSector = useMemo(() => {
    const raw = params.get("sector");
    return SECTORS.find((s) => s.toLowerCase() === raw?.toLowerCase()) ?? "";
  }, [params]);

  const [q, setQ] = useState("");
  const [sector, setSector] = useState<string>(initialSector);
  const [stack, setStack] = useState("");
  const [plan, setPlan] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [tab, setTab] = useState<TabKey>("all");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [visible, setVisible] = useState(PAGE);

  // reflect a sector chosen from the sidebar (?sector=…)
  useEffect(() => setSector(initialSector), [initialSector]);

  const toggleSave = (id: string) =>
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const filtered = useMemo(() => {
    let list = ALL_IDEAS.slice();
    if (tab === "trending") list = list.filter((i) => i.isTrending);
    else if (tab === "new") list = list.filter((i) => i.isNew);
    else if (tab === "saved") list = list.filter((i) => saved.has(i.id));

    if (sector) list = list.filter((i) => i.sector === sector);
    if (stack) list = list.filter((i) => i.stack === stack);
    if (plan) list = list.filter((i) => i.minPlan === plan);

    const query = q.trim().toLowerCase();
    if (query)
      list = list.filter((i) =>
        `${i.name} ${i.sector} ${i.problem} ${i.problemLong}`.toLowerCase().includes(query),
      );

    if (sort === "newest") list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew) || b.saves - a.saves);
    else if (sort === "trending") list.sort((a, b) => Number(!!b.isTrending) - Number(!!a.isTrending) || b.saves - a.saves);
    else if (sort === "saved") list.sort((a, b) => b.saves - a.saves);
    // "featured" keeps the curated order (strongest first)

    return list;
  }, [tab, sector, stack, plan, q, sort, saved]);

  // reset paging when the result set changes
  useEffect(() => setVisible(PAGE), [tab, sector, stack, plan, q, sort]);

  const shown = filtered.slice(0, visible);
  const chips: { label: string; clear: () => void }[] = [];
  if (sector) chips.push({ label: sector, clear: () => setSector("") });
  if (stack) chips.push({ label: stack, clear: () => setStack("") });
  if (plan) chips.push({ label: plan[0].toUpperCase() + plan.slice(1), clear: () => setPlan("") });
  if (q.trim()) chips.push({ label: `“${q.trim()}”`, clear: () => setQ("") });

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      {/* 1 — header with count */}
      <header className="mb-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-clay-deep">The bazaar</p>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">Ideas</h2>
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">{ALL_IDEAS.length}</span> ready-to-build ideas across {SECTORS.length} sectors
          </p>
        </div>
      </header>

      {/* 2 — search */}
      <div className="mb-4">
        <SearchBar value={q} onChange={setQ} />
      </div>

      {/* 3 — filter + sort */}
      <div className="mb-4">
        <FilterBar
          sector={sector}
          stack={stack}
          plan={plan}
          sort={sort}
          onSector={setSector}
          onStack={setStack}
          onPlan={setPlan}
          onSort={setSort}
        />
      </div>

      {/* 4 — quick tabs */}
      <div className="mb-4">
        <QuickTabs tab={tab} onTab={setTab} savedCount={saved.size} />
      </div>

      {/* 5 — result count + active filters */}
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-muted">
        <span>
          Showing <span className="font-semibold text-ink">{filtered.length}</span> {filtered.length === 1 ? "idea" : "ideas"}
        </span>
        {chips.map((c, i) => (
          <button
            key={i}
            onClick={c.clear}
            className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs text-ink transition-colors hover:border-clay/40"
          >
            {c.label} <span className="text-muted">✕</span>
          </button>
        ))}
        {chips.length > 0 && (
          <button
            onClick={() => {
              setSector("");
              setStack("");
              setPlan("");
              setQ("");
            }}
            className="text-xs font-medium text-clay-deep hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* 6 — grid */}
      <IdeaGrid ideas={shown} savedSet={saved} onToggleSave={toggleSave} />

      {/* 7 — load more */}
      {visible < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + 6)}
            className="rounded-full border border-clay/40 px-6 py-2.5 text-sm font-semibold text-clay-deep transition-colors hover:bg-clay/10"
          >
            Load more ({filtered.length - visible} left)
          </button>
        </div>
      )}
    </div>
  );
}
