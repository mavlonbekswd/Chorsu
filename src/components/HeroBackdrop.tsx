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
