"use client";

import { useState } from "react";
import Link from "next/link";
import { getIdea, type Plan } from "@/lib/mock-ideas";
import { useLang } from "@/components/LanguageProvider";
import { useSaved } from "./SavedProvider";
import { BookmarkIcon, MonoMark } from "./icons";

type ViewKey = "problem" | "solution" | "database" | "api" | "monetization";

export default function IdeaDetail({ id }: { id?: string }) {
  const { t } = useLang();
  const { isSaved, toggle } = useSaved();
  const [view, setView] = useState<ViewKey>("problem");
  const [copied, setCopied] = useState<string | null>(null);

  const idea = id ? getIdea(id) : undefined;
  const d = t.dash.detail;

  if (!idea) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
        <MonoMark className="mx-auto h-10 w-10 text-d-faint" />
        <h2 className="mt-4 font-display text-xl font-semibold text-d-ink">{d.notFound}</h2>
        <Link href="/dashboard" className="mt-6 inline-block rounded-full border border-d-border bg-d-surface px-5 py-2 text-sm font-semibold text-d-ink shadow-soft transition-colors hover:bg-d-hover">
          {d.back}
        </Link>
      </div>
    );
  }

  const saved = isSaved(idea.id);
  const planText: Record<Plan, string> = { free: t.dash.plan.free, pro: t.dash.plan.pro, team: t.dash.plan.team };

  const copy = (key: string, data: unknown) => {
    try {
      navigator.clipboard?.writeText(JSON.stringify(data, null, 2));
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* ignore */
    }
  };

  const views: { key: ViewKey; label: string }[] = [
    { key: "problem", label: d.views.problem },
    { key: "solution", label: d.views.solution },
    { key: "database", label: d.views.database },
    { key: "api", label: d.views.api },
    { key: "monetization", label: d.views.monetization },
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-d-muted transition-colors hover:text-d-ink">
        ← {d.back}
      </Link>

      {/* header */}
      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-d-border px-2.5 py-0.5 text-[11px] font-medium text-d-muted">
              {t.sectors[idea.sector]}
            </span>
            <span className="text-xs text-d-faint">{idea.stack}</span>
            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${idea.minPlan === "free" ? "border-d-border text-d-faint" : "border-d-gold/40 text-d-gold"}`}>
              {idea.minPlan === "free" ? t.dash.plan.open : planText[idea.minPlan]}
            </span>
          </div>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-d-ink">{idea.name}</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggle(idea.id)}
            aria-pressed={saved}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium shadow-soft transition-colors ${
              saved
                ? "border-d-accent bg-d-accent text-white"
                : "border-d-border bg-d-surface text-d-muted hover:border-d-border-strong hover:text-d-ink"
            }`}
          >
            <BookmarkIcon className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
            {saved ? d.saved : d.save}
          </button>
          <button
            onClick={() => copy("json", idea)}
            className="rounded-full border border-d-border bg-d-surface px-3.5 py-2 text-sm font-medium text-d-muted shadow-soft transition-colors hover:border-d-border-strong hover:text-d-ink"
          >
            {copied === "json" ? d.copied : d.copyJson}
          </button>
        </div>
      </div>

      {/* TODO: gate by plan — show Problem + Solution free, lock Database/API/Monetization
          behind idea.minPlan once auth + plans exist. For now (mock Free) all views are open. */}
      <div className="mt-6 inline-flex flex-wrap gap-1 rounded-xl border border-d-border bg-d-surface p-1 shadow-soft">
        {views.map((v) => {
          const active = view === v.key;
          return (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              aria-pressed={active}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active ? "bg-d-elev text-d-ink shadow-soft" : "text-d-muted hover:text-d-ink"
              }`}
            >
              {v.label}
            </button>
          );
        })}
      </div>

      {/* content */}
      <div className="mt-6 min-h-[280px]">
        {view === "problem" && <p className="max-w-2xl text-base leading-relaxed text-d-muted">{idea.problemLong}</p>}
        {view === "solution" && <p className="max-w-2xl text-base leading-relaxed text-d-muted">{idea.solution}</p>}

        {view === "database" && (
          <div>
            <div className="mb-4 flex justify-end">
              <CopyBtn onClick={() => copy("db", idea.dbSchema)} label={copied === "db" ? d.copied : d.copyDb} />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {idea.dbSchema.map((tbl) => (
                <div key={tbl.name} className="rounded-2xl border border-d-border bg-d-elev p-4 shadow-soft">
                  <p className="mb-3 font-mono text-sm font-semibold text-d-accent">{tbl.name}</p>
                  <ul className="space-y-2">
                    {tbl.fields.map((f) => (
                      <li key={f.name} className="flex flex-wrap items-baseline gap-x-2 text-xs">
                        <span className="font-mono text-d-ink">{f.name}</span>
                        <span className="font-mono text-d-muted">{f.type}</span>
                        {f.note && <span className="text-[11px] text-d-faint">· {f.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "api" && (
          <div>
            <div className="mb-4 flex justify-end">
              <CopyBtn onClick={() => copy("api", idea.apiEndpoints)} label={copied === "api" ? d.copied : d.copyApi} />
            </div>
            <div className="overflow-hidden rounded-2xl border border-d-border shadow-soft">
              {idea.apiEndpoints.map((e, i) => (
                <div key={i} className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${i % 2 ? "bg-d-surface" : "bg-d-elev"}`}>
                  <span className="w-16 shrink-0 font-mono text-xs font-semibold text-d-accent">{e.method}</span>
                  <span className="shrink-0 font-mono text-xs text-d-ink sm:w-72">{e.path}</span>
                  <span className="text-xs text-d-muted">{e.purpose}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "monetization" && <p className="max-w-2xl text-base leading-relaxed text-d-muted">{idea.monetization}</p>}
      </div>
    </div>
  );
}

function CopyBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-d-border bg-d-surface px-3 py-1.5 text-xs font-medium text-d-muted shadow-soft transition-colors hover:border-d-border-strong hover:text-d-ink"
    >
      {label}
    </button>
  );
}
