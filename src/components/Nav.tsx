"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DomeLogo from "./DomeLogo";

const links = [
  { label: "Stalls", href: "#stalls" },
  { label: "The Route", href: "#route" },
  { label: "Caravans", href: "#caravans" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-cream/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="#top" className="flex items-center gap-2" aria-label="Chorsu home">
          <DomeLogo className="h-7 w-7" />
          <span className="text-lg font-semibold tracking-tight text-ink font-display">chorsu</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/signup" className="text-sm text-muted transition-colors hover:text-ink">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-clay px-4 py-2 text-sm font-semibold text-cream shadow-[0_8px_18px_-10px_rgba(162,63,34,0.9)] transition-transform hover:scale-[1.03]"
          >
            Enter the bazaar
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? "top-2 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition-all ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? "top-2 -rotate-45" : "top-4"}`} />
          </span>
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-line bg-cream/97 backdrop-blur-md md:hidden">
          <ul className="flex flex-col px-5 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex flex-col gap-3 border-t border-line pt-4">
              <Link href="/signup" onClick={() => setOpen(false)} className="text-base text-muted">
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="rounded-full bg-clay px-4 py-3 text-center text-base font-semibold text-cream"
              >
                Enter the bazaar
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
