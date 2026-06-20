"use client";

import Link from "next/link";
import type { Idea, Plan } from "@/lib/mock-ideas";
import { useLang } from "@/components/LanguageProvider";
import { BookmarkIcon } from "./icons";

export default function IdeaCard({
  idea,
  saved,
  onToggleSave,
}: {
  idea: Idea;
  saved: boolean;
  onToggleSave: (id: string) => void;
}) {
  const { t } = useLang();
  const locked = idea.minPlan !== "free"; // current mock plan is Free
  const planText: Record<Plan, string> = { free: t.dash.plan.free, pro: t.dash.plan.pro, team: t.dash.plan.team };

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-d-border bg-d-elev p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-d-border-strong hover:shadow-soft-md">
      {/* stretched click target → idea detail */}
      <Link href={`/dashboard/ideas/${idea.id}`} className="absolute inset-0 z-10 rounded-2xl" aria-label={`Open ${idea.name}`} />

      {/* save toggle (above the link) */}
      <button
        onClick={() => onToggleSave(idea.id)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${idea.name} from saved` : `Save ${idea.name}`}
        className={`absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
          saved
            ? "border-d-accent bg-d-accent text-white shadow-soft"
            : "border-d-border bg-d-surface text-d-faint hover:border-d-border-strong hover:text-d-ink"
        }`}
      >
        <BookmarkIcon className={saved ? "fill-current" : ""} />
      </button>

      <div className="relative flex items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-d-border px-2.5 py-0.5 text-[11px] font-medium text-d-muted">
          {t.sectors[idea.sector]}
        </span>
        {idea.isTrending && <span className="text-[10px] font-semibold uppercase tracking-wider text-d-faint">{t.dash.flags.trending}</span>}
        {idea.isNew && <span className="text-[10px] font-semibold uppercase tracking-wider text-d-accent">{t.dash.flags.new}</span>}
      </div>

      <h3 className="relative mt-3 font-display text-xl font-semibold text-d-ink">{idea.name}</h3>
      <p className="relative mt-1.5 line-clamp-2 text-sm leading-relaxed text-d-muted">{idea.problem}</p>

      <div className="relative mt-auto flex items-center justify-between pt-4">
        <span className="text-xs text-d-faint">{idea.stack}</span>
        <span
          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
            locked ? "border-d-gold/40 text-d-gold" : "border-d-border text-d-faint"
          }`}
        >
          {locked ? planText[idea.minPlan] : t.dash.plan.open}
        </span>
      </div>
    </article>
  );
}
