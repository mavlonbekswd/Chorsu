"use client";

import Reveal from "./Reveal";
import { useLang } from "./LanguageProvider";

export default function MerchantPromise() {
  const { t } = useLang();
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-clay-deep">{t.promise.eyebrow}</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t.promise.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {t.promise.items.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 90}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-[0_12px_34px_-26px_rgba(59,42,29,0.6)]">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-saffron/15 blur-2xl" aria-hidden="true" />
              <div className="relative">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-clay/40 bg-clay/10 text-clay-deep">
                  {i === 0 ? <Diamond /> : i === 1 ? <Road /> : i === 2 ? <Bolt /> : <Moon />}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const ico = "h-4 w-4";
function Diamond() {
  return (
    <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3 L20 9 L12 21 L4 9 Z M4 9 H20 M9 9 L12 21 M15 9 L12 21" strokeLinejoin="round" />
    </svg>
  );
}
function Road() {
  return (
    <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 21 L4 3 H20 L17 21 Z M12 6 V8 M12 11 V13 M12 16 V18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Bolt() {
  return (
    <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M13 2 L4 14 H11 L10 22 L20 9 H13 Z" strokeLinejoin="round" />
    </svg>
  );
}
function Moon() {
  return (
    <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M20 14 A8 8 0 1 1 10 4 a6 6 0 0 0 10 10 Z" strokeLinejoin="round" />
    </svg>
  );
}
