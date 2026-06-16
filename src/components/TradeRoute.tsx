"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";

export default function TradeRoute() {
  const { t } = useLang();
  const stops = t.route.stops.map((s, i) => ({ n: `0${i + 1}`, ...s }));
  const ref = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="route" ref={ref} className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <div className="mb-14 max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-clay-deep">{t.route.eyebrow}</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t.route.title}
        </h2>
      </div>

      {/* desktop horizontal route */}
      <div className="relative hidden md:block">
        <svg className="absolute left-0 top-9 h-3 w-full" viewBox="0 0 1000 12" preserveAspectRatio="none">
          <path
            className={`route-path ${drawn ? "is-drawn" : ""}`}
            d="M20 6 H980"
            fill="none"
            stroke="#C2542F"
            strokeWidth="2"
            strokeDasharray="6 8"
            strokeLinecap="round"
            pathLength={1}
          />
        </svg>
        <ol className="relative grid grid-cols-3 gap-8">
          {stops.map((s, i) => (
            <li key={s.n} className="flex flex-col items-start">
              <span
                className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border bg-bg font-display text-xl font-semibold transition-all duration-700"
                style={{
                  transitionDelay: `${600 + i * 450}ms`,
                  borderColor: drawn ? "#2E9D95" : "rgba(138,114,89,0.35)",
                  color: drawn ? "#1C7E77" : "#8A7259",
                  boxShadow: drawn ? "0 10px 22px -12px rgba(28,126,119,0.7)" : "none",
                }}
              >
                {s.n}
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* mobile vertical route */}
      <ol className="relative ml-1 space-y-8 md:hidden">
        <span
          className="absolute bottom-4 left-[23px] top-4 w-px"
          style={{ background: "repeating-linear-gradient(#C2542F 0 4px, transparent 4px 12px)" }}
          aria-hidden="true"
        />
        {stops.map((s, i) => (
          <li key={s.n} className="relative flex gap-5">
            <span
              className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-bg font-display text-base font-semibold transition-all duration-700"
              style={{
                transitionDelay: `${300 + i * 350}ms`,
                borderColor: drawn ? "#2E9D95" : "rgba(138,114,89,0.35)",
                color: drawn ? "#1C7E77" : "#8A7259",
                boxShadow: drawn ? "0 8px 18px -10px rgba(28,126,119,0.7)" : "none",
              }}
            >
              {s.n}
            </span>
            <div className="pt-1">
              <h3 className="font-display text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
