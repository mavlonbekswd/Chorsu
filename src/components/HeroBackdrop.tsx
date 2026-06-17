"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The interactive hero backdrop: the illustrated Chorsu dome (public/landing_bg2.png),
 * brought to life with — cursor-driven 3D parallax tilt, a sunlight glow that
 * follows the pointer across the majolica tiles, gold sparkles that drift with
 * depth, and gentle scroll parallax. All motion is skipped under
 * prefers-reduced-motion; the static illustration remains.
 */
const SPARKS = [
  { l: "20%", t: "32%" },
  { l: "33%", t: "58%" },
  { l: "70%", t: "26%" },
  { l: "82%", t: "50%" },
  { l: "54%", t: "20%" },
  { l: "61%", t: "64%" },
];

const OUTLINE = "#9A4427";

// A tiny folk-art bazaar-goer (feet at local 0,0; ~46 units tall).
function Person({ robe, cap = "#2C3E63", arm = false, flip = false }: { robe: string; cap?: string; arm?: boolean; flip?: boolean }) {
  return (
    <g transform={flip ? "scale(-1,1)" : undefined}>
      <ellipse cx="0" cy="1.5" rx="9" ry="2.6" fill={OUTLINE} opacity="0.16" />
      <path d="M-3 0 V-12 M3 0 V-12" stroke="#6E4A2E" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M-7 -9 L-5.2 -30 Q0 -33 5.2 -30 L7 -9 Q0 -6.5 -7 -9 Z" fill={robe} stroke={OUTLINE} strokeWidth="1.4" />
      <path d="M-6 -18 Q0 -15 6 -18" stroke="#E2A12C" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d={arm ? "M5 -28 Q12 -27 12 -33" : "M5 -27 Q10 -23 9 -17"} stroke={OUTLINE} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M-5 -27 Q-10 -23 -9 -17" stroke={OUTLINE} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="0" cy="-35.5" r="5.2" fill="#CE9A6E" stroke={OUTLINE} strokeWidth="1.2" />
      <path d="M-5.4 -36.5 Q0 -44.5 5.4 -36.5 Z" fill={cap} stroke={OUTLINE} strokeWidth="1.1" />
    </g>
  );
}

// A market stall — table, awning, little piles of goods (table top at local 0).
function Stall({ awn }: { awn: string }) {
  return (
    <g>
      <path d="M-22 0 V-14 M22 0 V-14" stroke={OUTLINE} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="-26" y="-16" width="52" height="6" rx="1.5" fill="#E8B98A" stroke={OUTLINE} strokeWidth="1.3" />
      <circle cx="-15" cy="-19" r="3" fill="#C2542F" stroke={OUTLINE} strokeWidth="0.8" />
      <circle cx="-5" cy="-19" r="3" fill="#E2A12C" stroke={OUTLINE} strokeWidth="0.8" />
      <circle cx="5" cy="-19" r="3" fill="#2E9D95" stroke={OUTLINE} strokeWidth="0.8" />
      <circle cx="15" cy="-19" r="3" fill="#B14E2C" stroke={OUTLINE} strokeWidth="0.8" />
      <path d="M-28 -22 V-40 M28 -22 V-40" stroke={OUTLINE} strokeWidth="1.6" />
      <path d="M-32 -40 H32 L27 -30 H-27 Z" fill={awn} stroke={OUTLINE} strokeWidth="1.4" />
      <g stroke="#FBF3E2" strokeWidth="3">
        <path d="M-20 -40 l-2.6 10 M-8 -40 l-2.6 10 M4 -40 l-2.6 10 M16 -40 l-2.6 10" />
      </g>
    </g>
  );
}

// A small bird — two swept wings that flap.
function Bird({ flip = false }: { flip?: boolean }) {
  return (
    <g transform={flip ? "scale(-1,1)" : undefined} className="cb-wing">
      <path d="M-15 0 Q-7 -7 0 -1 Q7 -7 15 0" fill="none" stroke="#6E4A2E" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  );
}

