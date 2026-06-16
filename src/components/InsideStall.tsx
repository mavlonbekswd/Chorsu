"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";

type ViewId = "need" | "design" | "foundation" | "connections" | "trade";

const methodColor: Record<string, string> = {
  GET: "text-turquoise-deep",
  POST: "text-clay-deep",
  PATCH: "text-turquoise-deep",
  DELETE: "text-clay-deep",
};

export default function InsideStall() {
  const { t } = useLang();
  const inside = t.inside;
  const [view, setView] = useState<ViewId>("need");

  const views: { id: ViewId; label: string }[] = [
    { id: "need", label: inside.views.need },
    { id: "design", label: inside.views.design },
    { id: "foundation", label: inside.views.foundation },
    { id: "connections", label: inside.views.connections },
    { id: "trade", label: inside.views.trade },
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-clay-deep">{inside.eyebrow}</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {inside.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {inside.subPre}
          <span className="text-ink">Nasiya</span>
          {inside.subPost}
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_18px_50px_-30px_rgba(59,42,29,0.6)]">
        {/* stall header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-turquoise/15 font-display text-sm font-semibold text-turquoise-deep">
              N
            </span>
            <div>
              <p className="font-display text-base font-semibold text-ink">Nasiya</p>
              <p className="text-xs text-muted">{t.sectors.Retail} · {inside.unlocked}</p>
            </div>
          </div>
          <span className="hidden text-xs text-turquoise-deep sm:inline">● {inside.open}</span>
        </div>

        {/* view switcher */}
        <div className="flex gap-1 overflow-x-auto border-b border-line px-3 py-3 sm:px-5">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              aria-pressed={view === v.id}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                view === v.id ? "bg-clay text-cream" : "text-muted hover:text-ink"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* view body */}
        <div className="min-h-[320px] px-5 py-7 sm:px-7">
          {view === "need" && (
            <ul className="space-y-4">
              {inside.need.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}

          {view === "design" && (
            <ul className="space-y-4">
              {inside.design.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-turquoise" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}

          {view === "foundation" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {inside.schema.map((tbl) => (
                <div key={tbl.name} className="rounded-xl border border-line bg-cream p-4">
                  <p className="mb-3 font-mono text-sm font-semibold text-turquoise-deep">{tbl.name}</p>
                  <ul className="space-y-2">
                    {tbl.fields.map((f) => (
                      <li key={f.name} className="flex flex-wrap items-baseline gap-x-2 text-xs">
                        <span className="font-mono text-ink">{f.name}</span>
                        <span className="font-mono text-muted">{f.type}</span>
                        {f.note && <span className="text-[11px] text-muted/70">· {f.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {view === "connections" && (
            <div className="overflow-hidden rounded-xl border border-line">
              {inside.endpoints.map((e, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${
                    i % 2 ? "bg-cream" : ""
                  }`}
                >
                  <span className={`w-16 shrink-0 font-mono text-xs font-semibold ${methodColor[e.method]}`}>
                    {e.method}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-ink sm:w-64">{e.path}</span>
                  <span className="text-xs text-muted">{e.purpose}</span>
                </div>
              ))}
            </div>
          )}

          {view === "trade" && (
            <ul className="space-y-4">
              {inside.trade.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                  <span className="mt-1.5 font-mono text-xs font-semibold text-clay-deep">0{i + 1}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
