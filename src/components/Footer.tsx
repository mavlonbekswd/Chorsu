import Link from "next/link";
import DomeLogo from "./DomeLogo";

const columns = [
  {
    heading: "Bazaar",
    links: [
      { label: "Stalls", href: "#stalls" },
      { label: "Caravans", href: "#caravans" },
      { label: "The Route", href: "#route" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Story", href: "/signup" },
      { label: "Contact", href: "/signup" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms", href: "/signup" },
      { label: "Privacy", href: "/signup" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-5 py-14 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link href="#top" className="flex items-center gap-2">
            <DomeLogo className="h-7 w-7" />
            <span className="font-display text-lg font-semibold text-ink">chorsu</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            The bazaar of ideas for Central Asia — ready-to-build startups, with their architecture
            included.
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
          <p className="text-xs text-muted">© {new Date().getFullYear()} Chorsu. The bazaar of ideas.</p>
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
