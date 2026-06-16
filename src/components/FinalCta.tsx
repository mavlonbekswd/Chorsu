"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";

export default function FinalCta() {
  const { t } = useLang();
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-14">
      <div className="relative overflow-hidden rounded-3xl bg-clay px-6 py-16 text-center sm:px-12 sm:py-20">
        {/* suzani-stripe tile band along the top edge */}
        <div className="tile-band absolute inset-x-0 top-0 h-2" aria-hidden="true" />
        {/* soft saffron daylight in the corner */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-saffron/30 blur-3xl" aria-hidden="true" />

        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl">
            {t.final.line}
          </h2>
          <Link
            href="/signup"
            className="mt-8 inline-block rounded-full bg-cream px-8 py-3.5 text-sm font-semibold text-clay-deep shadow-[0_12px_28px_-12px_rgba(59,42,29,0.7)] transition-transform hover:scale-[1.03]"
          >
            {t.final.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
