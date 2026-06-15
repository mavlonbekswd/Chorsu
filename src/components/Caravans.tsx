import Link from "next/link";
import { caravans } from "@/lib/data";
import Reveal from "./Reveal";

export default function Caravans() {
  return (
    <section id="caravans" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-clay-deep">Choose your caravan</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Pick how you travel the bazaar.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {caravans.map((c, i) => (
          <Reveal key={c.name} delay={i * 90} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-2xl border p-6 transition-all ${
                c.highlighted
                  ? "border-clay/55 bg-surface shadow-[0_22px_50px_-24px_rgba(194,84,47,0.55)]"
                  : "border-line bg-surface shadow-[0_12px_34px_-26px_rgba(59,42,29,0.55)]"
              }`}
            >
              {c.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-clay px-3 py-1 text-[11px] font-semibold text-cream">
                  {c.tagline}
                </span>
              )}

              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl font-semibold text-ink">{c.name}</h3>
                {!c.highlighted && <span className="text-xs text-muted">{c.tagline}</span>}
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-3xl font-semibold text-ink">
                  {c.price === "0" ? "Free" : c.price}
                </span>
                {c.unit && <span className="text-sm text-muted">{c.unit}</span>}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">{c.blurb}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {c.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-ink/90">
                    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-turquoise-deep" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 10 l4 4 l8 -9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`mt-7 rounded-full px-5 py-3 text-center text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  c.highlighted
                    ? "bg-clay text-cream shadow-[0_12px_26px_-12px_rgba(162,63,34,0.9)]"
                    : "border border-ink/15 text-ink hover:border-clay/50"
                }`}
              >
                {c.cta}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted">Prices are placeholders, set by the owner.</p>
    </section>
  );
}
