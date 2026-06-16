"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav() {
  const { t } = useLang();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.stalls, href: "#stalls" },
    { label: t.nav.route, href: "#route" },
    { label: t.nav.caravans, href: "#caravans" },
  ];

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
        <Link href="#top" aria-label="Chorsu home" className="flex items-center">
          <Image
            src="/chorsu-logo.png"
            alt="Chorsu"
            width={206}
            height={60}
            priority
            className="h-8 w-auto"
          />
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
          <LanguageSwitcher />
          <Link href="/signup" className="text-sm text-muted transition-colors hover:text-ink">
            {t.nav.login}
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-clay px-4 py-2 text-sm font-semibold text-cream shadow-[0_8px_18px_-10px_rgba(162,63,34,0.9)] transition-transform hover:scale-[1.03]"
          >
            {t.nav.enter}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md text-ink"
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
        </div>
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
                {t.nav.login}
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="rounded-full bg-clay px-4 py-3 text-center text-base font-semibold text-cream"
              >
                {t.nav.enter}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