export default function HeroBackdrop() {
  const host = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const sparks = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = 0.5;
    let my = 0.4;
    let sy = 0;
    let hovering = false;
    let ticking = false;

    const apply = () => {
      ticking = false;
      const rx = (0.4 - my) * 5;
      const ry = (mx - 0.5) * 7;
      if (tilt.current) {
        tilt.current.style.transform = hovering
          ? `translateY(${sy * -0.05}px) rotateX(${rx}deg) rotateY(${ry}deg)`
          : `translateY(${sy * -0.05}px)`;
      }
      if (glow.current) {
        glow.current.style.opacity = hovering ? "1" : "0";
        glow.current.style.background = `radial-gradient(circle at ${mx * 100}% ${my * 100}%, rgba(255,213,128,0.55), rgba(255,213,128,0) 38%)`;
      }
      sparks.current.forEach((s, i) => {
        if (!s) return;
        const depth = (i % 3) + 1;
        s.style.transform = hovering
          ? `translate3d(${(mx - 0.5) * depth * 22}px, ${(my - 0.5) * depth * 22}px, 0)`
          : "translate3d(0,0,0)";
      });
    };

    // Coalesce bursts of events into one write per frame when rAF is available,
    // but fall back to a direct write so it still works if rAF is throttled.
    const schedule = () => {
      if (ticking) return;
      ticking = true;
      if (typeof requestAnimationFrame === "function") requestAnimationFrame(apply);
      else apply();
      // safety: if the frame never comes (background/throttled), write anyway
      setTimeout(() => {
        if (ticking) apply();
      }, 32);
    };

    const onMove = (e: MouseEvent) => {
      const r = host.current!.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = (e.clientY - r.top) / r.height;
      hovering = true;
      schedule();
    };
    const onLeave = () => {
      hovering = false;
      schedule();
    };
    const onScroll = () => {
      sy = window.scrollY;
      schedule();
    };

    const h = host.current!;
    h.addEventListener("mousemove", onMove);
    h.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      h.removeEventListener("mousemove", onMove);
      h.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={host} className="absolute inset-0 [perspective:1200px]" aria-hidden="true">
      {/* the dome illustration, bottom-anchored */}
      <div
        ref={tilt}
        className="absolute inset-x-0 bottom-0 origin-bottom transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d]"
      >
        <div className="relative mx-auto w-[150%] max-w-none -translate-x-[16%] sm:w-full sm:translate-x-0">
          <Image
            src="/landing_bg2.png"
            alt=""
            width={1672}
            height={941}
            priority
            className="h-auto w-full select-none"
          />
          {/* sunlight that follows the cursor across the tiles */}
          <div ref={glow} className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300" />

          {/* the bazaar is open — birds aloft, people trading on the plaza */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1672 941"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {/* ---- birds across the sky ---- */}
            {[
              { x: 840, y: 168, d: "17s", delay: "0s", l: false },
              { x: 1090, y: 132, d: "21s", delay: "4s", l: false },
              { x: 1310, y: 210, d: "19s", delay: "8s", l: true },
              { x: 980, y: 250, d: "15s", delay: "11s", l: false },
              { x: 1200, y: 300, d: "23s", delay: "2s", l: false },
            ].map((b, i) => (
              <g key={i} transform={`translate(${b.x} ${b.y})`}>
                <g className={b.l ? "cb-fly-l" : "cb-fly"} style={{ ["--d" as string]: b.d, animationDelay: b.delay }}>
                  <g transform="scale(1.05)">
                    <Bird flip={b.l} />
                  </g>
                </g>
              </g>
            ))}

            {/* ---- chatting pair near the steps ---- */}
            <g transform="translate(830 906) scale(1.16)">
              <g className="cb-talk">
                <Person robe="#C2542F" cap="#2C3E63" arm />
              </g>
            </g>
            <g transform="translate(884 906) scale(1.16)">
              <g className="cb-talk" style={{ animationDelay: "0.85s" }}>
                <Person robe="#2C3E63" cap="#1F8E86" flip />
              </g>
            </g>

            {/* ---- seller at a stall, with a customer ---- */}
            <g transform="translate(1044 903) scale(1.18)">
              <Person robe="#E2A12C" cap="#2C3E63" arm />
              <Stall awn="#2E9D95" />
            </g>
            <g transform="translate(1106 909) scale(1.02)">
              <Person robe="#B14E2C" cap="#1F8E86" flip />
            </g>

            {/* ---- a second stall further along ---- */}
            <g transform="translate(1348 901) scale(1.15)">
              <Person robe="#2E9D95" cap="#C2542F" arm />
              <Stall awn="#C2542F" />
            </g>

            {/* ---- people strolling the plaza ---- */}
            <g transform="translate(905 905)">
              <g className="cb-walk-r" style={{ ["--d" as string]: "13s" }}>
                <g className="cb-bob">
                  <g transform="scale(1.15)">
                    <Person robe="#2C3E63" cap="#E2A12C" />
                  </g>
                </g>
              </g>
            </g>
            <g transform="translate(1290 908)">
              <g className="cb-walk-l" style={{ ["--d" as string]: "16s", animationDelay: "5s" }}>
                <g className="cb-bob" style={{ animationDelay: "0.2s" }}>
                  <g transform="scale(1.12)">
                    <Person robe="#C2542F" cap="#2C3E63" flip />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* legibility scrims for the headline (left) and edges */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FBF1DE] via-[#FBF1DE]/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#FBF1DE] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-cream" />

      {/* floating gold sparkles (parallax + drift), on top */}
      {SPARKS.map((s, i) => (
        <span
          key={i}
          ref={(el) => {
            sparks.current[i] = el;
          }}
          className="pointer-events-none absolute will-change-transform"
          style={{ left: s.l, top: s.t }}
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-saffron/80 shadow-[0_0_8px_2px_rgba(226,161,44,0.4)] spark-bob" style={{ animationDelay: `${i * 0.7}s` }} />
        </span>
      ))}
    </div>
  );
}
