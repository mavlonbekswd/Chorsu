"use client";

import Link from "next/link";
import HeroBackdrop from "./HeroBackdrop";
import { useLang } from "./LanguageProvider";

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="hero-bg relative isolate min-h-[100svh] overflow-hidden">
      <HeroBackdrop />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-start px-5 pb-12 pt-28 sm:justify-center sm:pb-16 sm:pt-24">
        <div className="max-w-xl">
          <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-clay/30 bg-cream/70 px-3 py-1 text-xs font-medium tracking-wide text-clay-deep backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
            {t.hero.eyebrow}
          </p>

          <h1 className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-ink drop-shadow-[0_1px_0_rgba(251,241,222,0.8)] sm:text-5xl md:text-6xl">
            {t.hero.headline}
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/80 sm:text-lg">
            {t.hero.sub}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {/* TODO: replace with real auth — stub navigates straight into the dashboard */}
            <Link
              href="/dashboard"
              className="rounded-full bg-clay px-6 py-3 text-center text-sm font-semibold text-cream shadow-[0_10px_24px_-12px_rgba(162,63,34,0.9)] transition-transform hover:scale-[1.03]"
            >
              {t.hero.primary}
            </Link>
            <a
              href="#stalls"
              className="rounded-full border border-ink/15 bg-cream/60 px-6 py-3 text-center text-sm font-semibold text-ink backdrop-blur-sm transition-colors hover:border-clay/50 hover:text-clay-deep"
            >
              {t.hero.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
