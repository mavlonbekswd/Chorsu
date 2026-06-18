"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/LanguageProvider";
import { BagIcon, BookmarkIcon, FolderIcon, GearIcon, ChevronIcon } from "./icons";
import { SECTORS } from "@/lib/mock-ideas";

export default function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const pathname = usePathname();
  const { t } = useLang();
  const [catsOpen, setCatsOpen] = useState(false);

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden" onClick={onCloseMobile} aria-hidden="true" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 shrink-0 flex-col border-r border-d-border bg-d-surface transition-all duration-300 md:static md:translate-x-0 ${
          collapsed ? "md:w-[68px]" : "md:w-64"
        } ${mobileOpen ? "translate-x-0 shadow-soft-lg" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* logo → back to the landing page */}
        <div className={`flex h-16 items-center px-4 ${collapsed ? "md:justify-center md:px-0" : ""}`}>
          <Link href="/" className="flex items-center" aria-label="Back to Chorsu home" onClick={onCloseMobile}>
            <Image
              src="/chorsu-logo.png"
              alt="Chorsu"
              width={180}
              height={52}
              priority
              className={`h-7 w-auto ${collapsed ? "md:hidden" : ""}`}
            />
            <span className={`hidden font-display text-2xl font-semibold tracking-tight text-d-ink ${collapsed ? "md:block" : ""}`}>C</span>
          </Link>
        </div>

        {/* main nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <NavItem href="/dashboard" label={t.dash.ideas} active={isActive("/dashboard", true)} collapsed={collapsed} onClick={onCloseMobile} icon={<BagIcon />} />
          <NavItem href="/dashboard/saved" label={t.dash.saved} active={isActive("/dashboard/saved")} collapsed={collapsed} onClick={onCloseMobile} icon={<BookmarkIcon />} />

          <button
            onClick={() => {
              if (collapsed && typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) onToggleCollapse();
              else setCatsOpen((v) => !v);
            }}
            className={`group mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-d-muted transition-colors hover:bg-d-hover hover:text-d-ink ${collapsed ? "md:justify-center md:px-0" : ""}`}
            aria-expanded={catsOpen}
            title={collapsed ? t.dash.categories : undefined}
          >
            <span className="shrink-0 text-d-faint"><FolderIcon /></span>
            <span className={`flex-1 text-left ${collapsed ? "md:hidden" : ""}`}>{t.dash.categories}</span>
            <ChevronIcon className={`h-4 w-4 text-d-faint transition-transform ${catsOpen ? "rotate-90" : ""} ${collapsed ? "md:hidden" : ""}`} />
          </button>
          {catsOpen && (
            <ul className={`mb-1 ml-5 mt-1 space-y-0.5 border-l border-d-border pl-3 ${collapsed ? "md:hidden" : ""}`}>
              {SECTORS.map((s) => (
                <li key={s}>
                  <Link
                    href={`/dashboard?sector=${s.toLowerCase()}`}
                    onClick={onCloseMobile}
                    className="block rounded-md px-3 py-1.5 text-sm text-d-muted transition-colors hover:bg-d-hover hover:text-d-ink"
                  >
                    {t.sectors[s]}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* faint girih thread */}
        <div className={`dash-girih mx-4 h-px opacity-[0.18] ${collapsed ? "md:mx-3" : ""}`} aria-hidden="true" />

        {/* pinned bottom: settings + user */}
        <div className="px-3 py-3">
          <NavItem href="/dashboard/settings" label={t.dash.settings} active={isActive("/dashboard/settings")} collapsed={collapsed} onClick={onCloseMobile} icon={<GearIcon />} />

          <div className={`mt-2 flex items-center gap-3 rounded-xl border border-d-border bg-d-elev px-3 py-2 shadow-soft ${collapsed ? "md:justify-center md:border-0 md:bg-transparent md:px-0 md:shadow-none" : ""}`}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-d-accent/12 text-sm font-semibold text-d-accent ring-1 ring-d-accent/20">
              {t.dash.guest.charAt(0)}
            </span>
            <div className={`min-w-0 flex-1 ${collapsed ? "md:hidden" : ""}`}>
              <p className="truncate text-sm font-medium text-d-ink">{t.dash.guest}</p>
              <span className="inline-flex items-center rounded-full border border-d-gold/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-d-gold">
                {t.dash.free}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onToggleCollapse}
          className="hidden items-center justify-center gap-2 border-t border-d-border py-2.5 text-xs font-medium text-d-muted transition-colors hover:bg-d-hover hover:text-d-ink md:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronIcon className={`h-4 w-4 transition-transform ${collapsed ? "" : "rotate-180"}`} />
          {!collapsed && <span>{t.dash.collapse}</span>}
        </button>
      </aside>
    </>
  );
}

function NavItem({
  href,
  label,
  icon,
  active,
  collapsed,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={collapsed ? label : undefined}
      aria-current={active ? "page" : undefined}
      className={`group relative mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active ? "bg-d-accent/10 text-d-ink" : "text-d-muted hover:bg-d-hover hover:text-d-ink"
      } ${collapsed ? "md:justify-center md:px-0" : ""}`}
    >
      {active && <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-d-accent" aria-hidden="true" />}
      <span className={`shrink-0 ${active ? "text-d-accent" : "text-d-faint group-hover:text-d-muted"}`}>{icon}</span>
      <span className={`flex-1 ${collapsed ? "md:hidden" : ""}`}>{label}</span>
    </Link>
  );
}
