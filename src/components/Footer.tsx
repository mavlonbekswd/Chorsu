"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const columns = [
    {
      heading: f.cols.bazaar,
      links: [
        { label: f.links.stalls, href: "#stalls" },
        { label: f.links.caravans, href: "#caravans" },
        { label: f.links.route, href: "#route" },
      ],
    },
    {
      heading: f.cols.about,
      links: [
        { label: f.links.story, href: "/signup" },
        { label: f.links.contact, href: "/signup" },
      ],
    },
    {
      heading: f.cols.legal,
      links: [
        { label: f.links.terms, href: "/signup" },
        { label: f.links.privacy, href: "/signup" },
      ],
    },
  ];

  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-5 py-14 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link href="#top" className="flex items-center" aria-label="Chorsu home">
            <Image src="/chorsu-logo.png" alt="Chorsu" width={206} height={60} className="h-8 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {f.desc}
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">{col.heading}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">© {new Date().getFullYear()} Chorsu. {f.rights}</p>
          <div className="flex items-center gap-5">
            {["Telegram", "LinkedIn", "Instagram"].map((s) => (
              <a key={s} href="/signup" className="text-xs text-muted transition-colors hover:text-ink">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
