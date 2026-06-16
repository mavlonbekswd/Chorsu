"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { useLang } from "./LanguageProvider";

const sectorColor: Record<string, string> = {
  Retail: "text-turquoise-deep border-turquoise/30 bg-turquoise/10",
  Food: "text-clay-deep border-clay/30 bg-clay/10",
  Education: "text-turquoise-deep border-turquoise/30 bg-turquoise/10",
  Health: "text-clay-deep border-clay/30 bg-clay/10",
  Services: "text-turquoise-deep border-turquoise/30 bg-turquoise/10",
};

export default function Stalls() {
  const { t } = useLang();
  return (
    <section id="stalls" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-clay-deep">{t.stalls.eyebrow}</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {t.stalls.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {t.stalls.sub}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.stalls.ideas.map((idea, i) => (
          <Reveal key={idea.slug} delay={(i % 3) * 90}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-[0_10px_30px_-22px_rgba(59,42,29,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-[0_20px_44px_-22px_rgba(194,84,47,0.5)]">
              {/* warm glow that rises on hover */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-saffron/20 to-transparent transition-all duration-500 group-hover:h-2/3" />

              <div className="relative">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${sectorColor[idea.sector]}`}
                >
                  {idea.sectorLabel}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">{idea.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{idea.problem}</p>
              </div>

              {/* the architecture, behind a tile lattice — the locked good */}
              <div className="relative mt-5 overflow-hidden rounded-xl border border-line bg-cream">
                <div className="space-y-2 p-4">
                  <div className="h-2 w-3/4 rounded bg-ink/10" />
                  <div className="h-2 w-1/2 rounded bg-ink/10" />
                  <div className="h-2 w-2/3 rounded bg-ink/10" />
                </div>
                <div className="girih-texture absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-cream/70" />
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                  <Lantern className="h-5 w-5 text-clay transition-transform duration-500 group-hover:scale-110" />
                  <span className="text-xs font-medium text-ink">{t.stalls.locked}</span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/signup"
          className="group inline-flex items-center gap-2 rounded-full border border-clay/40 px-6 py-3 text-sm font-semibold text-clay-deep transition-colors hover:bg-clay/10"
        >
          {t.stalls.cta}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}

function Lantern({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 2 V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M7 8 Q7 5 12 5 Q17 5 17 8 V16 Q17 19 12 19 Q7 19 7 16 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="rgba(229,169,60,0.18)"
      />
      <path d="M9 19 V21 M15 19 V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
    </svg>
  );
}
