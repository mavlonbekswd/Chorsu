"use client";

import type { Idea } from "@/lib/mock-ideas";
import IdeaCard from "./IdeaCard";
import { DomeMark } from "./icons";

export default function IdeaGrid({
  ideas,
  savedSet,
  onToggleSave,
}: {
  ideas: Idea[];
  savedSet: Set<string>;
  onToggleSave: (id: string) => void;
}) {
  if (ideas.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-12 text-center">
        <div className="girih-texture pointer-events-none absolute inset-0 opacity-[0.4]" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-sm flex-col items-center">
          <DomeMark className="h-10 w-10" />
          <h3 className="mt-4 font-display text-lg font-semibold text-ink">No ideas match.</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Try clearing a filter or searching for something else — the bazaar is wide.
          </p>
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
