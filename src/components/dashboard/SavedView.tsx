"use client";

import Link from "next/link";
import { ideas as ALL_IDEAS } from "@/lib/mock-ideas";
import { useLang } from "@/components/LanguageProvider";
import { useSaved } from "./SavedProvider";
import IdeaGrid from "./IdeaGrid";
import { MonoMark } from "./icons";

export default function SavedView() {
  const { t } = useLang();
  const { saved, toggle } = useSaved();
  const list = ALL_IDEAS.filter((i) => saved.has(i.id));

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <header className="mb-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-d-accent">{t.dash.bazaar}</p>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-d-ink">{t.dash.saved}</h2>
          <p className="text-sm text-d-muted">
            <span className="font-semibold text-d-ink">{list.length}</span> {t.dash.ideasWord}
          </p>
        </div>
      </header>

      {list.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl border border-d-border bg-d-elev p-14 text-center shadow-soft">
          <div className="dash-girih pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
          <div className="relative mx-auto flex max-w-sm flex-col items-center">
            <MonoMark className="h-11 w-11 text-d-faint" />
            <h3 className="mt-4 font-display text-lg font-semibold text-d-ink">{t.dash.savedPage.emptyTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-d-muted">{t.dash.savedPage.emptyBody}</p>
            <Link
              href="/dashboard"
              className="mt-6 rounded-full bg-d-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03]"
            >
              {t.dash.savedPage.browse}
            </Link>
          </div>
        </div>
      ) : (
        <IdeaGrid ideas={list} savedSet={saved} onToggleSave={toggle} />
      )}
    </div>
  );
}
