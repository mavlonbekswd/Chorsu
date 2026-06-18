"use client";

import type { Idea } from "@/lib/mock-ideas";
import { useLang } from "@/components/LanguageProvider";
import IdeaCard from "./IdeaCard";
import { MonoMark } from "./icons";

export default function IdeaGrid({
  ideas,
  savedSet,
  onToggleSave,
}: {
  ideas: Idea[];
  savedSet: Set<string>;
  onToggleSave: (id: string) => void;
}) {
  const { t } = useLang();

  if (ideas.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-d-border bg-d-elev p-12 text-center shadow-soft">
        <div className="dash-girih pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-sm flex-col items-center">
          <MonoMark className="h-10 w-10 text-d-faint" />
          <h3 className="mt-4 font-display text-lg font-semibold text-d-ink">{t.dash.emptyTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-d-muted">{t.dash.emptyBody}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} saved={savedSet.has(idea.id)} onToggleSave={onToggleSave} />
      ))}
    </div>
  );
}
