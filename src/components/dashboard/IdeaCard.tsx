"use client";

import Link from "next/link";
import type { Idea, Sector, Plan } from "@/lib/mock-ideas";
import { BookmarkIcon } from "./icons";

const sectorPill: Record<Sector, string> = {
  Retail: "text-turquoise-deep border-turquoise/30 bg-turquoise/10",
  Food: "text-clay-deep border-clay/30 bg-clay/10",
  Education: "text-turquoise-deep border-turquoise/30 bg-turquoise/10",
  Health: "text-clay-deep border-clay/30 bg-clay/10",
  Services: "text-turquoise-deep border-turquoise/30 bg-turquoise/10",
};

const planLabel: Record<Plan, string> = { free: "Free", pro: "Pro", team: "Team" };

export default function IdeaCard({
  idea,
  saved,
  onToggleSave,
}: {
  idea: Idea;
  saved: boolean;
  onToggleSave: (id: string) => void;
}) {
  const locked = idea.minPlan !== "free"; // current mock plan is Free

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-[0_10px_30px_-22px_rgba(59,42,29,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-[0_20px_44px_-22px_rgba(194,84,47,0.45)]">
      {/* warm glow on hover */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-saffron/15 to-transparent transition-all duration-500 group-hover:h-2/3" />

      {/* stretched click target → idea detail */}
      <Link href={`/dashboard/idea/${idea.id}`} className="absolute inset-0 z-10" aria-label={`Open ${idea.name}`} />

      {/* save toggle (above the link) */}
      <button
        onClick={() => onToggleSave(idea.id)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${idea.name} from saved` : `Save ${idea.name}`}
        className={`absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
          saved ? "border-clay/40 bg-clay/10 text-clay-deep" : "border-line bg-cream text-muted hover:text-clay-deep"
        }`}
      >
        <BookmarkIcon className={saved ? "fill-clay-deep" : ""} />
      </button>

      <div className="relative flex items-center gap-2">
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${sectorPill[idea.sector]}`}>
          {idea.sector}
        </span>
        {idea.isTrending && <span className="text-[11px] font-medium text-clay-deep">🔥 Trending</span>}
        {idea.isNew && <span className="text-[11px] font-medium text-turquoise-deep">✨ New</span>}
      </div>

      <h3 className="relative mt-3 font-display text-xl font-semibold text-ink">{idea.name}</h3>
      <p className="relative mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{idea.problem}</p>

      {/* meta row */}
      <div className="relative mt-auto flex items-center justify-between pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-turquoise" />
          {idea.stack}
        </span>
        {locked ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-saffron/40 bg-saffron/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-clay-deep">
            <LockIcon /> {planLabel[idea.minPlan]}
          </span>
        ) : (
          <span className="rounded-full border border-turquoise/30 bg-turquoise/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-turquoise-deep">
            Open
          </span>
        )}
      </div>
    </article>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
