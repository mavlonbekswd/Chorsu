"use client";

import { useLang } from "@/components/LanguageProvider";

export type TabKey = "all" | "trending" | "new" | "saved";

export default function QuickTabs({
  tab,
  onTab,
  savedCount,
}: {
  tab: TabKey;
  onTab: (t: TabKey) => void;
  savedCount: number;
}) {
  const { t } = useLang();
  const tabs: { key: TabKey; label: string }[] = [
    { key: "all", label: t.dash.tabs.all },
    { key: "trending", label: t.dash.tabs.trending },
    { key: "new", label: t.dash.tabs.new },
    { key: "saved", label: t.dash.tabs.saved },
  ];

  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl border border-d-border bg-d-surface p-1 shadow-soft" role="tablist" aria-label="Quick filters">
      {tabs.map((tb) => {
        const active = tab === tb.key;
        return (
          <button
            key={tb.key}
            role="tab"
            aria-selected={active}
            onClick={() => onTab(tb.key)}
            className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active ? "bg-d-elev text-d-ink shadow-soft" : "text-d-muted hover:text-d-ink"
            }`}
          >
            {tb.label}
            {tb.key === "saved" && savedCount > 0 && (
              <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${active ? "bg-d-accent/15 text-d-accent" : "bg-d-hover text-d-muted"}`}>
                {savedCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
