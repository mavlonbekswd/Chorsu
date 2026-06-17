"use client";

export type TabKey = "all" | "trending" | "new" | "saved";

const TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "trending", label: "🔥 Trending" },
  { key: "new", label: "✨ New" },
  { key: "saved", label: "🔖 Saved" },
];

export default function QuickTabs({
  tab,
  onTab,
  savedCount,
}: {
  tab: TabKey;
  onTab: (t: TabKey) => void;
  savedCount: number;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Quick filters">
      {TABS.map((t) => {
        const active = tab === t.key;
        return (
          <button
            key={t.key}
            role="tab"
            aria-selected={active}
            onClick={() => onTab(t.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active ? "bg-clay text-cream" : "border border-line bg-surface text-ink/75 hover:border-clay/40 hover:text-ink"
            }`}
          >
            {t.label}
            {t.key === "saved" && savedCount > 0 && (
              <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${active ? "bg-cream/25" : "bg-clay/10 text-clay-deep"}`}>
                {savedCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
